import React, {Component} from 'react';
import classes from '../styles/TextBox.module.css';


const TextBox = (props) => {

    return (
        <div className={'col-12 ' + classes.TextBox}>
            {
                {hebrew: <p>{props.textHebrew}</p>,
                english: <p>{props.textEnglish}</p>,
                both: <div><p>{props.textHebrew}</p><p>{props.textEnglish}</p></div>,
                }[props.lang]
            }
        </div>

    )
}
export default TextBox;