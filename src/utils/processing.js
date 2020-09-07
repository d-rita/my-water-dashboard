import notify from "../components/Notification"


export const processDataFeeds = (arr) => {
    arr.reverse();
    let newArr = [];

    for(let i = 0, n = arr.length; i < n; i++){
        let newObj = {};

        let timeCreated = new Date(arr[i].created_at);

        newObj.date = timeCreated.toDateString();
        
        newObj.time = timeCreated.toLocaleTimeString();

        newObj.entry_id = arr[i].entry_id;
        newObj.pH = arr[i].field1;
        newObj.turbidity = arr[i].field2;
        newObj.temperature = arr[i].field3;
 
        newArr[i] = newObj;
    }
    return newArr;
}

export const processSingleFeed = (obj) => {

    let pHStatus = "Normal";
    let turbidityStatus = "Normal";
    let temp = obj.field3;

    // check pH
    if(!obj.field1)
    {
        pHStatus = "Check sensor";
        notify("Oops!😰 pH Sensor may be faulty!")
    }
    else if(obj.field1 < 6.8)
    {
        pHStatus = "Low";
        notify(`pH level is ${pHStatus}!`)
    }
    else if(obj.field1 > 8.0)
    {
        pHStatus = "High";
        notify(`pH level is ${pHStatus}!`)
    }

    // check turbidity
    if(!obj.field2 || obj.field2 < 0)
    {
        turbidityStatus = "Check sensor";
        notify(`Oops!😰 Turbidity sensor may be faulty!`)
    }
    else if(obj.field2 > 5.0)
    {
        turbidityStatus = "High";
        notify(`Turbidity level is ${turbidityStatus}!`)
    }

    // check temperature
    if(!temp)
    {
        temp = "Check sensor";
        notify(`Oops!😰 Temperature sensor may be faulty!`)
    }
    else
    {
        temp = obj.field3;
    }

    return [turbidityStatus, pHStatus, temp];
}




