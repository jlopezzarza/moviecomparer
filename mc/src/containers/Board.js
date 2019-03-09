import React, { Component } from 'react';
import MoviesBoard from '../components/board/MoviesBoard';
import CastBoard from '../components/board/CastBoard';
import axios from 'axios';

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
        if (this.state.param != null ) {
            axios.get(encodeURI("http://localhost:8080/searchmovies/" + this.state.param))
                .then(res => {
                    if (res.data.results.length > 0 ) {
                        this.setState({
                            movieresults: res.data.results,
                            loadmovies: true
                        })
                    }
                })
                .catch((error) => {
                    alert("Oops! There was a problem with the search, try again later");
                })
        }
    }

    searchMovieInfo = (movieid) => {
        axios.get(encodeURI("http://localhost:8080/movieinfo/" + movieid))
            .then(res => {
                this.setState({
                    loadmovies: false,
                    movieinfo: res.data,
                    loadinfo: true
                })
            })
            .catch((error) => {
                alert("Oops! There was a problem with the search, try again later");
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
                            <i className="material-icons prefix">movie_filter</i>
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