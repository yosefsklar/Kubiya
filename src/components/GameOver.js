import React from 'react';
import classes from '../styles/StartGameModal.module.css';


const GameOver = (props) => {

    return (
        <div className={classes.StartGame}>
            <h1>Final Score:</h1>
            <h1>{props.score}</h1>
            <p>Thanks for Playing!</p>
            <button className={classes.Label} onClick={props.reStartGame}>Play again</button>
        </div>
    )
}

export default GameOver;