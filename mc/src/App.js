import React, { Component } from 'react';
import Navbar from './components/Navbar';
import CardBoard from './components/CardBoard';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/custom.css';
import SearchBar from './components/board/SearchBar';
import axios from 'axios';
import matchCast from './utils/utils';

class App extends Component {
    state = {
        param: null,
        cards: [],
        searched: false,
        cardscount: null
    }

    searchMovies = (e) => {
        e.preventDefault();
        if (this.state.param != null) {
            axios.get(encodeURI("http://localhost:8080/searchmovies/" + this.state.param))
                .then(res => {
                    if (res.data.results.length > 0) {
                        let count = this.state.cards.length + 1
                        let card = {
                            id: count,
                            movieresults: res.data.results,
                            loadmovies: true,
                            loadinfo: false
                        };
                        this.setState({
                            ...this.state,
                            cards: [...this.state.cards, card],
                            searched: false,
                            cardscount: count
                        });
                    }
                })
                .catch((error) => {
                    alert("Oops! There was a problem with the search, try again later");
                })
        }
    }
    saveParam = (e) => {
        this.setState({
            param: e.target.value
        })
    }
    searchMovieInfo = (movieid, cardid) => {
        axios.get(encodeURI("http://localhost:8080/movieinfo/" + movieid))
            .then(res => {
                let oldCards = this.state.cards.filter(card => { return card.id !== cardid });
                let newCard = {
                    loadinfo: true,
                    loadmovies: false,
                    movieinfo: res.data
                };
                this.setState({
                    ...this.state,
                    cards: [...oldCards, newCard]
                })
            })
            .then(() => {
                if (this.state.cards.filter(card => "movieinfo" in card).length === this.state.cardscount) {
                    let matched = matchCast(this.state.cards)
                    this.setState({
                        ...this.state,
                        cards: matched.cards,
                        searched: matched.searched
                    })
                }
            })
            .catch((error) => {
                alert("Oops! There was a problem with the search, try again later");
            })
    }

    render() {
        return (
            <div className="">
                <Navbar />
                <div className="container">
                    <SearchBar searchMovies={this.searchMovies} saveParam={this.saveParam} />
                </div>
                <CardBoard cards={this.state.cards} cardscount={this.state.cardscount} searchMovieInfo={this.searchMovieInfo} searched={this.state.searched} />
            </div>
        );
    }
}

export default App;
