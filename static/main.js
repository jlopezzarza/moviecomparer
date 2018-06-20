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
    var table = document.getElementById(id.replace("movie", "results"));
    cleanData(table);
    var jmovies = JSON.parse(moviesResult);
    if (jmovies.results == null) {
        var tableContainer = table.parentNode;
        tableContainer.innerHTML = "No results!";
        tableContainer.style.visibility = "visible";
    } else {
        for (var i in jmovies.results) {
            var row = table.insertRow();
            row.classList.add("result-row");
            var movie = row.insertCell(0);
            var releaseDate = row.insertCell(1);
            var select = row.insertCell(2);
            movie.innerHTML = jmovies.results[i].title;
            releaseDate.innerHTML = jmovies.results[i].release_date;
            let btn = document.createElement("input");
            btn.type = "button";
            btn.value = "+";
            btn.dataset.id = jmovies.results[i].id;
            btn.dataset.align = table.dataset.align;
            btn.onclick = function(event) {
                formatTarget(event);
            };
            select.appendChild(btn);
        }
        table.style.visibility = "visible";
    }
};

var formatTarget = function(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            formatMovie(this.response, event.target.dataset.align);
            return;
        }
    };
    xhttp.open("GET", "movieinfo/" + event.target.dataset.id, true);
    xhttp.send();
};

var formatMovie = function(data, side) {
    let movie = document.createElement("h2");
    let castList = document.createElement("ul");
    let res = JSON.parse(data);
    movie.innerHTML = res.title + ' ' + res.release_date;
    for (let cast of res.Cast) {
        let row = document.createElement("li");
        row.appendChild(document.createTextNode(cast.name));
        castList.appendChild(row);
    }
    movie.appendChild(castList);
    document.getElementById(side + "-body").appendChild(movie);
    document.getElementById("results-" + side).style.display = "none";
};

var cleanData = function(table) {
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
};