import React from 'react';

const CastBoard = ({movieinfo}) => {
    let poster = "https://image.tmdb.org/t/p/w200/" + movieinfo.poster_path;
    return(
        <div>
            <div className="section">
                <h5>{movieinfo.title}</h5>
                <img src={poster} alt="" className="circle responsive-img"></img>
                <p>{movieinfo.release_date}</p>
            </div>
            <div className="divider"></div>
            <ul className="collection">
              {
                movieinfo.Cast.map(member => {
                    let photo = "https://image.tmdb.org/t/p/w200/" + member.profile_path;
                    return (
                        <li className="collection-item avatar" key={member.id}>
                            <img src={photo} alt="" className="circle responsive-img"></img>
                            <span className="title">{member.name}</span>
                            <p>{member.character}</p>
                        </li>
                    )
                })
              }
            </ul>
        </div>
    )
}

export default CastBoard