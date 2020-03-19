import React, {Component} from 'react';
import classes from '../styles/TextBox.module.css';


export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textEnglish: this.props.textEnglish,
            textHebrew: this.props.textHebrew
        };

    }





    render() {
        return (
            <div className={'col-12 ' + classes.TextBox}>
                <p>{this.state.textHebrew}</p>
                <p>{this.state.textEnglish}</p>
            </div>

        )
    }
}