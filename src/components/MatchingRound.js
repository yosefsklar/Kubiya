import React, {Component} from 'react';
import TextBox from './TextBox';


const MatchingRound = (props) => {

    let textCompArray = props.userTexts.map( (text,i) => <TextBox key={i} textName={text}/>);


    return (
        <div>
            {textCompArray}
        </div>
    )
}

export default MatchingRound