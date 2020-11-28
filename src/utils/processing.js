
const processDate = (dateTimeObj) => {
    let timeCreated = new Date(dateTimeObj);

    let date = timeCreated.toDateString();
        
    let time = timeCreated.toLocaleTimeString();

    return [date, time]
}

const specifyDecimalPlaces= (value, decimal) => {
    return parseInt(value).toFixed(decimal)
}

export const processDataFeeds = (arr) => {
    arr.reverse();
    let newArr = [];

    for(let i = 0, n = arr.length; i < n; i++){
        let newObj = {};

        let timeCreated = processDate(arr[i].created_at);

        newObj.date = timeCreated[0];
        
        newObj.time = timeCreated[1];

        newObj.entry_id = arr[i].entry_id;
        newObj.pH = specifyDecimalPlaces(arr[i].field1, 2);
        newObj.turbidity = specifyDecimalPlaces(arr[i].field2, 2);
        newObj.temperature = specifyDecimalPlaces(arr[i].field3, 2);
 
        newArr[i] = newObj;
    }
    return newArr;
}

export const processSingleFeed = (feed) => {

    let pHStatus = "Normal";
    let turbidityStatus = "Normal";
    let tempStatus = "";

    let pHMessage = "";
    let tempMessage = "";
    let turbidityMessage = "";

    let processedObj = {}

    let timeCreated = processDate(feed.created_at);

    processedObj.date = timeCreated[0];
    processedObj.time = timeCreated[1];

    // check pH
    if(!feed.field1 || feed.field1 > 14.5)
    {
        pHStatus = "Check sensor";
        pHMessage = "Oops!😰 pH Sensor may be faulty!"
    }
    else if(feed.field1 < 6.8)
    {
        pHStatus = "Low";
        pHMessage = `pH level is ${pHStatus}!`
    }
    else if(feed.field1 > 8.0)
    {
        pHStatus = "High";
        pHMessage = `pH level is ${pHStatus}!`
    }
    

    // check turbidity
    if(!feed.field2 || feed.field2 < 0)
    {
        turbidityStatus = "Check sensor";
        turbidityMessage = `Oops!😰 Turbidity sensor may be faulty!`
    }
    else if(feed.field2 > 5.0)
    {
        turbidityStatus = "High";
        turbidityMessage = `Turbidity level is ${turbidityStatus}!`
    }

    // check temperature
    if(!feed.field3)
    {
        tempStatus = "Check sensor";
        tempMessage = `Oops!😰 Temperature sensor may be faulty!`
        
    }
    processedObj.pHMessage = pHMessage;
    processedObj.turbidityMessage = turbidityMessage
    processedObj.tempMessage = tempMessage

    processedObj.turbidityStatus = turbidityStatus
    processedObj.tempStatus = tempStatus
    processedObj.pHStatus = pHStatus

    return processedObj;
}




