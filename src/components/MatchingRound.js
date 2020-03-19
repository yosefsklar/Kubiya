import React, {Component} from 'react';
import TextBox from './TextBox';
import LabelBox from './LabelBox';
import classes from '../styles/MatchingRound.module.css'
import Parser from "./classes/Parser";

const P = new Parser();


export default class MatchingRound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfos: []
        };
    }

    //

    componentDidMount(){
        this.getTextInfo(this.props.userTexts);

    }

    getTextInfo(textInfoArray){
        let textInfos = []
        textInfoArray.map(textName =>{
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    console.log(data);
                    textInfos.push(new TextInfo(data.indexTitle,data.heTitle, data.he[0], data.text[0]));
                    this.setState({
                        textInfos: textInfos
                    });
                    console.log(this.state.textInfos)
                });
        })

    }

    render(){
        console.log("render");
        let textCompArray = [];
        let labelCompArray = [];
        if(this.state.textInfos.length > 0) {
            textCompArray = this.state.textInfos.map((text, i) => <TextBox key={i} textEnglish={text.textEnglish}
                                                                           textHebrew={text.textHebrew}/>);
            labelCompArray = this.state.textInfos.map((text, i) => <LabelBox key={i} textNameEnglish={text.textNameEnglish}
                                                                             textNameHebrew={text.textNameHebrew}/>);
        }

    return (
        <div className={'container ' + classes.GameDesk}>
            <h1>Match the Verse to the Correct Text</h1>
            <div className='row'>
                {textCompArray}
            </div>
            <div className='row'>
                {labelCompArray}
            </div>
        </div>
    )};
}

class TextInfo {
    constructor(textNameEnglish,textNameHebrew,textHebrew,textEnglish){
        this.textNameEnglish = textNameEnglish;
        this.textNameHebrew = textNameHebrew;
        this.textHebrew = textHebrew;
        this.textEnglish = textEnglish;
    }

}

