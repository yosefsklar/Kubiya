import React from 'react';
import classes from '../styles/StartGameModal.module.css';
import Modal from './assets/Modal';
import {BtnConfig} from "./assets/buttons";


const GameLevel = (props) => {

    return (
        <Modal>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>Please choose a difficulty level</p>
            <div className={'container'}>
                <div className={'row'}>
                    <BtnConfig setConfig={() => props.setLevel('easy')}>Easy</BtnConfig>
                    <BtnConfig setConfig={() => props.setLevel('medium')}>Medium</BtnConfig>
                    <BtnConfig setConfig={() => props.setLevel('hard')}>Hard</BtnConfig>
                </div>
            </div>
        </Modal>
    )
}

export default GameLevel;