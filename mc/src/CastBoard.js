import React from 'react';

const CastBoard = ({ movieinfo }) => {
    return(
        <div className="movieinfo">
            <p>{ movieinfo.title } - { movieinfo.release_date }</p>
            <div className="castList">
                {
                    movieinfo.Cast.map(member => {
                        return(
                            <div className="member" key={member.id}>
                                <p>{ member.name }</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CastBoard