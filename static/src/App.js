import React, { Component } from 'react'
import Navbar from './components/Navbar'
import CardBoard from './components/CardBoard'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './styles/custom.css'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import matchCast from './utils/utils'

class App extends Component {
    state = {
        param: null,
        cards: [],
        searched: {
            done: false,
            results: false
        },
        cardscount: null,
        lastid: 0
    }

    searchMovies = (e) => {
        if (this.state.cardscount > 3) {
            alert("Movies limit reached, please remove one of the selection")
            return
        }
        e.preventDefault()
        if (this.state.param != null) {
            axios.get(encodeURI("/searchmovies/" + this.state.param))
                .then(res => {
                    if (res.data.results.length > 0) {
                        let count = this.state.cards.length + 1
                        let card = {
                            id: this.state.lastid,
                            movieresults: res.data.results,
                            loadmovies: true,
                            loadinfo: false
                        }
                        this.setState({
                            ...this.state,
                            cards: [...this.state.cards, card],
                            searched: {
                                done: false,
                                results: false
                            },
                            cardscount: count,
                            lastid: this.state.lastid + 1,
                        })
                    } else {
                        M.toast({ html: 'No results for that movie!' })
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
        axios.get(encodeURI("/movieinfo/" + movieid))
            .then(res => {
                let Cards = this.state.cards.map(card => {
                    card = (card.id === cardid) ? {
                        loadinfo: true,
                        loadmovies: false,
                        movieinfo: res.data,
                        id: card.id
                    } : card
                    return card
                })

                this.setState({
                    ...this.state,
                    cards: Cards
                })
            })
            .then(() => {
                if ((this.state.cards.filter(card => "movieinfo" in card).length === this.state.cardscount) && (this.state.cardscount > 1)) {
                    let matched = matchCast(this.state.cards)
                    this.setState({
                        ...this.state,
                        cards: matched.cards,
                        searched: matched.searched
                    })
                    if (this.state.searched.done) {
                        M.toast({
                            html: this.state.searched.results ? "Matched! :D" : "Not any match :(",
                            classes: this.state.searched.results ? "toastmatch" : "toastnotmatch"
                        })
                    }
                }
            })
            .catch((error) => {
                alert("Oops! There was a problem with the search, try again later")
            })
    }

    removeCard = (cardid) => {
        this.setState({
            ...this.state,
            searched: {
                done: false,
                results: false
            },
            cards: this.state.cards.filter(card => { return card.id !== cardid }),
            cardscount: this.state.cardscount - 1
        })
    }

    render() {
        return (
            <div className="">
                <Navbar />
                <div className="container">
                    <SearchBar searchMovies={this.searchMovies} saveParam={this.saveParam} />
                </div>
                <div className="divider"></div>
                <CardBoard cards={this.state.cards} cardscount={this.state.cardscount} searchMovieInfo={this.searchMovieInfo} removeCard={this.removeCard} searched={this.state.searched} />
            </div>
        )
    }
}

export default App
