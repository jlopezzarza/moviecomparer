
import React from 'react'
import Movies from '../components/board/Movies'
import Cast from '../components/board/Cast'

const Card = ({ card, searched, searchMovieInfo, removeCard }) => {
    let board
    if (card.loadmovies) {
        board = <Movies movieresults={card.movieresults} cardid={card.id} searchMovieInfo={searchMovieInfo} />
    } else if (card.loadinfo) {
        board = <Cast movieinfo={card.movieinfo} searched={searched} />
    }
    return (
        <div className="cardresult row">
            <a href="#!" className="btn btn-small waves-effect waves-light red left card-button" onClick={() => { removeCard(card.id) }}><i className="material-icons">clear</i></a>
            <div>{board}</div>
        </div>
    )
}

export default Card
