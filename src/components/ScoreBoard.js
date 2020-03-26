import React from 'react';

const ScoreBoard = (props) => {
    return(
        <div style={{display: 'inline'}}>
            <h1>Score: {props.score}</h1>
        </div>

    )

}

export default ScoreBoard;