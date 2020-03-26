import React from 'react';
import classes from '../styles/StartGameModal.module.css';


const StartGameModal = (props) => {

    return (
        <div className={classes.StartGame}>
            <h1>Are You Ready?</h1>
            <button className={classes.Label} onClick={props.startGame}>Start</button>
        </div>
    )
}

export default StartGameModal;