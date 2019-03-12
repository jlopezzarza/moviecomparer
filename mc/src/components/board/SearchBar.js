import React from 'react'

const SearchBar = ({ searchMovies, saveParam }) => {
    return (
        <div>
            <form onSubmit={searchMovies}>
                <div className="input-field">
                    <i className="material-icons prefix">movie_filter</i>
                    <input id="movie_title" type="text" className="validate" onChange={saveParam} />
                    <label for="movie_title">Enter the movie title</label>
                </div>
            </form>
        </div>
    )
}

export default SearchBar