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
        var counter = 0;
        for (var i in jmovies.results) {
            var row = table.insertRow();
            row.id = counter;
            var movie = row.insertCell(0);
            var releaseDate = row.insertCell(1);
            var select = row.insertCell(2);
            movie.innerHTML = jmovies.results[i].title;
            releaseDate.innerHTML = jmovies.results[i].release_date;
            let btn = document.createElement("input");
            btn.type = "button";
            btn.value = "+";
            btn.name = jmovies.results[i].id;
            btn.onclick = function(event) {
                formatTarget(event);
            };
            select.appendChild(btn);
            counter++;
        }
        table.style.visibility = "visible";
    }
};

var searchCast = function(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    };
    xhttp.open("GET", "searchcast/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.responseType = "json";
    var body = '{"id": ' + id + ' }';
    xhttp.send(body);
};

var formatTarget = function(event) {
    searchCast(event.target.name);
}