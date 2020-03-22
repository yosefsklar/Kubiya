import React, {Component} from 'react';
import MatchingRound from './MatchingRound';
import Navbar from './assets/Navbar';





export default class MatchingGame extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            round: 0
        }
        this.updateScoreHandler = this.updateScoreHandler.bind(this);
    }
    componentDidMount() {

    }

    updateScoreHandler = (score) => {
        this.setState( {
            score: this.state.score + score,
            round: this.state.round + 1
        })
    }

    //reset texts, will need to reset clock

    render() {
        return (
            <div>
                <Navbar/>
                <MatchingRound updateScoreHandler={this.updateScoreHandler} round={this.state.round}/>
                <h1>{this.state.score}</h1>
            </div>
        )
    }
}