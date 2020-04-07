import React from 'react';
import classes from '../styles/AnswerInformer.module.css';

const AnswerInformer = (props) => {
    let colorClass = props.correct ? classes.Correct : classes.Incorrect;
    let langClass = props.lang == 'hebrew' ? classes.Hebrew : classes.English;
    let answer = <p>Correct Answer:  {props.answer.textNameEnglish}</p>;
    let correct = <p className={colorClass}> {props.correct ? 'Correct!' : 'Incorrect'}</p>;
    let points = <p>+{props.addedPoints}  </p>;
    let beforeContext ='';
    let contextRange = {hebrew: {tanakh: 3, mishnah: 1, talmud: 2},english: {tanakh: 3, mishnah: 1, talmud: 1}}[props.lang][props.text]
    for(let i = props.answer.verseNumber - contextRange; i < props.answer.verseNumber; i++){
        if(i >=0){
            if(props.lang == 'hebrew'){
                beforeContext += props.answer.textHebrew[i]+ ' ';
            }
            else{
                beforeContext += props.answer.textEnglish[i]+ ' ';
            }
        }
    }
    let answerText = <span className={colorClass}>{props.lang =='hebrew' ? props.answer.textHebrew[props.answer.verseNumber] + " " :
        props.answer.textEnglish[props.answer.verseNumber] + " "}</span>

    let afterContext ='';
    for(let i = props.answer.verseNumber + 1; i <= props.answer.verseNumber + contextRange && i < props.answer.textHebrew.length; i++){
        if(i >=0){
            if(props.lang == 'hebrew'){
                afterContext += props.answer.textHebrew[i] + ' ';
            }
            else{
                afterContext += props.answer.textEnglish[i] + ' ';
            }
        }
    }
    let answerContext = <p>{beforeContext}{answerText}{afterContext}</p>;
    return(
        <div className={classes.AnswerInformer}>
            <div className={classes.Header}>
                {correct}
                {props.correct ? points : answer}
            </div>
            <div className={classes.Context}>
                <p className={classes.Title }>{props.answer.textNameHebrew + " " + props.answer.chapter + ":" + (props.answer.verseNumber + 1)} </p>
                <p className={langClass}>{answerContext }</p>
            </div>
        </div>


    )

}

export default AnswerInformer;