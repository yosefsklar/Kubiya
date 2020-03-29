import React from 'react';
import classes from '../styles/StartGameModal.module.css';
import Modal from './assets/Modal';
import {BtnConfig} from "./assets/buttons";


const GameText = (props) => {

    return (
        <Modal>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>Please choose a text</p>
            <div className={'container'}>
                <div className={'row'}>
                    <BtnConfig setConfig={() => props.setText('tanakh')}>Tanakh</BtnConfig>
                    <BtnConfig setConfig={() => props.setText('mishnah')}>Mishnah</BtnConfig>
                    <BtnConfig setConfig={() => props.setText('talmud')}>Talmud</BtnConfig>
                </div>
            </div>
        </Modal>
    )
}

export default GameText;