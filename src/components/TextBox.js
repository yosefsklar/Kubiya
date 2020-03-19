import React, {Component} from 'react';


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
            <div className='col-sm'>
                <p>{this.state.textHebrew}</p>
                <p>{this.state.textEnglish}</p>
            </div>

        )
    }
}