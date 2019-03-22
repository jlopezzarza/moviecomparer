package main

import (
	"bufio"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gomodule/redigo/redis"
)

type movie struct {
	ID         float64 `json:"id"`
	Title      string  `json:"original_title"`
	Popularity float64 `json:"popularity"`
}

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

// Uncompress the line into json
func unloadJSON(item string) movie {
	var data movie
	if err := json.Unmarshal([]byte(item), &data); err != nil {
		log.Println("Failed to unpack data: ", err)
	}
	return data
}

// save the line into redis with multiple values
func storeItem(item string, c redis.Conn) {
	movie := unloadJSON(item)
	c.Send("HSET", movie.ID, "title", movie.Title, "popularity", movie.Popularity)
	return
}

func main() {
	log.Println("Starting moviedumping!")

	// Preflight checks
	if _, ok := os.LookupEnv("REDIS_HOST"); !ok {
		log.Fatal("No REDIS_HOST configured")
	}
	if _, ok := os.LookupEnv("REDIS_PORT"); !ok {
		log.Fatal("No REDIS_PORT configured")
	}

	f := "movies.txt.gz"

	// Download and store the file
	if err := downloadFile(f, urlGen()); err != nil {
		log.Fatal("File not downloaded")
	}

	// Connect to redis
	redisAddr := fmt.Sprintf("%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT"))
	c, err := redis.Dial("tcp", redisAddr)
	if err != nil {
		log.Fatal("Error connecting to redis")
	}

	// Read the file and store the items, line by line
	scanner := bufio.NewScanner(readFile(f))
	for scanner.Scan() {
		storeItem(scanner.Text(), c)
	}

	log.Println("Dump saved correctly!")
}
