import React, {Component} from 'react';
import TextBox from './TextBox';
import LabelBox from './LabelBox';
import TimeBox from './TimeBox'
import classes from '../styles/MatchingRound.module.css'
import Parser from "./classes/Parser";

const P = new Parser();


export default class MatchingRound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfos: [],
            labels: []
        };
    }


    componentDidMount(){
        this.getTextInfo(this.props.userTexts);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.userTexts !== prevProps.userTexts) {
            this.getTextInfo(this.props.userTexts);
        }
        console.log("component did update");
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.getTextInfo(this.props.userTexts);
    // }

    getTextInfo(textInfoArray){
        let textInfos = []
        let singleTextInfoArray = [];
        for(let i = 0; i < textInfoArray.length; i++){
            singleTextInfoArray.push(textInfoArray[0]);
        }
        singleTextInfoArray.map(textName =>{
            let subtextNumber = this.chooseRandomSubtext(textName,tanakhTextsChapters);
            console.log(textName +  ' . ' + subtextNumber);
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName + '.' + subtextNumber;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    let vn = this.chooseRandomVerse(data.text);
                    textInfos.push(new TextInfo(data.indexTitle,data.heTitle, data.he[vn], data.text[vn]));
                    this.setState({
                        textInfos: textInfos
                    });
                });
        })
        let labels = [];
        textInfoArray.map(textName => {
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                   // console.log(data);
                    let correct = (textName == textInfoArray[0]);
                    labels.push(new Label(data.indexTitle,data.heTitle, correct));
                    this.setState({
                        labels: labels
                    });
                });
        });
    }

    chooseRandomSubtext(textName, textDict){
         let num = Math.ceil(Math.random() * textDict[textName]);
        // console.log('num=' + num );
        return num;
    }

    chooseRandomVerse(textArr){
        return Math.floor(Math.random() * textArr.length);
    }

    render(){
        console.log("this rerenders first text ");
        console.log(this.state.textInfos);
        console.log("this rerenders first label ");
        console.log(this.state.labels);

        let textCompArray = [];
        let labelCompArray = [];
        if(this.state.textInfos.length > 0) {
            textCompArray = this.state.textInfos.map((text, i) => <TextBox key={i} textEnglish={text.textEnglish}
                                                                           textHebrew={text.textHebrew}/>);
            labelCompArray = this.state.labels.map((label, i) => <LabelBox key={i} textNameEnglish={label.textNameEnglish}
                                                                           textNameHebrew={label.textNameHebrew}
                                                                           correct={label.correct}
                                                                           resetRoundHandler={this.props.resetRoundHandler}/>);
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
            <TimeBox/>
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

class Label{
    constructor(textNameEnglish, textNameHebrew, correct){
        this.textNameEnglish = textNameEnglish;
        this.textNameHebrew = textNameHebrew;
        this.correct = correct;
    }
}

const tanakhTextsChapters = {
    Genesis: 50,
    Exodus:40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    I_Samuel: 4,
    II_Samuel: 31,
    I_Kings: 24,
    II_Kings: 22,
    Isaiah: 66,
    Jeremiah: 52,
    Ezekiel: 48,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Psalms: 150,
    Proverbs: 31,
    Job: 42,
    Song_of_Songs: 8,
    Ruth: 4,
    Lamentations: 5,
    Ecclesiastes: 12,
    Esther: 10,
    Daniel: 12,
    Ezra: 10,
    Nehemiah: 13,
    I_Chronicles: 29,
    II_Chronicles: 36
}

