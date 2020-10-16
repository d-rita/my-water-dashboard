import React, { Component } from 'react';
import axios from 'axios';

import notify from "./Notification";
import { processSingleFeed } from '../utils/processing';
import { emailSender } from '../utils/emailSender';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            turbidity: null,
            turbidityStatus: "",
            turbidityMessage: "",
            pH: null,
            pHStatus: "",
            pHMessage: "",
            temperature: null,
            temperatureStatus: "",
            tempMessage: "",
            freshFeed: false,
            error: null,
            date: "",
            time: ""
        };
    }

    fetchLastFeed()
    {
        this.notifyUser()
        const url = "https://api.thingspeak.com/channels/945591/feeds.json?results=1"; 
        axios(url)
        .then((resp)=> {
            let currentFeedId = this.state.id 
            let fetchedFeedId = resp.data.channel.last_entry_id //556

            let newFeedExists = currentFeedId !== fetchedFeedId
            if (newFeedExists){
                let feedStatus = processSingleFeed(resp.data.feeds[0]);
                
                this.setState({
                id: fetchedFeedId, 
                pH: resp.data.feeds[0].field1,
                turbidity: resp.data.feeds[0].field2,
                temperature: resp.data.feeds[0].field3,
                turbidityStatus: feedStatus.turbidityStatus,
                pHStatus: feedStatus.pHStatus,
                temperatureStatus: feedStatus.tempStatus,
                turbidityMessage: feedStatus.turbidityMessage,
                pHMessage: feedStatus.pHMessage,
                tempMessage: feedStatus.tempMessage,
                freshFeed: true,
                error: null,
                date: feedStatus.date,
                time: feedStatus.time
                })

            } else {
                this.setState({
                    freshFeed: false,
                })
            } 
        })
        .catch((err)=> {
            this.setState({ error: err})
        })
    }

    
    notifyUser() {
        const { 
            pH, pHMessage, 
            turbidity,  turbidityMessage, 
            tempMessage,
            date, time
        } = this.state

        let message = ""
        
        if (this.state.freshFeed === true){
            
            if (pHMessage.length > 0){
                message = pH ? `Current pH level: ${pH}. ${pHMessage}` : `${pHMessage}`
                notify(pHMessage)
                emailSender('PH', `Time: ${date} - ${time}: : ${message}`)
            }
            if (turbidityMessage.length > 0){
                message = turbidity ? `Current turbidity level: ${turbidity}. ${turbidityMessage}` : `${turbidityMessage}`
                notify(turbidityMessage)
                emailSender('Turbidity', `Time: ${date} - ${time}: ${message}`)
            }
            if (tempMessage.length > 0){
                notify(tempMessage)
                emailSender('Temperature', `Time: ${date} - ${time}: ${tempMessage}`)
            } 
        }
    }

    componentDidMount()
    { 
        this.timer = setInterval(() => this.fetchLastFeed(), 3500);
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    render() {
        const { turbidityStatus, pHStatus, temperatureStatus, temperature, error } = this.state;

        const tStyle = (turbidityStatus === "Check sensor" ? "reading-warning" : (turbidityStatus === "Normal" ? "reading-green" : "reading-error"));

        const pStyle = (pHStatus === "Check sensor" ? "reading-warning" : (pHStatus === "Normal" ? "reading-green" : "reading-error"));

        const tmpStyle = (temperatureStatus === "Check sensor" ? "reading-warning" : " ");

        return (
            <div>
                <header className="header">
                    <h1 className="title-header">Domestic Water Monitoring Site</h1> 
                    {error ?  " " : (
                        <div className="readings-section">
                            <div className="readings-header">
                                <p className="readings"><b>Current Turbidity Status</b></p>
                                <p className={tStyle}>{turbidityStatus}</p>
                            </div>
                            <div className="readings-header">
                                <p className="readings"><b>Current pH Status</b></p>
                                <p className={pStyle}>{pHStatus}</p>
                            </div>
                            <div className="readings-header">
                                <p className="readings"><b>Current Temperature Level</b></p>
                                <p className={tmpStyle}>
                                    {temperature ? temperature : temperatureStatus}
                                </p>
                            </div>
                        </div> 
                 )}
                </header>
            </div>
        )
    }
}

export default Header;
