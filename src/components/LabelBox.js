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
                <button className={classes.Label} onClick={() => this.props.resetRoundHandler(this.props.correct ? 1 : 0)} >
                <h1>{this.props.textNameHebrew}</h1>
                <h1>{this.props.textNameEnglish}</h1>
                </button>
            </div>

        )
    }
}