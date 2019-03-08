import React from 'react';

const MoviesBoard = ({movieresults, searchMovieInfo}) => {
  return (
    <div className="movieslist">
      <ul className="collection">
        {
          movieresults.map(movie => {
            return (
              <li className="collection-item avatar" key={movie.id}>
                <span className="title">{movie.title}</span>
                <p>{movie.release_date}</p>
                <a href="#!" className="secondary-content"><i className="material-icons" onClick={() =>   {searchMovieInfo(movie.id)}}>send</i></a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default MoviesBoard