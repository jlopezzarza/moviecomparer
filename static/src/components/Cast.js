import React from 'react'
import photo from '../../images/photo.png'

const Cast = ({ movieinfo, searched }) => {
    let poster = movieinfo.poster_path ? "https://image.tmdb.org/t/p/w200/" + movieinfo.poster_path : photo
    let castList = searched.done ? [...movieinfo.Cast.filter(member => member.matched === true), ...movieinfo.Cast.filter(member => member.matched === false)] : movieinfo.Cast

    return (
        <div className="card section">
            <div className="row">
                <div className="col l6 m12 right-align">
                    <h5 className="truncate">{movieinfo.title}</h5>
                    <p className="grey-text hide-on-small-only">{movieinfo.release_date}</p>
                </div>
                <div className="col m2 center hide-on-small-only">
                    <img src={poster} alt="" className="responsive-img "></img>
                </div>
            </div>
            <ul className="collection">
                {
                    castList.map(member => {
                        let castphoto = member.profile_path ? "https://image.tmdb.org/t/p/w200/" + member.profile_path : photo
                        let style = !(searched.done) ? "collection-item avatar" :
                                    member.matched ? "collection-item avatar matched" : "collection-item avatar notmatched hide-on-small-only"

                        return (
                            <li className={style} key={member.id}>
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