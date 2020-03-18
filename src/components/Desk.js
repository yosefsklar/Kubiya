import React, {Component} from 'react';
import Text from './Text';


const DeskBuilder = (props) => {

    let textCompArray = props.userTexts.map( (text,i) => <Text key={i} textName={text}/>);


    return (
        <div>
            {textCompArray}
        </div>
    )
}

export default DeskBuilder