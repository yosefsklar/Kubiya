import React from 'react';
import classes from '../styles/StartGameModal.module.css';


const GameText = (props) => {

    return (
        <div className={classes.StartGame}>
            <h1>Game: שלושה מי יודע</h1>
            <p className={classes.Instructions}>Please choose a text</p>
            <div className={'container'}>
                <div className={'row'}>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setText('tanakh')}>Tanakh</button>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setText('mishnah')}>Mishnah</button>
                    <button className={'col-sm ' + classes.LabelConfig} onClick={() => props.setText('talmud')}>Talmud</button>
                </div>
            </div>
        </div>
    )
}

export default GameText;