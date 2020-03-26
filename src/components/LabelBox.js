import React, {Component} from 'react';
import classes from '../styles/LabelBox.module.css'

export default class LabelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        return (
            <div className={'col-sm '}>
                <button className={classes.Label} onClick={() => this.props.resetRoundHandler((this.props.correct ? (4 - this.props.clue) * 100 : 0), this.props.correct)} >
                <p>{this.props.textNameHebrew}</p>
                <p>{this.props.textNameEnglish}</p>
                </button>
            </div>

        )
    }
}