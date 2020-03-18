import React, {Component} from 'react';
import Desk from './Desk';


export default class DeskBuilder extends Component {
    state = {
        userTexts: ['Kohelet.5']
    }
    render() {
        return (
            <Desk userTexts={this.state.userTexts}/>
        )
    }
}