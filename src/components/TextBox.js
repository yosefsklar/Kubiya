import React, {Component} from 'react';
import classes from '../styles/TextBox.module.css';


export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }





    render() {
        return (
            <div className={'col-12 ' + classes.TextBox}>
                {
                    {hebrew: <p>{this.props.textHebrew}</p>,
                    english: <p>{this.props.textEnglish}</p>,
                    both: <div><p>{this.props.textHebrew}</p><p>{this.props.textEnglish}</p></div>,
                    }[this.props.lang]
                }
            </div>

        )
    }
}