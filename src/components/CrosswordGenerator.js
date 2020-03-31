import React, {Component} from 'react';


const MATRIX =[{x:0,y:0,d:2,clue:"ויאמרמשה",num: 1},
    {x:6,y:0,d:2,clue:"מכבי",num:2},{x:0,y:3,d:1,clue:"מילהאלי",num:3}]
const CLUE_LIST = [{num: 1, clue: "And God Said to Moses"},{num: 2, clue: "The israeli basketball club"},{num: 3, clue: "Who is with god? Come with me"}]
export default class CrosswordGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: [12,12],
            gridMatrix: MATRIX,//an array of objects x,y,dir,string,number
            clueList: CLUE_LIST,
            grid: [],
            clues: []
        };


    }

    componentDidMount() {
        this.structure_Grid_Data();
    }

    structure_Grid_Data = () =>{
        let grid = [];
        let clues = [];
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
                    data_to_change.clue.append(dirComponent + word.num)
                }
                else{
                    data_to_change.clues = [dirComponent + word.num];
                }
                if(i == 0){
                    data_to_change.label = word.num;
                }
            })
            let clue = this.state.clueList.find(x => x.num == word.num).clue;
            let direction = (word.d == 1) ? "across" : "down";
            let clueData = new Clue_Data(clue,word.clue,direction,word.num, boxes);
            clues.push(clueData);
        });
        this.setState({
            grid: grid,
            clues: clues
        })
    }




    render() {
        return (
            <div className={'col-sm '}>
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