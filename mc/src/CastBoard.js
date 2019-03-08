import React from 'react';

const CastBoard = ({movieinfo}) => {
    return(
        <div className="movieinfo">
            <div class="section">
                <h5>{movieinfo.title}</h5>
                <p>{movieinfo.release_date}</p>
            </div>
            <div class="divider"></div>
            <ul className="collection">
              {
                movieinfo.Cast.map(member => {
                  return (
                    <li class="collection-item avatar" key={member.id}>
                      <span class="title">{member.name}</span>
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