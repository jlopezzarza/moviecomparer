var searchMovies = function(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            formatSearchResults(this.responseText, event.target.id);
        }
    };
    param = document.getElementById(event.target.id).value;
    xhttp.open("GET", "searchmovies/" + param, true);
    xhttp.send();
};

var formatSearchResults = function(moviesResult, id) {
    var resId = id.replace("movie", "results");
    var table = document.getElementById(resId);
    var jmovies = JSON.parse(moviesResult);
    if (jmovies.results == null) {
        var tableContainer = table.parentNode;
        tableContainer.innerHTML = "No results!";
        tableContainer.style.visibility = "visible";
    } else {
        for (var i in jmovies.results) {
            var row = table.insertRow();
            var movie = row.insertCell(0);
            var releaseDate = row.insertCell(1);
            movie.innerHTML = jmovies.results[i].title;
            releaseDate.innerHTML = jmovies.results[i].release_date;
        };
        table.style.visibility = "visible";
    };
};
