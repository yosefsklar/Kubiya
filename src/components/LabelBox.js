import React, {Component} from 'react';
import classes from '../styles/LabelBox.module.css'

export default class LabelBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textNameEnglish: this.props.textNameEnglish,
            textNameHebrew: this.props.textNameHebrew,
        };

    }


    render() {
        return (
            <div className={'col-sm '}>
                <button className={classes.Label} onClick={this.props.resetRoundHandler}>
                <h1>{this.state.textNameHebrew}</h1>
                <h1>{this.state.textNameEnglish}</h1>
                </button>
            </div>

        )
    }
}