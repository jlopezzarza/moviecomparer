import React from 'react';
import photo from '../../images/photo.png';

const Movies = ({movieresults, searchMovieInfo, cardid}) => {
  return (
    <div className="card">
      <ul className="collection">
        {
          movieresults.map(movie => {
            let poster = movie.poster_path ? "https://image.tmdb.org/t/p/w200/" + movie.poster_path : photo
            return (
              <li className="collection-item avatar" key={movie.id}>
                <img src={poster} alt="" className="circle responsive-img"></img>
                <span className="title truncate">{movie.title}</span>
                <p className="grey-text">{movie.release_date}</p>
                <a href="#!" className="secondary-content"><i className="material-icons" onClick={() => {searchMovieInfo(movie.id, cardid)}}>send</i></a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Movies