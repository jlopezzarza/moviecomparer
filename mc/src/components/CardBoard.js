import React from 'react';
import Card from './Card';

const CardBoard = ({ cards, cardscount, searchMovieInfo }) => {
    let gridsize = "col s" + (12 / cardscount)
    return (
        <div className="board row center">
            {
                cards.map((card, i) => {
                    return (
                        <div className={gridsize} key={i}>
                            <Card card={card} searchMovieInfo={searchMovieInfo} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardBoard