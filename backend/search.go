package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"
)

// Look for the movie in elasticSearch
func esSearch(title string) {
	query := fmt.Sprintf(`{"query" : { "match_all" : { "title" : "%s" } }}`, title)
	res, err := esConn.Search(
		esConn.Search.WithIndex("mctitleids"),
		esConn.Search.WithBody(strings.NewReader(query)),
	)
	if err != nil {
		log.Println("Error in the elasticserch query: ", err)
	}
	defer res.Body.Close()

	log.Println("Result: ", res.String())
}

// Search for the movies matching the string
func doSearch(searchPar string) (result []byte) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/search/movie?api_key=%s&query=%s", os.Getenv("TMDB_KEY"), url.QueryEscape(searchPar))
	body := getdata(url)
	var data moviesresults
	if err := json.Unmarshal(body, &data); err != nil {
		log.Println("Search movie - movieresults - json error: ", err)
		return
	}
	result, err := json.Marshal(&data)
	if err != nil {
		log.Println("Search movie - resulsts - json error: ", err)
	}
	return
}
