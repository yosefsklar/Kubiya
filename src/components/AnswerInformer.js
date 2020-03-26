import React from 'react';
import classes from '../styles/AnswerInformer.module.css';

const AnswerInformer = (props) => {
    let answer = <p>Correct Answer:  {props.answer}</p>;
    let correct = <p className={props.correct ? classes.Correct : classes.Incorrect}> {props.correct ? 'Correct!' : 'Incorrect'}</p>;
    let points = <p>+{props.addedPoints}  </p>
    return(
        <div className={classes.AnswerInformer}>
            {correct}
            {props.correct ? points : answer}
        </div>


    )

}

export default AnswerInformer;