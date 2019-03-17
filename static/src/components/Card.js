
import React, { Component } from 'react'
import Movies from '../components/board/Movies'
import Cast from '../components/board/Cast'

class Card extends Component {
    state = {
        expanded: true,
        autocompressed: false
    }

    collapseCard = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        })
    }

    componentDidUpdate() {
        if (window.innerWidth < 600 && this.state.expanded && !this.state.autocompressed) {
                this.setState({
                    expanded: false,
                    autocompressed: true
                })
        }
    }

    render() {
        let board
        if (this.props.card.loadmovies) {
            board = <Movies movieresults={this.props.card.movieresults} cardid={this.props.card.id} searchMovieInfo={this.props.searchMovieInfo} cardscount={this.props.cardscount} />
        } else if (this.props.card.loadinfo) {
            board = <Cast movieinfo={this.props.card.movieinfo} searched={this.props.searched} />
        }

        let display = {
            style: this.state.expanded ? "scale-trasition" : "scale-transition scale-out collapsedboard",
            button: this.state.expanded ? "unfold_more" : "unfold_less",
        }

        let status = this.state.expanded ? "" :
                        this.props.card.loadmovies ? "movie" :
                        this.props.card.loadinfo && this.props.searched.results ? "done people" :
                        this.props.searched.results ? "done people" : "people_outline"

        return (
            <div className="cardresult row">
                <a href="#!" className="btn btn-small waves-effect waves-light red left card-button" onClick={() => { this.props.removeCard(this.props.card.id) }}><i className="material-icons tiny">clear</i></a>
                <a href="#!" className="btn btn-small waves-effect waves-light amber left card-button" onClick={this.collapseCard}><i className="material-icons tiny">{display.button}</i></a>
                <div className="right">
                    <i className="material-icons">{status}</i>
                </div>
                <div className={display.style}>{board}</div>
            </div>
        )
    }
}

export default Card
