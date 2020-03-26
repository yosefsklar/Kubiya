import React from 'react';
import classes from '../styles/StartGameModal.module.css';


const StartGameModal = (props) => {

    return (
        <div className={classes.StartGame}>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>You will be presented with 3 verses from a book in the Hebrew Bible. They will appear on the screen gradually.
            the fewer hints you are given before you guess the more a correct answer is worth. </p>
            <p>!בהצלחה</p>
            <button className={classes.Label} onClick={props.startGame}>Start</button>
        </div>
    )
}

export default StartGameModal;