import React, {Component} from 'react';
import Crossward from '../Crossword';
import CrosswordGenerator from "../CrosswordGenerator";


export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        return (
            <div className={'col-sm '}>
                <h1>About</h1>
                <CrosswordGenerator/>
                <Crossward/>
            </div>

        )
    }
}