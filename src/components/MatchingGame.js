import React, {Component} from 'react';
import MatchingRound from './MatchingRound';


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