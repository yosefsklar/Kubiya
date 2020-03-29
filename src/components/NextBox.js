import React, {Component} from 'react';
import classes from '../styles/LabelBox.module.css'

export default class NextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className={'col-sm '}>
                <button className={classes.Label + ' ' + classes.Small} onClick={this.props.nextClue} >
                    <p>Next Clue</p>
                </button>
            </div>

        )
    }
}