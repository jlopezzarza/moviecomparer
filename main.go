package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type movie struct {
	ID          float64 `json:"id"`
	Title       string  `json:"title"`
	Releasedate string  `json:"release_date"`
	Cast        []castmember
}
type castmember struct {
	Order     float64 `json:"cast_id"`
	Character string  `json:"character"`
	ID        float64 `json:"id"`
	Name      string  `json:"name"`
}
type moviesresults struct {
	Total   float64 `json:"total_results"`
	Results []movie `json:"results"`
}
type castresult struct {
	ID   float64      `json:"id"`
	Cast []castmember `json:"cast"`
}

func getdata(url string) (body []byte) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	body, _ = ioutil.ReadAll(resp.Body)
	return
}

func (movie *movie) getcast() {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%f/credits?api_key=%s", movie.ID, os.Getenv("TMDB_KEY"))
	body := getdata(url)
	var data castresult
	if err := json.Unmarshal(body, &data); err != nil {
		fmt.Println("Search Cast - error with the json: ", err)
	}
	movie.Cast = data.Cast
	return
}

func (movie *movie) getinfo() {
	url := fmt.Sprintf("https://api.themoviedb.org/3/movie/%f?api_key=%s", movie.ID, os.Getenv("TMDB_KEY"))
	body := getdata(url)
	if err := json.Unmarshal(body, &movie); err != nil {
		fmt.Println("Search movie - movieresults - json error: ", err)
		return
	}
	movie.getcast()
	return
}

func searchcast(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	var m movie
	if err := json.Unmarshal(body, &m); err != nil {
		fmt.Println("Search cast - unmarshal - json error: ", err)
		return
	}
	m.getinfo()
	result, err := json.Marshal(&m)
	if err != nil {
		fmt.Println("Search cast - marshal - json error: ", err)
	}
	fmt.Fprintf(w, string(result))
}

func searchmovies(w http.ResponseWriter, r *http.Request) {
	searchpar := r.URL.Path[len("/searchmovies/"):]
	if searchpar == "" {
		fmt.Fprintf(w, "Empty query")
		return
	}
	url := fmt.Sprintf("https://api.themoviedb.org/3/search/movie?api_key=%s&query=%s", os.Getenv("TMDB_KEY"), searchpar)
	body := getdata(url)
	var data moviesresults
	if err := json.Unmarshal(body, &data); err != nil {
		fmt.Println("Search movie - movieresults - json error: ", err)
		return
	}
	result, err := json.Marshal(&data)
	if err != nil {
		fmt.Println("Search movie - resulsts - json error: ", err)
	}
	fmt.Fprintf(w, string(result))
	return
}

func main() {
	static := http.FileServer(http.Dir("static"))
	http.Handle("/", static)
	http.HandleFunc("/searchmovies/", searchmovies)
	http.HandleFunc("/searchcast/", searchcast)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
