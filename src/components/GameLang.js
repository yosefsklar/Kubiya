import React from 'react';
import classes from '../styles/StartGameModal.module.css';


const GameLang = (props) => {

    return (
        <div className={classes.StartGame}>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>Please choose a language for the verses</p>
            <div className={'container'}>
                <div className={'row'}>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setLang('hebrew')}>Hebrew</button>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setLang('english')}>English</button>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setLang('both')}>Both</button>
                </div>
            </div>
        </div>
    )
}

export default GameLang;