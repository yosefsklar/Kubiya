import React, {Component} from 'react';
import TextBox from './TextBox';
import LabelBox from './LabelBox';
import TimeBox from './TimeBox';
import ScoreBoard from './ScoreBoard'
import AnswerInformer from './AnswerInformer';
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
            round: 0,
            clue: 1,
            answerInform: false,
            answeredCorrectly: false,
            correctAnswer: '',
            addedPoints: 0,
        };
    }


    componentDidMount(){
        this.getTextInfo(this.state.userTexts);
        this.getLabels(this.state.userTexts);
    }


    getTextInfo(textInfoArray) {
        let copyInfoArray = [...textInfoArray];
        let singleTextInfoArray = [];
        let correctAnswer = copyInfoArray[0];
        for (let i = 0; i < copyInfoArray.length; i++) {
            singleTextInfoArray.push(correctAnswer);
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
                count: this.state.count + 3
            }, ()=> console.log("finished changes texts"));
        })
    }


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
            this.shuffleArray(values)
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

    resetRoundHandler = (score,correct) =>{
        //window.alert("hi");
        this.userTexts = this.selectRandomTexts(3, tanakhTexts);
        console.log("After Click " + this.userTexts);
        this.props.updateScoreHandler(score);
        let correctAnswer = this.state.textInfos[0].textNameEnglish;
        this.setState({
            userTexts : this.userTexts,
            clue: 1,
            answeredCorrectly: correct,
            answerInform : true,
            correctAnswer: correctAnswer,
            addedPoints: score
        }, () => {
            console.log("Post Click state" + this.state.userTexts);
            this.correctAnswerShow();
            this.getTextInfo(this.state.userTexts);
            this.getLabels(this.state.userTexts);
        });
    }

    correctAnswerShow = () =>{

        let timer = setInterval( () => {
            this.setState({
                answerInform : false,
                round : this.state.round + 1,
            });
            clearInterval(timer);
        },2000)

    }

    resetClue = () =>{
        if(this.state.clue == 3){
            this.resetRoundHandler(0, false);
        }
        else{
            this.setState({
                clue : this.state.clue + 1
            });
        }
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

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


render(){
         console.log("render round");

        console.log(this.state.labels);

        let textCompArray = [];
        let labelCompArray = [];
        if(this.state.textInfos.length > 0) {
            textCompArray = this.state.textInfos.filter((text,i) => {
                if (i <= (this.state.clue - 1)) {
                    return true;
                }
                return false;
            }).map((text, i) => {
                //console.log("text " + i + " " + text.textNameEnglish);
            return (<TextBox key={i + (this.state.textInfos.length * this.props.round)} textEnglish={text.textEnglish}
                                                                           textHebrew={text.textHebrew}/>)});
            labelCompArray = this.state.labels.map((label, i) => {
               // console.log("label " + i + " " + label.textNameEnglish);
                return(<LabelBox key={i + (this.state.textInfos.length * this.props.round)} textNameEnglish={label.textNameEnglish}
                                                                           textNameHebrew={label.textNameHebrew}
                                                                           correct={label.correct}
                                                                           clue={this.state.clue}
                                                                           resetRoundHandler={this.resetRoundHandler}/>)});
        }
        let answerInform = '';
        if(this.state.answerInform){
            answerInform = <AnswerInformer correct={this.state.answeredCorrectly} answer={this.state.correctAnswer} addedPoints={this.state.addedPoints}/>
        }
        // console.log("the final arrays")
        // console.log(textCompArray);
        //     console.log(labelCompArray)

    return (
        <div className={'container ' + classes.GameDesk}>
            <h1>Match the Verse to the Correct Text</h1>
            <div className={classes.TextRow}>
                <div className={'row '}>
                    {this.state.answerInform ? answerInform : textCompArray}
                </div>
            </div>
            <div className='row'>
                {this.state.answerInform ? <p></p> : labelCompArray}
            </div>
            <ScoreBoard score={this.props.score}/>
            {this.state.answerInform ?
                <p></p> : <TimeBox round={this.state.round} style={{display: 'inline'}} resetRoundHandler={this.resetRoundHandler} resetClue={this.resetClue}/>}

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

