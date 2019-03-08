import React, { Component } from 'react';
import MoviesBoard from './MoviesBoard';
import CastBoard from './CastBoard';

class Board extends Component {
    state = {
        error: null,
        isLoaded: false,
        param: null,
        loadmovies: false,
        movieresults: null,
        loadinfo: false,
        movieinfo: null
    }

    searchMovies = (e) => {
        e.preventDefault();
        console.log("searching for movies: ", this.state.param);
        this.setState({
            movieresults: [{"id":10195,"title":"Thor","release_date":"2011-04-21","Cast":null},{"id":284053,"title":"Thor: Ragnarok","release_date":"2017-10-25","Cast":null},{"id":76338,"title":"Thor: The Dark World","release_date":"2013-10-29","Cast":null}],
            loadmovies: true
        })
    }

    searchMovieInfo = (movieid) => {
        console.log("searching for cast: ", movieid);
        this.setState({
            loadmovies: false,
            movieinfo: {"id":10195,"title":"Thor","release_date":"2011-04-21","Cast":[{"cast_id":1,"character":"Thor Odinson","id":74568,"name":"Chris Hemsworth"},{"cast_id":5,"character":"Jane Foster","id":524,"name":"Natalie Portman"},{"cast_id":3,"character":"Loki","id":91606,"name":"Tom Hiddleston"},{"cast_id":6,"character":"Odin","id":4173,"name":"Anthony Hopkins"},{"cast_id":23,"character":"Erik Selvig","id":1640,"name":"Stellan Skarsgård"},{"cast_id":22,"character":"Heimdall","id":17605,"name":"Idris Elba"},{"cast_id":26,"character":"Phil Coulson","id":9048,"name":"Clark Gregg"},{"cast_id":18,"character":"Darcy Lewis","id":52852,"name":"Kat Dennings"},{"cast_id":25,"character":"Volstagg","id":56614,"name":"Ray Stevenson"},{"cast_id":24,"character":"Hogun","id":13275,"name":"Tadanobu Asano"},{"cast_id":36,"character":"Fandral","id":77880,"name":"Josh Dallas"},{"cast_id":4,"character":"Sif","id":59817,"name":"Jaimie Alexander"},{"cast_id":28,"character":"King Laufey","id":10132,"name":"Colm Feore"},{"cast_id":19,"character":"Frigga","id":14343,"name":"Rene Russo"},{"cast_id":56,"character":"Isabela Alvarez","id":270,"name":"Adriana Barraza"},{"cast_id":31,"character":"Agent Sitwell","id":1018947,"name":"Maximiliano Hernández"},{"cast_id":37,"character":"Frost Giant Captain","id":12371,"name":"Richard Cetrone"},{"cast_id":38,"character":"Frost Giant Sentry","id":125050,"name":"Darren Kendrick"},{"cast_id":39,"character":"Frost Giant Hailstrum","id":78150,"name":"Joshua Cox"},{"cast_id":57,"character":"Frost Giant Brute","id":1579743,"name":"Justice Jesse Smith"},{"cast_id":58,"character":"Frost Giant Grundroth","id":58508,"name":"Joseph Gatt"},{"cast_id":59,"character":"Frost Giant Raze","id":169653,"name":"Luke Massy"},{"cast_id":71,"character":"Einherjar Guard","id":1912180,"name":"Matthew Ducey"},{"cast_id":60,"character":"Einherjar Guard","id":1056049,"name":"Jason Camp"},{"cast_id":61,"character":"Agent Delancey","id":963745,"name":"Buddy Sosthand"},{"cast_id":62,"character":"Techie","id":1147968,"name":"Blake Silver"},{"cast_id":32,"character":"Agent Jackson","id":79079,"name":"Jamie McShane"},{"cast_id":63,"character":"Agent Garrett","id":25310,"name":"Dale Godboldo"},{"cast_id":64,"character":"Agent Cale","id":84341,"name":"Patrick O'Brien Demsey"},{"cast_id":80,"character":"SHIELD Guard","id":9568,"name":"Jim Palmer"},{"cast_id":72,"character":"Townie","id":1536517,"name":"Seth Coltan"},{"cast_id":34,"character":"Townie","id":33045,"name":"J. Michael Straczynski"},{"cast_id":73,"character":"Townie","id":1912182,"name":"Ryan Schaefer"},{"cast_id":74,"character":"Pete","id":15282,"name":"Matt Battaglia"},{"cast_id":35,"character":"Stan the Man","id":7624,"name":"Stan Lee"},{"cast_id":75,"character":"Drunk Townie","id":12223,"name":"Joel McCrary"},{"cast_id":76,"character":"Pet Store Clerk","id":1884648,"name":"Isaac Kappy"},{"cast_id":77,"character":"Admission Nurse","id":1194993,"name":"Juliet Lopez"},{"cast_id":78,"character":"Orderly","id":109422,"name":"Rob Mars"},{"cast_id":79,"character":"Viking Mother","id":1158068,"name":"Carrie Lazar"},{"cast_id":81,"character":"Viking Child","id":1212271,"name":"Harley Graham"},{"cast_id":82,"character":"Viking Elder","id":1266788,"name":"Alexander Wright"},{"cast_id":83,"character":"Viking","id":1077059,"name":"Hilary Pingle"},{"cast_id":84,"character":"Viking","id":141185,"name":"Shawn-Caulin Young"},{"cast_id":70,"character":"Guest","id":1222494,"name":"Walt Simonson"},{"cast_id":85,"character":"Viking","id":1396824,"name":"Kinsey McLean"},{"cast_id":86,"character":"Viking","id":1912186,"name":"Kelly Hawthorne"},{"cast_id":67,"character":"Young Thor","id":234479,"name":"Dakota Goyo"},{"cast_id":68,"character":"Young Loki","id":1332974,"name":"Ted Allpress"},{"cast_id":69,"character":"Frost Giant","id":51301,"name":"Douglas Tait"},{"cast_id":30,"character":"Nick Fury","id":2231,"name":"Samuel L. Jackson"},{"cast_id":29,"character":"Clint Barton","id":17604,"name":"Jeremy Renner"}]},
            loadinfo: true
        })
    }

    saveParam = (e) => {
        this.setState({
            param: e.target.value
        })
    }

    render() {
        let board;
        if (this.state.loadmovies) {
            board = <MoviesBoard movieresults={this.state.movieresults} searchMovieInfo={this.searchMovieInfo} />;
        } else if (this.state.loadinfo) {
            board = <CastBoard movieinfo={this.state.movieinfo} />;
        }
        return(
            <div>
                <div>
                    <form onSubmit={this.searchMovies}>
                        <div className="input-field">
                            <i class="material-icons prefix">movie_filter</i>
                            <input id="movie_title" type="text" className="validate" onChange={this.saveParam}/>
                        </div>
                    </form>
                </div>
                {board}
            </div>
        )
    }
}

export default Board