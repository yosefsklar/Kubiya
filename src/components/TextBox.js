import React, {Component} from 'react';
import classes from '../styles/TextBox.module.css';


const TextBox = (props) => {

    return (
        <div className={'col-12 ' + classes.TextBox + " " + (props.lang == 'hebrew' ? classes.Hebrew : classes.English)}>
            {
                {hebrew: <p>{props.showText.textHebrew[props.showText.verseNumber]}</p>,
                english: <p>{props.showText.textEnglish[props.showText.verseNumber]}</p>,
                both: <div><p>{props.showText.textHebrew[props.showText.verseNumber]}</p>
                    <p>{props.showText.textEnglish[props.showText.verseNumber]}</p></div>,
                }[props.lang]
            }
        </div>

    )
}
export default TextBox;