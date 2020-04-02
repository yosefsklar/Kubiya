import React, {Component} from 'react';
import Crossword from "./Crossword";
import {xWords} from "./classes/xword";

const MATRIX = [{x: 0, y: 0, d: 2, clue: "חשונ", num: 1},{x: 4, y: 0, d: 2, clue: "אדר", num: 2},{x: 0, y: 2, d: 1, clue: "ויאמרמשה", num: 3},
{x: 3, y: 2, d: 2, num: 4, clue: "מילהאלי"}, {x: 5, y: 2, d: 2, clue: "מכבי", num: 5},{x: 10, y: 3, d: 2, clue: "תמוז", num: 6},{x: 8, y: 4, d: 2, clue: "ניסנ", num: 7},
    {x: 5, y: 5, d: 1, clue: "ירמיהו", num: 8},{x: 2, y: 8, d: 1, clue: "סיבנ", num: 9}]
// const MATRIX =[{x:0,y:0,d:2,clue:"ויאמרמשה",num: 1},
//     {x:6,y:0,d:2,clue:"מכבי",num:2},{x:0,y:3,d:1,clue:"מילהאלי",num:1}]
const CLUE_LIST = [{word: "חשונ", clue: "sad month"},{word: "אדר", clue: "happy month"},{word: "ויאמרמשה", clue: "And God Said to Moses"},{word: "מכבי", clue: "The israeli basketball club"},{word: "מילהאלי", clue: "Who is with god? Come with me"},
    {word: "תמוז", clue: "fast month"},{word: "ניסנ", clue: "fרקק month"},{word: "ירמיהו", clue: "the boss"},{word: "סיבנ", clue: "it just is"} ]

const WORD_LIST = ["חשונ","אדר","ויאמרמשה", "מכבי", "מילהאלי","תמוז", "ניסנ", "ירמיהו", "סיבנ"]


export default class CrosswordGenerator extends Component {
    constructor(props) {
        super(props);
        xWords.Create(11,11,WORD_LIST);
        this.state = {
            dimensions: [11, 11],
            gridMatrix: xWords.GetQuestionList(),//an array of objects x,y,dir,string,number
            clueList: CLUE_LIST,
            grid: [],
            clues: {}
        }
        ;
    }
    componentDidMount() {
        this.structure_Grid_Data();
    }

    structure_Grid_Data = () =>{
        let grid = [];
        let clues = {};
        for(let i = 1; i <= this.state.dimensions[0]; i++){
            for(let j = 0; j < this.state.dimensions[1]; j++){
                let id = String.fromCharCode(65 + j) + i;
                console.log("id : " + id);
                grid.push(new Grid_Data(id,null,null,null));
            }
        }
        console.log(grid);

        this.state.gridMatrix.forEach( word => {
            let boxes = [];
            [...word.clue].forEach( (letter, i) => {
                let xComponent;
                let yComponent;
                if(word.d == 1){
                    xComponent =String.fromCharCode(65 + word.x + i);
                    yComponent = word.y + 1;
                }
                else{
                    xComponent =String.fromCharCode(65 + word.x);
                    yComponent = word.y + 1 + i;
                }
                let id = xComponent + yComponent;
                boxes.push(id);
                console.log("id2 : " + id);
                let data_to_change = grid.find(x => x.id === id);
                data_to_change.letter = word.clue.charAt(i);
                let dirComponent = (word.d == 1) ? "Ac":"Dn";
                if(data_to_change.clue != null){
                    data_to_change.clue.append(dirComponent + word.num);
                }
                else{
                    data_to_change.clues = [dirComponent + word.num];
                }
                if(word.d == 1){
                    if(i == word.clue.length - 1){
                        data_to_change.label = word.num;
                    }
                }
                else{
                    if(i == 0){
                        data_to_change.label = word.num;
                    }
                }
            })
            let clue = this.state.clueList.find(x => x.word == word.clue).clue;
            let direction = (word.d == 1) ? "across" : "down";
            let dirKey = ((word.d == 1) ? "Ac":"Dn") + word.num;
            clues[dirKey] =  new Clue_Data(clue,word.clue,direction,word.num, boxes);
        });
        this.setState({
            grid: grid,
            clues: clues
        })
    }




    render() {
        return (
            <div className={'col-sm '}>
                <Crossword clues={this.state.clues} grid={this.state.grid} dimensions={this.state.dimensions}/>
            </div>

        )
    }
}



class Grid_Data{
    constructor(id,letter,clues,label){
        this.id = id;
        this.letter = letter;
        this.clues = clues;
        this.label = label
    }
}

class Clue_Data{
        constructor(clue,answer,direction,number,boxes){
            this.clue = clue;
            this.answer = answer;
            this.direction = direction;
            this.number = number;
            this.boxes = boxes;
        }
}