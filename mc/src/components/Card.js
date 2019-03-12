
import React from 'react';
import Movies from '../components/board/Movies';
import Cast from '../components/board/Cast';

const Card = ({ card, searched, searchMovieInfo }) => {
    let board;
    if (card.loadmovies) {
        board = <Movies movieresults={card.movieresults} cardid={card.id} searchMovieInfo={searchMovieInfo} />;
    } else if (card.loadinfo) {
        board = <Cast movieinfo={card.movieinfo} searched={searched}/>;
    }
    return (
        <div className="cardresult row">
            {board}
        </div>
    )
}

export default Card
