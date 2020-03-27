import React, {Component} from 'react';
import MatchingRound from './MatchingRound';
import GameOver from './GameOver';
import GameLang from './GameLang';
import Navbar from './assets/Navbar';
import StartGameModal from './StartGameModal';




export default class MatchingGame extends Component {
    constructor() {
        super();
        this.state = {
            lang: 'english',
            score: 0,
            round: 1,
            gameStarted: false,
            gameOver: false,
            startGame: false,
            gameLang: true,
            rounds: 10
        }
        this.updateScoreHandler = this.updateScoreHandler.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setLang = this.setLang.bind(this);
    }
    componentDidMount() {

    }

    updateScoreHandler = (score) => {
        if(this.state.round == this.state.rounds){
            this.setState( {
                score: this.state.score + score,
                gameOver: true,
                gameStarted: false
            })
        }
        else{
            this.setState( {
                score: this.state.score + score,
                round: this.state.round + 1
            })
        }
    }

    startGame = () => {
        this.setState({
            gameStarted: true,
            score: 0,
            round: 1,
            gameOver: false,
        })
    }

    setLang = (lang) => {
        this.setState({
            lang: lang,
            gameLang: false,
            startGame: true
        })
    }
    //reset texts, will need to reset clock

    render() {
        let currentDisplay;
        if(this.state.gameOver){
            currentDisplay = <GameOver reStartGame={this.startGame} score={this.state.score}/>;

        }
        else if(this.state.gameStarted){
            currentDisplay = <MatchingRound updateScoreHandler={this.updateScoreHandler} round={this.state.round} score={this.state.score} lang={this.state.lang}/>;

        }
        else if(this.state.startGame){
            currentDisplay = <StartGameModal startGame={this.startGame}></StartGameModal>;
        }
        else if(this.state.gameLang){
            currentDisplay = <GameLang setLang={this.setLang}/>;
        }
        return (
            <div>
                <Navbar/>
                {currentDisplay}
            </div>
        )
    }
}