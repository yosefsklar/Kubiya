import React, {Component} from 'react';
import MatchingRound from './MatchingRound';

const tanachTexts = ['Genesis', 'Exodus','Leviticus','Numbers','Deuteronomy','Joshua', 'Judges', 'I Samuel','II Samuel',
'I Kings', 'II Kings', 'Isaiah','Jeremiah','Ezekiel','Hosea','Joel','Amos','Obadiah', 'Jonah','Micah','Nahum','Habakkuk',
    'Zephaniah','Haggai','Zechariah','Malachi','Psalms', 'Proverbs','Job','Song of Songs', 'Ruth', 'Lamentations', 'Ecclesiastes',
'Esther', 'Daniel', 'Daniel','Ezra', 'Nehemiah','I Chronicles','II Chronicles']
export default class MatchingGame extends Component {
    state = {
        userTexts: ['Kohelet.5', "Kohelet.6", "Kohelet.7"]
    }
    render() {
        return (
            <MatchingRound userTexts={this.state.userTexts}/>
        )
    }
}