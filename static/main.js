var searchMovies = function(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            formatSearchResults(this.responseText, event.target.id);
        }
    };
    param = document.getElementById(event.target.id).value;
    xhttp.open("GET", encodeURI("searchmovies/" + param), true);
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
    xhttp.open("GET", encodeURI("movieinfo/" + event.target.offsetParent.dataset.id), true);
    xhttp.send();
};

var formatMovie = function(data, side) {
    let results = document.createElement("section");
    results.className = "movieresult";
    let resdiv = document.createElement("div");
    let movie = document.createElement("h2");
    let castList = document.createElement("ul");
    let res = JSON.parse(data);
    let board = document.getElementById(side + "-board");
    movie.innerHTML = res.title + ' ' + res.release_date;
    movie.className = "title";
    castList.className = "subtitle";
    castList.id = "resultlist-" + side;
    if (res.Cast == null) {
        let row = document.createElement("li");
        row.appendChild(document.createTextNode("No results"));
        castList.appendChild(row);
    } else {
        for (let cast of res.Cast) {
            let row = document.createElement("li");
            row.dataset.id = cast.id;
            row.appendChild(document.createTextNode(cast.name));
            castList.appendChild(row);
        }
    }
    resdiv.appendChild(movie);
    resdiv.appendChild(castList);
    results.appendChild(resdiv)
    board.appendChild(results);
    board.style.display = "flex";
    document.getElementById("results-" + side).style.display = "none";
    let matches = matchData();
    if (matches) {
        highlightMatches(matches);
    }
};

var matchData = function() {
    const getresults = function(side) {
        let reslist = document.getElementById("resultlist-" + side );
        if ( reslist ) {
            let resarr = [];
            for (let res of reslist.childNodes) {
                resarr.push(res.dataset.id);
            }
            return resarr
        }
    };
    let resleft = getresults("left");
    let resright = getresults("right");
    if (resright && resleft) {
        const matches = resleft.filter(element => resright.includes(element));
        return matches
    }
};

var highlightMatches = function(matches) {
    const cleanLists = function(side, matches) {
        let reslist = document.getElementById("resultlist-" + side );
        if (reslist) {
            for (let res of reslist.childNodes) {
                if ( matches.indexOf(res.dataset.id) == "-1" ) {
                    res.style.color = "#BDBDBD";
                } else {
                    res.parentNode.insertBefore(res, reslist.childNodes[0]);
                }
            }
        }
    };
    cleanLists("right", matches);
    cleanLists("left", matches);
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