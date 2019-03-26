package main

import (
	"bufio"
	"compress/gzip"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/elastic/go-elasticsearch"
)

// Donwdload and save the file
func downloadFile(filename string, url string) error {
	out, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer out.Close()

	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	_, err = io.Copy(out, resp.Body)
	return err
}

// Generate the url for the yesterday file export endpoint
func urlGen() string {
	y, m, d := time.Now().UTC().AddDate(0, 0, -1).Date()
	return fmt.Sprintf("http://files.tmdb.org/p/exports/movie_ids_%02d_%02d_%v.json.gz", int(m), d, y)
}

// Read and uncompress the file
func readFile(f string) io.Reader {
	fgz, err := os.Open(f)
	if err != nil {
		log.Fatal("Error opening file")
	}
	file, err := gzip.NewReader(fgz)
	if err != nil {
		log.Fatal("Error uncompressing file")
	}
	return file
}

// store the json into elasticsearch
func storeItem(item string, es *elasticsearch.Client) {
	res, err := es.Index(
		"mctitleids",                 // Index name
		strings.NewReader(item),      // Document body
		es.Index.WithRefresh("true"), // Refresh
	)
	if err != nil {
		log.Println("error creating index", err)
	}
	defer res.Body.Close()
	return
}

func main() {
	log.Println("Starting moviedumping!")

	f := "movies.txt.gz"

	// Download and store the file
	if err := downloadFile(f, urlGen()); err != nil {
		log.Fatal("File not downloaded")
	}

	cfg := elasticsearch.Config{
		Addresses: []string{
			"http://localhost:9200",
		},
	}
	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatal("Unable to connect to ES")
	}

	// Read the file and store the items, line by line
	scanner := bufio.NewScanner(readFile(f))
	for scanner.Scan() {
		storeItem(scanner.Text(), es)
		//time.Sleep(time.Millisecond * 500)
	}

}
