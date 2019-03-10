import React from 'react';
import photo from '../../images/photo.png';

const Cast = ({ movieinfo }) => {
    let poster = movieinfo.poster_path ? "https://image.tmdb.org/t/p/w200/" + movieinfo.poster_path : photo
    return (
        <div className="card section center">
            <img src={poster} alt="" className="responsive-img "></img>
            <h5 className="truncate">{movieinfo.title}</h5>
            <p className="grey-text">{movieinfo.release_date}</p>
            <ul className="collection">
                {
                    movieinfo.Cast.map(member => {
                        let castphoto = member.profile_path ? "https://image.tmdb.org/t/p/w200/" + member.profile_path : photo
                        return (
                            <li className="collection-item avatar" key={member.id}>
                                <img src={castphoto} alt="not found" className="circle responsive-img"></img>
                                <span className="title truncate">{member.name}</span>
                                <p className="grey-text truncate">{member.character}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Cast