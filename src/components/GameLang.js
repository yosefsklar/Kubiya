import React from 'react';
import classes from '../styles/StartGameModal.module.css';
import Modal from './assets/Modal';
import {BtnConfig} from "./assets/buttons";


const GameLang = (props) => {

    return (
        <Modal>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>Please choose a language for the verses</p>
            <div className={'container'}>
                <div className={'row'}>
                    <BtnConfig setConfig={() => props.setLang('hebrew')}>Hebrew</BtnConfig>
                    <BtnConfig setConfig={() => props.setLang('english')}>English</BtnConfig>
                    <BtnConfig setConfig={() => props.setLang('both')}>Both</BtnConfig>
                </div>
            </div>
        </Modal>
    )
}

export default GameLang;