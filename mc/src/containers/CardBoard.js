import React from 'react';
import Card from '../components/Card';

const CardBoard = ({cards, cardscount, searchMovieInfo}) => {
    let gridsize = "col s" + (12 / cardscount)
    return (<div className="board row center">{
        cards.map(card => {
            return (<div className={gridsize} key={card.id}>
            <Card card={card} searchMovieInfo={searchMovieInfo} />
            </div>)
        })
    }</div>)
    }

export default CardBoard