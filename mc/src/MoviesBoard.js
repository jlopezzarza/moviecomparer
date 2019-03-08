import React from 'react';

const MoviesBoard = ({movieresults, searchMovieInfo}) => {
  return (
    <div className="movieslist">
      <ul className="collection">
        {
          movieresults.map(movie => {
            return (
              <li class="collection-item avatar" key={movie.id}>
                <span class="title">{movie.title}</span>
                <p>{movie.release_date}</p>
                <a href="#!" class="secondary-content"><i class="material-icons" onClick={() =>   {searchMovieInfo(movie.id)}}>send</i></a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default MoviesBoard