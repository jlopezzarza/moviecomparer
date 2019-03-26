package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"

	"github.com/elastic/go-elasticsearch"
)

// Make Http request to the target url
func getdata(url string) (body []byte) {
	resp, err := http.Get(url)
	if err != nil {
		log.Println(err)
	}
	if resp.Body != nil {
		body, err = ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Println("Getdata error: ", err)
		}
	} else {
		log.Println("Getdata body nil")
	}
	resp.Body.Close()
	return
}

// API Endpoint to get the movie information
func movieInfo(w http.ResponseWriter, r *http.Request) {
	searchpar, err := url.QueryUnescape(r.URL.Path[len("/movieinfo/"):])
	log.Println("Incoming movie info request: ", searchpar)
	if err != nil {
		log.Println("Movie info - fatal queryescape: ", err)
	}
	if searchpar == "" {
		fmt.Fprintf(w, "Empty query")
		return
	}
	result := getMovie(searchpar)
	fmt.Fprintf(w, string(result))
}

// API Endpoint to search for the movies
func searchMovies(w http.ResponseWriter, r *http.Request) {
	searchpar, err := url.QueryUnescape(r.URL.Path[len("/searchmovies/"):])
	log.Println("Incoming movie search request: ", searchpar)
	if err != nil {
		log.Println("Search movie - fatal queryescape: ", err)
	}
	if searchpar == "" {
		fmt.Fprintf(w, "Empty query")
		return
	}
	result := doSearch(searchpar)
	fmt.Fprintf(w, string(result))
	return
}

// Check for the environment variables used by the aplication
func preflightCheck() {
	log.Println("Doing preflight checks...")
	if _, ok := os.LookupEnv("TMDB_KEY"); !ok {
		log.Fatal("No api key configured")
	}
	if _, ok := os.LookupEnv("ES_HOST"); !ok {
		log.Fatal("No elasticsearch host configured")
	}
	if _, ok := os.LookupEnv("ES_PORT"); !ok {
		log.Fatal("No  elasticsearch port configured")
	}
}

var esConn *elasticsearch.Client

// Connect to elasticsearch
func esConnect() {
	log.Println("Connecting to Elastich Search")
	addr := fmt.Sprintf("http://%s:%s", os.Getenv("ES_HOST"), os.Getenv("ES_PORT"))
	cfg := elasticsearch.Config{
		Addresses: []string{
			addr,
		},
	}
	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatal("Unable to connect to ES")
	}
	esConn = es
	return
}

func main() {
	log.Println("Loading!")
	preflightCheck()

	// Stablish connection to ES
	esConnect()

	log.Println("Starting webserver")

	http.HandleFunc("/searchmovies/", searchMovies)
	http.HandleFunc("/movieinfo/", movieInfo)

	// Check out the DNS resolution to the api
	if _, err := net.LookupIP("api.themoviedb.org"); err != nil {
		log.Fatalf("API resolution not working: %s", err)
	}
	log.Fatal(http.ListenAndServe(":8080", nil))

}
