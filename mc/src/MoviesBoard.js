import React from 'react';

const MoviesBoard = ({movieresults, searchMovieInfo}) => {
  return (
    <div className="movies-list">
      {
        movieresults.map(movie => {
          return (
            <div className="movie" key={movie.id}>
              <ul>
                <li>{movie.title}  - {movie.release_date} <button onClick={() => {searchMovieInfo(movie.id)}}>go!</button></li>
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

export default MoviesBoard