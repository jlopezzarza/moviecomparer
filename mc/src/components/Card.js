
import React from 'react';
import Movies from '../components/board/Movies';
import Cast from '../components/board/Cast';

const Card = ({ card, searchMovieInfo }) => {
    let board;
    if (card.loadmovies) {
        board = <Movies movieresults={card.movieresults} cardid={card.id} searchMovieInfo={searchMovieInfo} />;
    } else if (card.loadinfo) {
        board = <Cast movieinfo={card.movieinfo} cardid={card.id} />;
    }
    return (
        <div className="cardresult row">
            {board}
        </div>
    )
}

export default Card
