package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
)

// Make Http request to the target url
func getData(url string) (body []byte) {
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
	log.Println("Movie info - incoming request: ", r.URL)
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
	log.Println("Search movies - incoming request: ", r.URL)
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
	if _, ok := os.LookupEnv("TMDB_KEY"); !ok {
		log.Fatal("No api key configured")
	}
}

func main() {
	preflightCheck()

	http.HandleFunc("/searchmovies/", searchMovies)
	http.HandleFunc("/movieinfo/", movieInfo)

	log.Println("Starting webserver")
	if _, err := net.LookupIP("api.themoviedb.org"); err != nil {
		log.Fatalf("API resolution not working: %s", err)
	}
	log.Fatal(http.ListenAndServe(":8080", nil))

}
