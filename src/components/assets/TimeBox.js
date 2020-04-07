import React, {Component} from 'react';


export default class TimeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 30,
            timerInterval: '',

        };

    }

    componentDidMount() {
        this.startCountDown()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps != this.props) {
            if (this.props.round != prevProps.round) {
                this.setState({
                    count: 30
                })
                clearInterval(this.state.timeInterval);
                this.startCountDown();
            }
        }
    }


    startCountDown(){

        let interval = setInterval(function () {
                    this.setState({count: this.state.count - 1}, ()=> {
                        if(this.state.count <= 0){
                            this.props.resetClue();
                            this.setState({
                                count: 10
                            })
                            clearInterval(this.state.timeInterval);
                            this.startCountDown();
                        }
                    });

        }.bind(this), 1000);

        this.setState({
            timeInterval: interval
        })
    }

    // timer(){
    //     this.setState({count: this.state.count + 1});
    // }




    render() {
        return (
            <div className='col-12'>
                <h1 style={{display: 'inline-block'}}>Question: {this.props.round}/10 </h1>
                <h1 style={{display: 'inline-block', marginLeft:'20px'}}>Time for Question: {this.state.count}</h1>
            </div>

        )
    }
}