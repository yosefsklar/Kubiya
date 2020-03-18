import React, {Component} from 'react';
import Parser from "./classes/Parser";

const P = new Parser();

export default class DeskBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textNameEnglish: this.props.textName,
            textNameHebrew: '',
            textEnglish: '',
            textHebrew: ''
        };

    }

    componentDidMount(){
        this.getText(this.props.textName);
    }

    getText(textName){
        let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
        fetch(fetchString)
            .then((response) => {
                return response.json();
            }).then((data) => {
                data['text'] = P.cleanText(data.text);
                this.setState(
                    {
                        textNameEnglish: data.book,
                        textEnglish: data.text
                    });
                    console.log(data);
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.textNameEnglish}</h1>
                <p>{this.state.textEnglish}</p>
            </div>

        )
    }
}