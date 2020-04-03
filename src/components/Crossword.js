//Approach 1, an array of cells
import React, {Component} from 'react';
import '../styles/Crossword.scss';

export default class Crossword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClueBoxes: '',
            activeClue: '',
            boxInFocus: ''
        };

        this.setActiveClueBoxes = this.setActiveClueBoxes.bind(this);
        this.setActiveClue = this.setActiveClue.bind(this);
        this.setBoxInFocus = this.setBoxInFocus.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.clues !== this.props.clues){
            let key = Object.keys(this.props.clues)[1];
            this.setState({
                activeClueBoxes: this.props.clues[key].boxes,
                activeClue: [key],
                boxInFocus: this.props.clues[key].boxes[0]
            })
        }

    }


    setActiveClueBoxes(boxes) {
        this.setState({
            activeClueBoxes: boxes
        });
    }

    setActiveClue(clue) {
        this.setState({
            activeClue: clue
        });
    }

    setBoxInFocus(box) {
        this.setState({
            boxInFocus: box
        });
    }

  render() {
    return (
      <div className="crossword">
        <Clues clues={ this.props.clues } setActiveClueBoxes={ this.setActiveClueBoxes } activeClue={ this.state.activeClue } setActiveClue={ this.setActiveClue } setBoxInFocus={ this.setBoxInFocus } />
        <Board grid={ this.props.grid } allClues={ this.props.clues } clues={ this.props.clues } setActiveClueBoxes={ this.setActiveClueBoxes } highlightedBoxes={ this.state.activeClueBoxes } setActiveClue = { this.setActiveClue } activeClueBoxes={this.state.activeClueBoxes} setBoxInFocus={ this.setBoxInFocus } boxInFocus={ this.state.boxInFocus } dimensions={this.props.dimensions}/>
      </div>
    );
  }
}

class Clues extends Component {
    constructor(props) {
        super(props);

        this.state = {
            across: [],
            down: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps != this.props){
            const cluesAcross = [];
            const cluesDown = [];
           // console.log("printing clueS: ")
            for (const key in this.props.clues) {
                const clue = this.props.clues[key];
               // console.log("printing clue " + key)
                clue.id = key;
                if (clue.direction === 'across') {
                    cluesAcross.push(clue);
                }
                else {
                    cluesDown.push(clue);
                }
            }
        this.setState({
            across : cluesAcross,
            down : cluesDown
        })
        }
    }


    render() {
        return (
            <div className="clue-lists">
                <div className="clue-list-wrapper">
                    <h2>Across</h2>
                    <ol className="clue-list">
                        { this.state.across.map((clueData) => <Clue key={ clueData.id } clueID={ clueData.id } clueText={ clueData.clue } clueNumber={ clueData.number } clueBoxes={ clueData.boxes } clueDir={"across"} setActiveClueBoxes={ this.props.setActiveClueBoxes } setActiveClue={ this.props.setActiveClue } isActive={ this.props.activeClue.indexOf(clueData.id) > -1 } setBoxInFocus={ this.props.setBoxInFocus }/>) }
                    </ol>
                </div>
                <div className="clue-list-wrapper">
                    <h2>Down</h2>
                    <ol className="clue-list">
                        { this.state.down.map((clueData) => <Clue key={ clueData.id } clueID={ clueData.id } clueText={ clueData.clue } clueNumber={ clueData.number } clueBoxes={ clueData.boxes } clueDir={"down"} setActiveClueBoxes={ this.props.setActiveClueBoxes } setActiveClue={ this.props.setActiveClue } isActive={ this.props.activeClue.indexOf(clueData.id) > -1 } setBoxInFocus={ this.props.setBoxInFocus }/>)
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

class Clue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.isActive
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({
                active: this.props.isActive
            });
        }
    }


    handleClick() {
        const activeClue = [];
        activeClue.push(this.props.clueID);
        this.props.setActiveClueBoxes(this.props.clueBoxes);
        this.props.setActiveClue(activeClue);
        if(this.props.clueDir == "down"){
            this.props.setBoxInFocus(this.props.clueBoxes[0]);
        }
        else{
            this.props.setBoxInFocus(this.props.clueBoxes[this.props.clueBoxes.length - 1]);
        }


    }

    render() {
        return (
            <li className={`clue ${ this.state.active ? 'active' : ''}`}>
                <button className="clue-button" onClick={ this.handleClick }>
                    <span className="clue-number">{ this.props.clueNumber }.</span>
                    <span className="clue-text">{ this.props.clueText }</span>
                </button>
            </li>
        );
    }
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxMatrix: [],
            boxes: []
        }
        this.isBoxFilled = this.isBoxFilled.bind(this)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps != this.props){
            let boxes = this.props.grid.map((box) => {
                const { id, letter, clues, label } = box;
                return <Box key={ id } id={ id } letter={ letter } boxMatrix={this.state.boxMatrix} boxClues = { clues } label={ label } allClues={ this.props.allClues } isHighlighted={ this.props.highlightedBoxes.indexOf(id) > -1 } setActiveClueBoxes={ this.props.setActiveClueBoxes } setActiveClue={ this.props.setActiveClue } activeClueBoxes={this.props.activeClueBoxes} setBoxInFocus={ this.props.setBoxInFocus } boxInFocus={this.props.boxInFocus}  dimensions={this.props.dimensions} isBoxFilled={this.isBoxFilled}/>
            });
            let boxMatrix = [];
            for(let i = 0; i < this.props.dimensions[1];i++){
                let row = [];
                for(let j = 0; j < this.props.dimensions[0];j++){
                    row.push(boxes[(i * this.props.dimensions[1]) + j]);
                }
                boxMatrix.push(row);
            }
            this.setState({
                boxMatrix: boxMatrix,
                boxes: boxes
            })
        }
    }

    isBoxFilled =(id) =>{
            return !(this.props.grid.find(x => x.id == id).letter == null);
    }

    render() {
        return (
            <div className="crossword-board">
                {this.state.boxes}
            </div>
        );
    }
}

class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: props.isHighlighted,
            isInFocus: (props.boxInFocus == this.props.id)
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.uniKeyCode = this.uniKeyCode.bind(this);
        this.uniKeyUp = this.uniKeyUp.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps != this.props) {
            //clue clicking instigated the focus
            if ((this.props.boxInFocus == this.props.id)) {
                this.textInput.focus();
            }
            this.setState({
                highlight: this.props.isHighlighted,
                isInFocus: this.props.isInFocus
            });
        }
    }


    handleFocus(event) {
        //if the focus happened as a result of a click only and not propigation
        if(!(this.props.activeClueBoxes.includes(this.props.id))){
            this.props.setActiveClue(this.props.boxClues);

            let boxesToHighlight = [];
            for (const clue of this.props.boxClues) {
                boxesToHighlight = boxesToHighlight.concat(this.props.allClues[clue].boxes);
            }

            this.props.setActiveClueBoxes(boxesToHighlight);
            this.props.setBoxInFocus(this.props.id);
        }
    }

    uniKeyCode(event) {
        let key = event.keyCode;
        let x = this.props.id.charCodeAt(0) - 65;
        let y = parseInt(this.props.id.charAt(1));
        if(key == 37){
            if(x > 0){
                x -= 1;
                let id = String.fromCharCode(x+ 65) + y;
                if(this.props.isBoxFilled(id)){
                    this.props.setBoxInFocus(id);
                }
            }

        }
        else if(key == 38){
            if(y > 0){
                y -= 1;
                let id = String.fromCharCode(x+ 65) + y;
                if(this.props.isBoxFilled(id)){
                    this.props.setBoxInFocus(id);
                }
            }
        }
        else if(key == 39){
            if(x < this.props.dimensions[0]  - 1){
                x += 1;
                let id = String.fromCharCode(x+ 65) + y;
                if(this.props.isBoxFilled(id)){
                    this.props.setBoxInFocus(id);
                }
            }
        }
        else if(key == 40){

            if(y < this.props.dimensions[1]  - 1){
                y += 1;
                let id = String.fromCharCode(x+ 65) + y;
                if(this.props.isBoxFilled(id)){
                    this.props.setBoxInFocus(id);
                }
            }
        }

    }

    uniKeyUp(event) {
        let key = event.keyCode;
        let x = this.props.id.charCodeAt(0) - 65;
        let y = parseInt(this.props.id.charAt(1));
        if (key >= 65 && key <= 90){
                if(this.props.boxClues[0].charAt(0) == 'A'){
                    if(x > 0){
                        x -= 1;
                        let id = String.fromCharCode(x+ 65) + y;
                        if(this.props.isBoxFilled(id)){
                            this.props.setBoxInFocus(id);
                        }
                    }
                }
                else{
                    if(y < this.props.dimensions[1]  - 1){
                        y += 1;
                        let id = String.fromCharCode(x+ 65) + y;
                        if(this.props.isBoxFilled(id)){
                            this.props.setBoxInFocus(id);
                        }
                    }
                }
            }
    }

    render() {
        let visibleLabel;
        let input;

        if (this.props.label) {
            visibleLabel = <span className="box-label">{this.props.label}</span>
        }

        if (this.props.letter) {
            input = <input type="text" maxLength="1" className={ `box-input ${this.state.highlight ? 'highlight' : ''}` } onFocus={ this.handleFocus } onKeyDown={this.uniKeyCode} onKeyUp={this.uniKeyUp} ref={(input) => { this.textInput = input }} />
        }

        return (
            <div className={ `box ${!this.props.letter ? ' blank' : ''}` }>
                { visibleLabel }
                { input }
            </div>
        );
    }
}

const GRID_DATA = [
//   Row A
    {
        id: 'A1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'A2',
        letter: 'L',
        clues: ['Ac1'],
        label: 1
    },
    {
        id: 'A3',
        letter: 'I',
        clues: ['Ac1', 'Dn2'],
        label: 2
    },
    {
        id: 'A4',
        letter: 'F',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A5',
        letter: 'E',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A6',
        letter: 'C',
        clues: ['Ac1', 'Dn3'],
        label: 3
    },
    {
        id: 'A7',
        letter: 'Y',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A8',
        letter: 'C',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A9',
        letter: 'L',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A10',
        letter: 'E',
        clues: ['Ac1'],
        label: null
    },
    {
        id: 'A11',
        letter: null,
        clues: null,
        label: null
    },
//   Row B
    {
        id: 'B1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B3',
        letter: 'M',
        clues: ['Dn2'],
        label: null
    },
    {
        id: 'B4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B6',
        letter: 'O',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'B7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B9',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B10',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'B11',
        letter: null,
        clues: null,
        label: null
    },
//   Row C
    {
        id: 'C1',
        letter: 'C',
        clues: ['Ac4', 'Dn4'],
        label: 4
    },
    {
        id: 'C2',
        letter: 'O',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C3',
        letter: 'M',
        clues: ['Ac4', 'Dn2'],
        label: null
    },
    {
        id: 'C4',
        letter: 'P',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C5',
        letter: 'O',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C6',
        letter: 'N',
        clues: ['Ac4', 'Dn3'],
        label: null
    },
    {
        id: 'C7',
        letter: 'E',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C8',
        letter: 'N',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C9',
        letter: 'T',
        clues: ['Ac4'],
        label: null
    },
    {
        id: 'C10',
        letter: 'S',
        clues: ['Ac4', 'Dn5'],
        label: 5
    },
    {
        id: 'C11',
        letter: null,
        clues: null,
        label: null
    },
// Row D
    {
        id: 'D1',
        letter: 'U',
        clues: ['Dn4'],
        label: null
    },
    {
        id: 'D2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D3',
        letter: 'U',
        clues: ['Dn2']
    },
    {
        id: 'D4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D6',
        letter: 'S',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'D7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D9',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'D10',
        letter: 'U',
        clues: ['Dn5'],
        label: null
    },
    {
        id: 'D11',
        letter: null,
        clues: null,
        label: null
    },
//   Row E
    {
        id: 'E1',
        letter: 'R',
        clues: ['Dn4'],
        label: null
    },
    {
        id: 'E2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E3',
        letter: 'T',
        clues: ['Dn2'],
        label: null
    },
    {
        id: 'E4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E6',
        letter: 'T',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'E7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E9',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'E10',
        letter: 'P',
        clues: ['Dn5'],
        label: null
    },
    {
        id: 'E11',
        letter: null,
        clues: null,
        label: null
    },
//   Row F
    {
        id: 'F1',
        letter: 'L',
        clues: ['Dn4'],
        label: null
    },
    {
        id: 'F2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'F3',
        letter: 'A',
        clues: ['Dn2'],
        label: null
    },
    {
        id: 'F4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'F5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'F6',
        letter: 'R',
        clues: ['Dn3', 'Ac6'],
        label: 6
    },
    {
        id: 'F7',
        letter: 'E',
        clues: ['Ac6'],
        label: null
    },
    {
        id: 'F8',
        letter: 'N',
        clues: ['Ac6'],
        label: null
    },
    {
        id: 'F9',
        letter: 'D',
        clues: ['Ac6'],
        label: null
    },
    {
        id: 'F10',
        letter: 'E',
        clues: ['Ac6'],
        label: null
    },
    {
        id: 'F11',
        letter: 'R',
        clues: ['Ac6'],
        label: null
    },
//   Row G
    {
        id: 'G1',
        letter: 'Y',
        clues: ['Dn4'],
        label: null
    },
    {
        id: 'G2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G3',
        letter: 'B',
        clues: ['Dn2'],
        label: null
    },
    {
        id: 'G4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G6',
        letter: 'U',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'G7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G9',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'G10',
        letter: 'R',
        clues: ['Dn5'],
        label: null
    },
    {
        id: 'G11',
        letter: null,
        clues: null,
        label: null
    },
//   Row H
    {
        id: 'H1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H3',
        letter: 'L',
        clues: ['Dn2'],
        label: null
    },
    {
        id: 'H4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H6',
        letter: 'C',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'H7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H9',
        letter: 'K',
        clues: ['Dn7'],
        label: 7
    },
    {
        id: 'H10',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'H11',
        letter: null,
        clues: null,
        label: null
    },
// Row I
    {
        id: 'I1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'I2',
        letter: 'S',
        clues: ['Ac8'],
        label: 8
    },
    {
        id: 'I3',
        letter: 'E',
        clues: ['Ac8', 'Dn2'],
        label: null
    },
    {
        id: 'I4',
        letter: 'T',
        clues: ['Ac8'],
        label: null
    },
    {
        id: 'I5',
        letter: 'S',
        clues: ['Ac8'],
        label: null
    },
    {
        id: 'I6',
        letter: 'T',
        clues: ['Ac8'],
        label: null
    },
    {
        id: 'I7',
        letter: 'A',
        clues: ['Ac8'],
        label: null
    },
    {
        id: 'I8',
        letter: 'T',
        clues: ['Ac8'],
        label: null
    },
    {
        id: 'I9',
        letter: 'E',
        clues: ['Ac8', 'Dn7'],
        label: null
    },
    {
        id: 'I10',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'I11',
        letter: null,
        clues: null,
        label: null
    },
// Row J
    {
        id: 'J1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J3',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J5',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J6',
        letter: 'O',
        clues: ['Dn3'],
        label: null
    },
    {
        id: 'J7',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J8',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J9',
        letter: 'Y',
        clues: ['Dn7'],
        label: null
    },
    {
        id: 'J10',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'J11',
        letter: null,
        clues: null,
        label: null
    },
// Row K
    {
        id: 'K1',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'K2',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'K3',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'K4',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'K5',
        letter: 'P',
        clues: ['Ac9'],
        label: 9
    },
    {
        id: 'K6',
        letter: 'R',
        clues: ['Ac9', 'Dn3'],
        label: null
    },
    {
        id: 'K7',
        letter: 'O',
        clues: ['Ac9'],
        label: null
    },
    {
        id: 'K8',
        letter: 'P',
        clues: ['Ac9'],
        label: null
    },
    {
        id: 'K9',
        letter: 'S',
        clues: ['Ac9', 'Dn7'],
        label: null
    },
    {
        id: 'K10',
        letter: null,
        clues: null,
        label: null
    },
    {
        id: 'K11',
        letter: null,
        clues: null,
        label: null
    },
];



const CLUE_DATA = {
    'Ac1': {
        clue: 'You can call these types of methods when components will be or have been mounted, updated, or unmounted',
        answer: 'lifecycle',
        direction: 'across',
        number: 1,
        boxes: ['A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']
    },
    'Dn2': {
        clue: 'The unchanging nature of 9 Across',
        answer: 'immutable',
        direction: 'down',
        number: 2,
        boxes: ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3']
    },
    'Dn3': {
        clue: 'The method in which you assign a component\'s initial state',
        answer: 'constructor',
        direction: 'down',
        number: 3,
        boxes: ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'J6', 'K6']
    },
    'Ac4': {
        clue: 'Independent, reusable pieces that make up your app',
        answer: 'components',
        direction: 'across',
        number: 4,
        boxes: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
    },
    'Dn4': {
        clue: 'The type of braces you use to embed JavaScript expressions in JSX',
        answer: 'curly',
        direction: 'down',
        number: 4,
        boxes: ['C1', 'D1', 'E1', 'F1', 'G1']
    },
    'Dn5': {
        clue: 'A method that runs the base constructor class',
        answer: 'super',
        direction: 'down',
        number: 5,
        boxes: ['C10', 'D10', 'E10', 'F10', 'G10']
    },
    'Ac6': {
        clue: 'A method to create and insert a component in the DOM',
        answer: 'render',
        direction: 'across',
        number: 6,
        boxes: ['F6', 'F7', 'F8', 'F9', 'F10', 'F11']
    },
    'Dn7': {
        clue: 'A unique identifier for list items',
        answer: 'keys',
        direction: 'down',
        number: 7,
        boxes: ['H9', 'I9', 'J9', 'K9']
    },
    'Ac8': {
        clue: 'The only method by which you can update a component\'s state',
        answer: 'setstate',
        direction: 'across',
        number: 8,
        boxes: ['I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9']
    },
    'Ac9': {
        clue: 'A read-only object that contains a component\'s attributes passed down to it from its parent',
        answer: 'props',
        direction: 'across',
        number: 9,
        boxes: ['K5', 'K6', 'K7', 'K8', 'K9']
    }
};
