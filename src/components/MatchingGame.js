import React, {Component} from 'react';
import MatchingRound from './MatchingRound';

const tanakhTexts = ['Genesis', 'Exodus','Leviticus','Numbers','Deuteronomy','Joshua', 'Judges', 'I_Samuel','II_Samuel',
'I_Kings', 'II_Kings', 'Isaiah','Jeremiah','Ezekiel','Hosea','Joel','Amos','Obadiah', 'Jonah','Micah','Nahum','Habakkuk',
    'Zephaniah','Haggai','Zechariah','Malachi','Psalms', 'Proverbs','Job','Song_of_Songs', 'Ruth', 'Lamentations', 'Ecclesiastes',
'Esther', 'Daniel','Ezra', 'Nehemiah','I_Chronicles','II_Chronicles']



export default class MatchingGame extends Component {
    constructor() {
        super();
        let userTexts = this.selectRandomTexts(3, tanakhTexts);
        this.state = {
            userTexts: userTexts
        }
    }
    componentDidMount() {
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
    render() {
        return (
            <MatchingRound userTexts={this.state.userTexts}/>
        )
    }
}