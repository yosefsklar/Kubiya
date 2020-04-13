import React, {Component} from 'react';
import classes from '../styles/TextBox.module.css';
const tanakhN = require('./dicts/tanakh_names.json')

const TextBox = (props) => {
    let finalText =  {hebrew: props.showText.textHebrew[props.showText.verseNumber],
        english: props.showText.textEnglish[props.showText.verseNumber],
        both: props.showText.textHebrew[props.showText.verseNumber] +
            props.showText.textEnglish[props.showText.verseNumber]
    }[props.lang]
    //there will be flaws here differentiating between underscores and names
    tanakhN[props.showText.textNameEnglish.replace(" ","_")].forEach (name => {
        finalText = finalText.split(" ").map(textWord => {
            if(stripVowels(textWord).includes(name)){
                return stripVowels(textWord).replace(name, '_'.repeat(name.length) + " ");
            }
            return textWord;
        }).join(" ");
    })


    console.log("finaltext: " + {finalText} )
    return (
        <div className={'col-12 ' + classes.TextBox + " " + (props.lang == 'hebrew' ? classes.Hebrew : classes.English)}>
            <p>{finalText}</p>
        </div>

    )
}
export default TextBox;

const stripVowels =(rawString) => {
    return rawString.replace(/[\u0591-\u05C7]/g,"")
}