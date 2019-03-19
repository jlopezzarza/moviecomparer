import React, { Component } from 'react'
import Navbar from './components/Navbar'
import CardBoard from './components/Board'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './styles/custom.css'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import { matchCast } from './utils/utils'

class App extends Component {
    state = {
        cards: [],
        searched: {
            done: false,
            results: false
        },
        cardscount: null,
        lastid: 0
    }

    searchMovieInfo = (movieid) => {
        axios.get(encodeURI("/api/movieinfo/" + movieid))
            .then(res => {
                let card = {
                    id: this.state.lastid,
                    movieinfo: res.data,
                }
                this.setState({
                    cards: [...this.state.cards, card],
                    lastid: this.state.lastid + 1,
                    cardscount: this.state.cards.length + 1
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
                <div className="container center">
                    <SearchBar searchMovieInfo={this.searchMovieInfo} />
                </div>
                <div className="divider"></div>
                <CardBoard cards={this.state.cards} cardscount={this.state.cardscount} searchMovieInfo={this.searchMovieInfo} removeCard={this.removeCard} searched={this.state.searched} />
            </div>
        )
    }
}

export default App
