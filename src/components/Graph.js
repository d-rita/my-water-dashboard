import React from 'react';

const Graphs = () => {
    return (
        <div className="mainContainer">
            <div className="subContainer">
                <h6 className="sensor-heading">Turbidity readings</h6>
                <iframe title="turbidity" width="450" height="260" className="iframeStyle" src="https://thingspeak.com/channels/945591/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Turbidity+Chart&type=line&xaxis=Time&yaxis=Turbidity+%28NTU%29"></iframe>
            </div>
            <div className="subContainer">
                <h6 className="sensor-heading">pH Readings</h6>
                <iframe title="pH" width="450" height="260" className="iframeStyle" src="https://thingspeak.com/channels/945591/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=pH+Level+Chart&type=line&xaxis=Time&yaxis=pH+Levels"></iframe>
            </div>
            <div className="subContainer">
                <h6 className="sensor-heading">Temperature readings</h6>
                <iframe title="temperature" width="450" height="260" className="iframeStyle" src="https://thingspeak.com/channels/945591/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&max=100&min=10&results=60&title=Temperature+Chart&type=line&xaxis=Time&yaxis=Temp+%28Celsius+Degrees%29"></iframe>
            </div>
        </div>
    )
}

export default Graphs;
