import React from 'react'
import photo from '../../images/photo.png'

const Movies = ({ movieresults, searchMovieInfo, cardid, cardscount }) => {
    let colsize = { 4: 6, 3: 4, 2: 4, 1: 2 }
    let gridsize = "col s6 m6 l" + colsize[cardscount]
    return (
        <div className="card section">
            <div className="row"></div>
            {
                movieresults.map(movie => {
                    let poster = movie.poster_path ? "https://image.tmdb.org/t/p/w200/" + movie.poster_path : photo
                    return (
                        <div className={gridsize} key={movie.id}>
                            <div className="card hoverable">
                                <div className="card-image">
                                    <img src={poster} alt="" className="activator responsive-img"></img>
                                </div>
                                <div className="card-reveal left-align">
                                <a href="#!" className="card-title grey-text text-darken-4">{movie.title}<i className="material-icons tiny right">close</i></a>
                                    <p className="grey-text">{movie.release_date}</p>
                                    <a href="#!" className="btn-floating btn-small waves-effect waves-light teal"><i className="tiny material-icons" onClick={() => { searchMovieInfo(movie.id, cardid) }}>send</i></a>
                                </div>
                                <a href="#!" className="btn-floating btn-small halfway-fab waves-effect waves-light teal"><i className="tiny material-icons center" onClick={() => { searchMovieInfo(movie.id, cardid) }}>send</i></a>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Movies