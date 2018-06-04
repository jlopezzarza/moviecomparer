var searchMovies = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            formatSearchResults(this.responseText);
        }
    };
    param = document.getElementById("movie1").value;
    xhttp.open("GET", "searchmovies/" + param, true);
    xhttp.send();
};

var formatSearchResults = function(moviesResult) {
    var table = document.getElementById("results");
    var jmovies = JSON.parse(moviesResult);
    for (var i in jmovies.results) {
        var row = table.insertRow();
        var movie = row.insertCell(0);
        var releaseDate = row.insertCell(1);
        var castSumm = row.insertCell(2);
        movie.innerHTML = jmovies.results[i].title;
        releaseDate.innerHTML = jmovies.results[i].release_date;
        var cast = "";
        for (var m in jmovies.results[i].Cast) {
            cast += jmovies.results[i].Cast[m].name;
        };
        castSumm.innerHTML = cast;
    };
    table.style.visibility = "visible";
};
