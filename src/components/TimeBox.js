import React, {Component} from 'react';


export default class TimeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };

    }

    componentDidMount() {
        this.startCountDown()
    }

    startCountDown(){

        setInterval(function () {
                    this.setState({count: this.state.count + 1});
        }.bind(this), 1000);
    }

    // timer(){
    //     this.setState({count: this.state.count + 1});
    // }




    render() {
        return (
            <div className='col-12'>
                <h1>{this.state.count}</h1>
            </div>

        )
    }
}