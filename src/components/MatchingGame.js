import React, {Component} from 'react';
import MatchingRound from './MatchingRound';
import EndGameModal from './EndGameModal';
import GameLang from './GameLang';
import GameText from './GameText';
import GameLevel from './GameLevel';
import StartGameModal from './StartGameModal';




export default class MatchingGame extends Component {
    constructor() {
        super();
        this.state = {
            lang: 'english',
            text: 'tanakh',
            score: 0,
            round: 1,
            gameStarted: false,
            gameOver: false,
            startGame: false,
            answerInform: false,
            gameLang: true,
            gameText: false,
            rounds: 10,
            level: 'medium'
        }
        this.updateScoreHandler = this.updateScoreHandler.bind(this);
        this.setAnswerInformer = this.setAnswerInformer.bind(this);
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
                gameStarted: false,
                answerInform:true
            })
        }
        else{
            this.setState( {
                score: this.state.score + score,
                round: this.state.round + 1,
                answerInform:true
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

    setAnswerInformer = (status) => {
        //this is dump fix it
        this.setState({
            answerInform: status
        })
    }

    setLang = (lang) => {
        this.setState({
            lang: lang,
            gameLang: false,
            gameText: true,

        })
    }
    //reset texts, will need to reset clock
    setText = (text) => {
        this.setState({
            text: text,
            gameText: false,
            gameLevel: true
        })
    }

    setLevel = (level) => {
        this.setState({
            level: level,
            gameLevel: false,
            startGame: true,
        })
    }

    render() {
        let currentDisplay;
        if(this.state.gameOver && !(this.state.answerInform)){
            currentDisplay = <EndGameModal reStartGame={this.startGame} score={this.state.score}/>;

        }
        else if(this.state.gameStarted || this.state.answerInform){
            currentDisplay = <MatchingRound updateScoreHandler={this.updateScoreHandler}
                                            setAnswerInformer={this.setAnswerInformer}
                                            round={this.state.round}
                                            score={this.state.score}
                                            lang={this.state.lang}
                                            text={this.state.text}
                                            level={this.state.level}
                                            answerInform={this.state.answerInform}/>;

        }
        else if(this.state.startGame){
            currentDisplay = <StartGameModal startGame={this.startGame}></StartGameModal>;
        }
        else if(this.state.gameLang){
            currentDisplay = <GameLang setLang={this.setLang}/>;
        }
        else if(this.state.gameText){
            currentDisplay = <GameText setText={this.setText}/>;
        }
        else if(this.state.gameLevel){
            currentDisplay = <GameLevel setLevel={this.setLevel}/>;
        }
        return (
            <div>
                {currentDisplay}
            </div>
        )
    }
}