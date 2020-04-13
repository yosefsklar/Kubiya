import React, {Component} from 'react';
import TextBox from './TextBox';
import TimeBox from './assets/TimeBox';
import ScoreBoard from './ScoreBoard'
import AnswerInformer from './AnswerInformer';
import classes from '../styles/MatchingRound.module.css'
import Parser from "./classes/Parser";
import {BtnAnswer, BtnSmall} from "./assets/buttons";

const tanakhDE = require('./dicts/tanakh_easy.json')
const mishnahDE = require('./dicts/mishnah_easy.json')
const talmudDE = require('./dicts/talmud_easy.json')
const tanakhDM = require('./dicts/tanakh_medium.json')
const mishnahDM = require('./dicts/mishnah_medium.json')
const talmudDM = require('./dicts/talmud_medium_stop_words.json')
const tanakhBG = require('./dicts/tanakh_book_groups.json')
const tanakhG = require('./dicts/tanakh_groups.json')

const dictFinder = {
    easy: {
        tanakh: tanakhDE,
        mishnah: mishnahDE,
        talmud: talmudDE
    },
    medium: {
        tanakh: tanakhDM,
        mishnah: mishnahDM,
        talmud: talmudDM
    }
}

const P = new Parser();


export default class MatchingRound extends Component {
    constructor(props) {
        super(props);
        let labelTextNames = this.selectRandomTexts(3, TextChapters[this.props.text],this.props.level);
        this.state = {
            labelTextNames: labelTextNames,
            //chapters
            //textinfos should include verse numbers
            //then functionally get the context
            textInfos: [],
            labels: [],
            clue: 1,
            answeredCorrectly: false,
            correctAnswer: '',
            addedPoints: 0,
        };
    }


    componentDidMount(){
        this.getTextInfo(this.state.labelTextNames);
        this.getLabels(this.state.labelTextNames);
    }


    getTextInfo(textInfoArray) {
        let copyInfoArray = [...textInfoArray];
        let singleTextInfoArray = [];
        let correctAnswer = copyInfoArray[0];
        for (let i = 0; i < copyInfoArray.length; i++) {
            singleTextInfoArray.push(correctAnswer);
        }
        Promise.all(singleTextInfoArray.map((textName, index) => {
            let subtextNumber = this.chooseRandomSubtext(textName,TextChapters[this.props.text]);
            console.log(textName + ' . ' + subtextNumber);
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName + '.' + subtextNumber;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    let vn = this.chooseRandomVerse(data.he,textName,index);
                    return(new TextInfo(data.indexTitle, data.heTitle,vn,subtextNumber, data.he, data.text));
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
        Promise.all(copyInfoArray.map(textName => {
            let fetchString = 'http://www.sefaria.org/api/texts/' + textName;
            return fetch(fetchString)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    data['text'] = P.cleanText(data.text);
                    // console.log(data);
                    let correct = (textName == copyInfoArray[0]);
                    return (new Label(data.indexTitle.replace(/Mishnah/, ''),data.heIndexTitle.replace('משנה' ,''), correct));
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

    selectRandomTexts(num, textArr, level){
        let texts = Object.keys(textArr);
        let textOptions = [...texts]
        let newUserTexts = [];

        let index = Math.floor(Math.random() * textOptions.length);
        newUserTexts.push(textOptions[index]);
        textOptions.splice(index,1);
        if(level == 'hard'){
            let textGroupName = tanakhBG[newUserTexts[0]][Math.floor(Math.random() * tanakhBG[newUserTexts[0]].length)];
            textOptions = tanakhG[textGroupName];
        }

        for (let i = 1; i < num; i++) {
            index = Math.floor(Math.random() * textOptions.length);
            newUserTexts.push(textOptions[index]);
            textOptions.splice(index,1);
            if(newUserTexts[i] == newUserTexts[0]){
                i--;
            }
            //if the decoy is the same as the answer
        }
        console.log("Pre-Selected " + newUserTexts);
        return newUserTexts;
    }

    resetRoundHandler = (score,correct) =>{
        //window.alert("hi");
        this.labelTextNames = this.selectRandomTexts(3, TextChapters[this.props.text]);
        console.log("After Click " + this.labelTextNames);
        this.props.updateScoreHandler(score);
        let correctAnswer = this.state.textInfos[0];
        this.setState({
            labelTextNames : this.labelTextNames,
            clue: 1,
            answeredCorrectly: correct,
            correctAnswer: correctAnswer,
            addedPoints: score
        }, () => {
            console.log("Post Click state" + this.state.labelTextNames);
            this.correctAnswerShow();
            this.getTextInfo(this.state.labelTextNames);
            this.getLabels(this.state.labelTextNames);
        });
    }

    correctAnswerShow = () =>{

        let timer = setInterval( () => {
            clearInterval(timer);
            this.props.setAnswerInformer(false);
        },3000)

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
         if(Object.keys(textDict)[0] == 'Berakhot' && textDict[Object.keys(textDict)[0]] == 64){
             if(textName == "Tamid"){
                 num = (num % 6) +26;
                 let daf = Math.round(Math.random())
                 return num.toString() + (daf == 0 ? 'a':'b');
             }
             if(num == 1){
                 num = 2;
                 let daf = Math.round(Math.random())
                 return num.toString() + (daf == 0 ? 'a':'b');
             }
             num = num - 1;
             let daf = Math.round(Math.random());
             return num.toString() + (daf == 0 ? 'a':'b');
         }
        // console.log('num=' + num );
        return num;
    }

    chooseRandomVerse(textArr,textName,index){
        //identify clue difficulty, clue number and difficulty
        //need to also not reuse verse -- keep track of in game
        let level = this.getClueDifficulty(index);
        let candidateVerse = Math.floor(Math.random() * textArr.length);
        let valid = false
        let candidateText =  textArr[candidateVerse];
        for(let i = candidateVerse; i < textArr.length && valid == false; i++){
            console.log("Looping...")
            candidateText = textArr[i % textArr.length];
            let candidateArr = this.stripVowels(candidateText).split(' ');
            if(level == 'hard'){
                let wordBlackList = dictFinder['easy'][this.props.text][textName];
                if(!candidateArr.some(w=> wordBlackList.indexOf(w) >= 0)){
                    valid = true;
                    console.log("Found a match!")
                    candidateVerse = i % textArr.length;
                }
            }
            else{
                let wordList = [];
                if(level == 'easy'){
                    wordList = dictFinder[level][this.props.text][textName];
                }
                else if(level == 'medium'){
                    wordList = dictFinder[level][this.props.text][textName]['unigrams'];
                }

                console.log(wordList)
                console.log(this.stripVowels(candidateText))
                if(candidateArr.some(w=> wordList.indexOf(w) >= 0)){
                    valid = true;
                    console.log("Found a match!")
                    candidateVerse = i % textArr.length;
                }
            }

        }
        return candidateVerse;
    }

    getClueDifficulty(index){
        switch(this.props.level) {
            case 'easy':
                return('easy');
                break;
            case 'medium':
            case 'hard':
                if(index == 0){
                    return 'hard';
                }
                else if(index == 1){
                    return 'medium';
                }
                else{
                    return 'easy';
                }
                break;
        }
    }

    stripVowels(rawString) {
        return rawString.replace(/[\u0591-\u05C7]/g,"")
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
        let nextClue = '';
        if(this.state.textInfos.length > 0) {
            textCompArray = this.state.textInfos.filter((text,i) => {
                if (i <= (this.state.clue - 1)) {
                    return true;
                }
                return false;
            }).map((text, i) => {
                //console.log("text " + i + " " + text.textNameEnglish);
            return (<TextBox key={i + (this.state.textInfos.length * this.props.round)} lang={this.props.lang} showText={text}/>)});
            labelCompArray = this.state.labels.map((label, i) => {
               // console.log("label " + i + " " + label.textNameEnglish);
                return(<BtnAnswer key={i + (this.state.textInfos.length * this.props.round)} label={label}
                                                                           clue={this.state.clue}
                                                                            lang={this.props.lang}
                                                                           resetRoundHandler={this.resetRoundHandler}/>)});
            if(this.state.clue >= 1 && this.state.clue < 3){
                nextClue =<BtnSmall onClick={this.resetClue}>Next Clue</BtnSmall>
            }
        }
        let answerInform = '';
        if(this.props.answerInform){
            answerInform = <AnswerInformer correct={this.state.answeredCorrectly} answer={this.state.correctAnswer} addedPoints={this.state.addedPoints} lang={this.props.lang} text={this.props.text}/>
        }
        // console.log("the final arrays")
        // console.log(textCompArray);
        //     console.log(labelCompArray)

    return (
        <div className={'container ' + classes.GameDesk}>
            <h1>Match the Verse to the Correct Text</h1>
            <h2>{this.props.level}</h2>
                <div className={classes.TextRow}>
                    <div className={'row '}>
                        {this.props.answerInform ? answerInform : textCompArray}
                        {!this.props.answerInform && nextClue}
                </div>
                </div>

            <div className='row'>
                {this.props.answerInform ? <p></p> : labelCompArray}
            </div>
            <ScoreBoard score={this.props.score}/>
            {this.props.answerInform ?
                <p></p> : <TimeBox round={this.props.round} style={{display: 'inline'}} resetRoundHandler={this.resetRoundHandler} resetClue={this.resetClue}/>}

        </div>
    )};
}

class TextInfo {
    constructor(textNameEnglish,textNameHebrew,verseNumber,chapter,textHebrew,textEnglish){
        this.textNameEnglish = textNameEnglish;
        this.textNameHebrew = textNameHebrew;
        this.verseNumber = verseNumber;
        this.chapter = chapter;
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

const TextChapters = {
            tanakh: {Genesis: 50,
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
                II_Chronicles: 36},
    mishnah: {
        Mishnah_Berakhot: 9,
        Mishnah_Peah: 8,
        Mishnah_Demai: 7,
        Mishnah_Kilayim: 9,
        Mishnah_Sheviit: 10,
        Mishnah_Terumot: 11,
        Mishnah_Maasrot: 5,
        Mishnah_Maaser_Sheni: 5,
        Mishnah_Challah: 4,
        Mishnah_Orlah: 3,
        Mishnah_Bikkurim: 4,
        Mishnah_Shabbat: 24,
        Mishnah_Eruvin: 10,
        Mishnah_Pesachim: 10,
        Mishnah_Shekalim: 8,
        Mishnah_Yoma: 8,
        Mishnah_Sukkah: 5,
        Mishnah_Beitzah: 5,
        Mishnah_Rosh_Hashanah: 4,
        Mishnah_Taanit: 4,
        Mishnah_Megillah: 4,
        Mishnah_Moed_Katan: 3,
        Mishnah_Chagigah: 3,
        Mishnah_Yevamot: 16,
        Mishnah_Ketubot: 13,
        Mishnah_Nedarim: 11,
        Mishnah_Nazir: 9,
        Mishnah_Sotah: 9,
        Mishnah_Gittin: 9,
        Mishnah_Kiddushin:4,
        Mishnah_Bava_Kamma: 10,
        Mishnah_Bava_Metzia: 10,
        Mishnah_Bava_Batra: 10,
        Mishnah_Sanhedrin: 11,
        Mishnah_Makkot: 3,
        Mishnah_Shevuot: 8,
        Mishnah_Eduyot: 8,
        Mishnah_Avodah_Zarah: 5,
        Mishnah_Avot: 5,
        Mishnah_Horayot: 3,
        Mishnah_Zevachim: 14,
        Mishnah_Menachot: 13,
        Mishnah_Chullin: 12,
        Mishnah_Bekhorot: 9,
        Mishnah_Arakhin: 9,
        Mishnah_Temurah: 7,
        Mishnah_Keritot: 6,
        Mishnah_Meilah: 6,
        Mishnah_Tamid: 7,
        Mishnah_Middot: 5,
        Mishnah_Kinnim: 3,
        Mishnah_Kelim: 30,
        Mishnah_Oholot: 18,
        Mishnah_Negaim: 14,
        Mishnah_Parah: 12,
        Mishnah_Tahorot: 10,
        Mishnah_Mikvaot: 10,
        Mishnah_Niddah: 10,
        Mishnah_Makhshirin: 6,
        Mishnah_Zavim: 5,
        Mishnah_Tevul_Yom: 4,
        Mishnah_Yadayim: 4,
        Mishnah_Oktzin: 3
    },
    talmud: {
        Berakhot: 64,
        Shabbat: 157,
        Eruvin:105,
        Pesachim: 121,
        Rosh_Hashanah: 35,
        Yoma: 88,
        Sukkah: 56,
        Beitzah: 40,
        Taanit: 31,
        Megillah: 32,
        Moed_Katan: 29,
        Chagigah: 27,
        Yevamot: 122,
        Ketubot: 112,
        Nedarim: 91,
        Nazir: 66,
        Sotah:49,
        Gittin: 90,
        Kiddushin: 82,
        Bava_Kamma: 119,
        Bava_Metzia: 119,
        Bava_Batra: 176,
        Sanhedrin: 113,
        Makkot: 24,
        Shevuot: 49,
        Avodah_Zarah: 76,
        Horayot: 14,
        Zevachim: 120,
        Menachot: 110,
        Chullin: 142,
        Bekhorot: 61,
        Arakhin: 34,
        Temurah: 34,
        Keritot: 28,
        Meilah: 22,
        Tamid: 8,
        Niddah: 73
    }

}

