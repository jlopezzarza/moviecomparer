import React from 'react'

const SearchBar = ({ searchMovies, saveParam }) => {
    return (
        <div>
            <form onSubmit={searchMovies}>
                <div className="input-field">
                    <i className="material-icons prefix">movie_filter</i>
                    <input id="movie_title" type="text" className="" onChange={saveParam} />
                    <label htmlFor="movie_title">Enter movie titles to search and compare</label>
                </div>
            </form>
        </div>
    )
}

export default SearchBar