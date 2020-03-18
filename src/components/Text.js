import React, {Component} from 'react';



export default class DeskBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textNameEnglish: '',
            textNameHebrew: '',
            textEnglish: '',
            textHebrew: ''
        };

    }

    componentDidMount(){
        this.getText();
    }

    getText(){
        fetch('http://www.sefaria.org/api/texts/Kohelet.5')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
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