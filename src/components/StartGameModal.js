import React from 'react';
import classes from '../styles/StartGameModal.module.css';
import Modal from './assets/Modal';
import {BtnBig} from "./assets/buttons";

const StartGameModal = (props) => {

    return (
        <Modal>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>You will be presented with 3 verses from a book in the Hebrew Bible. They will appear on the screen gradually.
            the fewer hints you are given before you guess the more a correct answer is worth. </p>
            <p>!בהצלחה</p>
            <BtnBig onClick={props.startGame}>Start</BtnBig>
        </Modal>
    )
}

export default StartGameModal;