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
        let userTexts = this.selectRandomTexts(3, tanakhTexts);
        this.state = {
            userTexts: userTexts,
            textInfos: [],
            labels: [],
//            count: 0
        };
    }


    componentDidMount(){
        this.getTextInfo(this.state.userTexts);
        this.getLabels(this.state.userTexts);
    }

/*    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.userTexts !== prevState.userTexts) {
            this.getTextInfo(this.state.userTexts);
            this.getLabels(this.state.userTexts);
        }
        console.log("component did update");
    }*/

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.getTextInfo(this.props.userTexts);
    // }

    getTextInfo(textInfoArray) {
        let copyInfoArray = [...textInfoArray];
        let singleTextInfoArray = [];
        for (let i = 0; i < copyInfoArray.length; i++) {
            singleTextInfoArray.push(copyInfoArray[0]);
        }
        Promise.all(singleTextInfoArray.map(textName => {
            let subtextNumber = this.chooseRandomSubtext(textName, tanakhTextsChapters);
            console.log(textName + ' . ' + subtextNumber);
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName + '.' + subtextNumber;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    let vn = this.chooseRandomVerse(data.text);
                    return(new TextInfo(data.indexTitle, data.heTitle, data.he[vn], data.text[vn]));
                });
        })).then(values => {
            console.log("Text Values");
            console.log(values);
            this.setState({
                textInfos : values,
  //              count: this.state.count + 3
            }, ()=> console.log("finished changes texts"));
        })
    }
    // getLabels(textInfoArray){
    //     let copyInfoArray = [...textInfoArray];
    //     let labels = [];
    //     copyInfoArray.map(textName => {
    //         let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
    //         return fetch(fetchString)
    //             .then((response) => {
    //                 return response.json();
    //             }).then((data) => {
    //                 data['text'] = P.cleanText(data.text);
    //                // //console.log(data);
    //                 let correct = (textName == copyInfoArray[0]);
    //                 labels.push(new Label(data.indexTitle,data.heTitle, correct));
    //                 this.setState({
    //                     labels: labels
    //                 });
    //             });
    //     });
    // }

    getLabels(textInfoArray){
        let copyInfoArray = [...textInfoArray];
        let labels = [];
        Promise.all(copyInfoArray.map(textName => {
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    // console.log(data);
                    let correct = (textName == copyInfoArray[0]);
                    return (new Label(data.indexTitle,data.heTitle, correct));
                });
        })).then(values => {
            console.log("Label values");
            console.log(values);
            this.setState({
                labels : values
            }, ()=> console.log("finished changes labels"));
        });
    }

    selectRandomTexts(num, textArr){
        let copyArr = [...textArr]
        let newUserTexts = [];
        for (let i = 0; i < num; i++) {
            let index = Math.floor(Math.random() * copyArr.length);
            newUserTexts.push(copyArr[index]);
            copyArr.splice(index,1)
        }
        console.log("Pre-Selected " + newUserTexts);
        return newUserTexts;
    }

    resetRoundHandler = () =>{
        //window.alert("hi");
        this.userTexts = this.selectRandomTexts(3, tanakhTexts);
        console.log("After Click " + this.userTexts);
        this.setState({
            userTexts : this.userTexts
        }, () => {
            console.log("Post Click state" + this.state.userTexts);
            this.getTextInfo(this.state.userTexts);
            this.getLabels(this.state.userTexts);
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

    hashcode (str) {
        var hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };


render(){
         console.log("rerender");
        // console.log(this.state.textInfos);
        // console.log("this rerenders first label ");
        console.log(this.state.labels);

        let textCompArray = [];
        let labelCompArray ;
        if(this.state.textInfos.length > 0) {
            textCompArray = this.state.textInfos.map((text, i) => {
                //console.log("text " + i + " " + text.textNameEnglish);
            return (<TextBox key={this.hashcode(text.textEnglish)} textEnglish={text.textEnglish}
                                                                           textHebrew={text.textHebrew}/>)});
            labelCompArray = this.state.labels.map((label, i) => {
               // console.log("label " + i + " " + label.textNameEnglish);
                return(<LabelBox key={this.hashcode(label.textNameEnglish)} textNameEnglish={label.textNameEnglish}
                                                                           textNameHebrew={label.textNameHebrew}
                                                                           correct={label.correct}
                                                                           resetRoundHandler={this.resetRoundHandler}/>)});
        }
        // console.log("the final arrays")
        // console.log(textCompArray);
        //     console.log(labelCompArray)

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
    I_Samuel: 31,
    II_Samuel: 24,
    I_Kings: 22,
    II_Kings: 25,
    Isaiah: 66,
    Jeremiah: 52,
    Ezekiel: 48,
    Hosea: 14,
    Joel: 4,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 3,
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

const tanakhTexts = ['Genesis', 'Exodus','Leviticus','Numbers','Deuteronomy','Joshua', 'Judges', 'I_Samuel','II_Samuel',
    'I_Kings', 'II_Kings', 'Isaiah','Jeremiah','Ezekiel','Hosea','Joel','Amos','Obadiah', 'Jonah','Micah','Nahum','Habakkuk',
    'Zephaniah','Haggai','Zechariah','Malachi','Psalms', 'Proverbs','Job','Song_of_Songs', 'Ruth', 'Lamentations', 'Ecclesiastes',
    'Esther', 'Daniel','Ezra', 'Nehemiah','I_Chronicles','II_Chronicles']

