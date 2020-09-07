import React, { Component } from 'react';
import axios from 'axios';
import { processSingleFeed } from '../utils/processing';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            turbidity: "",
            pH: '',
            temperature: null,
            error: null
        };
    }

    fetchLastFeed()
    {
        const url = "https://api.thingspeak.com/channels/945591/feeds.json?results=1"; 
        axios(url)
        .then((resp)=> {
            let feedStatus = processSingleFeed(resp.data.feeds[0]);
            this.setState({
            turbidity: feedStatus[0],
            pH: feedStatus[1],
            temperature: feedStatus[2],
            error: null
        })
        })
        .catch((err)=> {
            this.setState({ error: err})
        })
    }

    componentDidMount()
    { 
       this.timer = setInterval(() => this.fetchLastFeed(), 10000);
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    render() {
        const { turbidity, pH, temperature, error } = this.state;

        const tStyle = (turbidity === "Check sensor" ? "reading-warning" : (turbidity === "Normal" ? "reading-green" : "reading-error"));

        const pStyle = (pH === "Check sensor" ? "reading-warning" : (pH === "Normal" ? "reading-green" : "reading-error"));

        const tmpStyle = (temperature === "Check sensor" ? "reading-warning" : " ");

        return (
            <div>
                <header className="header">
                    <h1 className="title-header">Domestic Water Monitoring Site</h1> 
                    {error ?  " " : (
                        <div className="readings-section">
                            <div className="readings-header">
                                <p className="readings"><b>Current Turbidity Status</b></p>
                                <p className={tStyle}>{turbidity}</p>
                            </div>
                            <div className="readings-header">
                                <p className="readings"><b>Current pH Status</b></p>
                                <p className={pStyle}>{pH}</p>
                            </div>
                            <div className="readings-header">
                                <p className="readings"><b>Current Temperature Level</b></p>
                                <p className={tmpStyle}>{temperature}</p>
                            </div>
                        </div> 
                 )}
                </header>
            </div>
        )
    }
}

export default Header;
