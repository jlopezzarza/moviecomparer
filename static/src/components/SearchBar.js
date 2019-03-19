import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import axios from 'axios'
import photo from '../images/photo.png'

class SearchBar extends Component {
    state = {
        value: '',
        items: [{ "vote_count": 0, "id": 0, "title": "", "release_date": "" },]
    }

    searchMovies = (e) => {
        if (this.state.value != null) {
            axios.get(encodeURI("/api/searchmovies/" + this.state.value))
                .then(res => {
                    if (res.data.results.length > 0) {
                        this.setState({
                            items: res.data.results
                        })
                    } else {
                        console.log("no result")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert("Oops! There was a problem with the search, try again later");
                })
        }
    }

    render() {
        return (
            <div>
                <Autocomplete
                    items={this.state.items}
                    shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.title}
                    renderItem={(item, highlighted) =>
                        <div key={item.id} style={{ backgroundColor: highlighted ? '#c9e9e6' : 'transparent', position: "relative" }} className="row">
                            <div className="col s4"><img src={item.poster_path ? "https://image.tmdb.org/t/p/w200/" + item.poster_path : photo} alt="" className="autocompleteimg" ></img></div>
                            <div className="col s8 left-align">
                                <h6>{item.title}</h6>
                                <p className="grey-text">{item.release_date}</p>
                            </div>
                        </div>
                    }
                    value={this.state.value}
                    renderMenu={function (items, value, style) {
                        return <div style={{ ...style, ...this.menuStyle }} children={items} className="collection" />
                    }}
                    onChange={e => {
                        this.setState({ value: e.target.value })
                        if (e.target.value.length > 2) {
                            this.searchMovies(e)
                        } else {
                            this.setState({ items: [{ "vote_count": 0, "id": 0, "title": "", "release_date": "" },] })
                        }
                    }
                    }
                    menuStyle={{
                        borderRadius: '3px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '2px 0',
                        fontSize: '100%',
                        position: 'fixed',
                        overflow: 'scroll',
                        zIndex: "9999",
                        maxHeight: '50%',
                        display: 'block',
                    }}
                    onSelect={(val, item) => { this.props.searchMovieInfo(item.id) }}
                />
            </div>
        )
    }
}

export default SearchBar