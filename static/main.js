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
    let side = id.replace("movie-", "");
    var table = document.getElementById("results-" + side);
    cleanData(side);
    var jmovies = JSON.parse(moviesResult);
    if (jmovies.results == null) {
        let board = document.getElementById(side + "-board");
        board.innerHTML = "No results!";
        board.style.display = "flex";
    } else {
        for (var i in jmovies.results) {
            var row = table.insertRow();
            row.classList.add("result-row");
            var movie = row.insertCell(0);
            var releaseDate = row.insertCell(1);
            var select = row.insertCell(2);
            movie.innerHTML = jmovies.results[i].title;
            releaseDate.innerHTML = jmovies.results[i].release_date;
            let btn = document.createElement("a");
            btn.className = "button";
            icon_span = document.createElement("span");
            icon_span.className = "icon is-small";
            icon = document.createElement("i");
            icon.className = "fas fa-play";
            icon_span.appendChild(icon);
            btn.appendChild(icon_span);
            btn.dataset.id = jmovies.results[i].id;
            btn.dataset.align = table.dataset.align;
            btn.onclick = function(event) {
                formatTarget(event);
            };
            select.appendChild(btn);
        }
        table.style.display = "flex";
    }
};

var formatTarget = function(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            formatMovie(this.response, event.target.offsetParent.dataset.align);
            return;
        }
    };
    xhttp.open("GET", "movieinfo/" + event.target.offsetParent.dataset.id, true);
    xhttp.send();
};

var formatMovie = function(data, side) {
    let movie = document.createElement("h2");
    let castList = document.createElement("ul");
    let res = JSON.parse(data);
    let board = document.getElementById(side + "-board");
    movie.innerHTML = res.title + ' ' + res.release_date;
    if (res.Cast == null) {
        let row = document.createElement("li");
        row.appendChild(document.createTextNode("No results"));
        castList.appendChild(row);
    } else {
        for (let cast of res.Cast) {
            let row = document.createElement("li");
            row.appendChild(document.createTextNode(cast.name));
            castList.appendChild(row);
        }
    }
    board.appendChild(movie);
    board.appendChild(castList)
    board.style.display = "flex";
    document.getElementById("results-" + side).style.display = "none";
};

var cleanData = function(side) {
    let table = document.getElementById("results-" + side);
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    let board = document.getElementById(side + "-board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
};