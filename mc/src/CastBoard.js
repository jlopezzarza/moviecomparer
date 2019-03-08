import React from 'react';

const CastBoard = ({movieinfo}) => {
    return(
        <div>
            <div className="section">
                <h5>{movieinfo.title}</h5>
                <p>{movieinfo.release_date}</p>
            </div>
            <div className="divider"></div>
            <ul className="collection">
              {
                movieinfo.Cast.map(member => {
                  return (
                    <li className="collection-item avatar" key={member.id}>
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