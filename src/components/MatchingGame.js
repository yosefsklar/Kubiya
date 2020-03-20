import React, {Component} from 'react';
import MatchingRound from './MatchingRound';
import Navbar from './assets/Navbar';





export default class MatchingGame extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {

    }



    //reset texts, will need to reset clock

    render() {
        return (
            <div>
                <Navbar/>
                <MatchingRound/>
            </div>
        )
    }
}