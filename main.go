package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
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
	id, err := strconv.ParseFloat(searchpar, 64)
	if err != nil {
		log.Println("Movie Info - could not parse float: ", err)
	}
	m := movie{ID: id}
	m.getinfo()
	result, err := json.Marshal(&m)
	if err != nil {
		log.Println("Movie Info - marshal - json error: ", err)
	}
	fmt.Fprintf(w, string(result))
}

func searchmovies(w http.ResponseWriter, r *http.Request) {
	searchpar, err := url.QueryUnescape(r.URL.Path[len("/searchmovies/"):])
	log.Println("Incoming movie search request: ", searchpar)
	if err != nil {
		log.Println("Search movie - fatal queryescape: ", err)
	}
	if searchpar == "" {
		fmt.Fprintf(w, "Empty query")
		return
	}
	url := fmt.Sprintf("https://api.themoviedb.org/3/search/movie?api_key=%s&query=%s", os.Getenv("TMDB_KEY"), url.QueryEscape(searchpar))
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
	fmt.Fprintf(w, string(result))
	return
}

func main() {
	static := http.FileServer(http.Dir("static/build"))
	http.Handle("/", static)
	http.HandleFunc("/searchmovies/", searchmovies)
	http.HandleFunc("/movieinfo/", movieInfo)
	if _, ok := os.LookupEnv("TMDB_KEY"); !ok {
		log.Fatal("No api key configured")
	}
	log.Println("Starting webserver")
	if _, err := net.LookupIP("api.themoviedb.org"); err != nil {
		log.Fatalf("API resolution not working: %s", err)
	}
	log.Fatal(http.ListenAndServe(":8080", nil))
}
