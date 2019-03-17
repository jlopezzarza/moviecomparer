import React from 'react'
import Card from './Card'

const CardBoard = ({ cards, cardscount, searchMovieInfo, removeCard, searched }) => {
    let gridsize = "col s12 m" + (12 / cardscount)
    return (
        <div className="board row center">
            {
                cards.map((card, i) => {
                    return (
                        <div className={gridsize} key={i}>
                            <Card card={card} searchMovieInfo={searchMovieInfo} removeCard={removeCard} searched={searched} cardscount={cardscount}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardBoard