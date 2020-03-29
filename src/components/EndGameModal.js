import React from 'react';
import Modal from './assets/Modal';
import {BtnBig} from "./assets/buttons";

const EndGameModal = (props) => {

    return (
        <Modal>
            <h1>Final Score:</h1>
            <h1>{props.score}</h1>
            <p>Thanks for Playing!</p>
            <BtnBig onClick={props.reStartGame}>Play again</BtnBig>
        </Modal>
    )
}

export default EndGameModal;