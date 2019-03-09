import React from 'react';

const MoviesBoard = ({movieresults, searchMovieInfo}) => {
  return (
    <div className="movieslist">
      <ul className="collection">
        {
          movieresults.map(movie => {
            let poster = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
            return (
              <li className="collection-item avatar" key={movie.id}>
                <img src={poster} alt="" className="circle responsive-img"></img>
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