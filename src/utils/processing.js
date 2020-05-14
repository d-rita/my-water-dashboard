export const processDataFeeds = (arr) => {
    arr.reverse();
    let newArr = [];

    for(let i = 0, n = arr.length; i < n; i++){
        let newObj = {};

        let timeDateArr = arr[i].created_at.split('T');
        newObj.date = timeDateArr[0];
        let time = timeDateArr[1].split('Z');
        newObj.time = time[0];

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
    }
    else if(obj.field1 < 6.8)
    {
        pHStatus = "Low";
    }
    else if(obj.field1 > 8.0)
    {
        pHStatus = "High";
    }

    // check turbidity

    if(!obj.field2)
    {
        turbidityStatus = "Check sensor";
    }
    else if(obj.field2 > 5.0)
    {
        turbidityStatus = "High";
    }

    // check temperature

    if(!temp)
    {
        temp = "Check sensor";
    }
    else
    {
        temp = obj.field3;
    }

    return [turbidityStatus, pHStatus, temp];
}



