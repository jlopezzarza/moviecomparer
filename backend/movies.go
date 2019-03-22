package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
)

type movie struct {
	ID          float64 `json:"id"`
	Title       string  `json:"title"`
	Releasedate string  `json:"release_date"`
	Cast        []castmember
	Poster      string `json:"poster_path"`
}
type castmember struct {
	Order     float64 `json:"cast_id"`
	Character string  `json:"character"`
	ID        float64 `json:"id"`
	Name      string  `json:"name"`
	Photo     string  `json:"profile_path"`
}
type moviesresults struct {
	Total   float64 `json:"total_results"`
	Results []movie `json:"results"`
}
type castresult struct {
	ID   float64      `json:"id"`
	Cast []castmember `json:"cast"`
}

// get the cast of the movie object
func (movie *movie) getcast() {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%f/credits?api_key=%s", movie.ID, os.Getenv("TMDB_KEY"))
	body := getdata(url)
	var data castresult
	if err := json.Unmarshal(body, &data); err != nil {
		log.Println("Search Cast - error with the json: ", err)
	}
	movie.Cast = data.Cast
	return
}

// get the information with que movie ID
func (movie *movie) getinfo() {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%f?api_key=%s", movie.ID, os.Getenv("TMDB_KEY"))
	body := getdata(url)
	if err := json.Unmarshal(body, &movie); err != nil {
		log.Println("Search movie - movieresults - json error: ", err)
		return
	}
	movie.getcast()
	return
}

// Get the full movie information
func getMovie(searchpar string) (result []byte) {
	id, err := strconv.ParseFloat(searchpar, 64)
	if err != nil {
		log.Println("Movie Info - could not parse float: ", err)
	}
	m := movie{ID: id}
	m.getinfo()
	result, err = json.Marshal(&m)
	if err != nil {
		log.Println("Movie Info - marshal - json error: ", err)
	}
	return
}
