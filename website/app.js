//client-side
// Personal API Key for OpenWeatherMap API
const apiKey = '';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'

const postData = async (data={})=> {    
    const url = '/postWeather';
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log("Testing Data" + newData);
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> My Server - POST");   
    }
}

const getDataFromOpenWeather = async (data={}) => {
    const response = await fetch(`${baseURL}q=${data.value}&appid=${apiKey}`);    
    try {
        const newData = await response.json();
        console.log(`New Data From OpenWeatherAPI -> ${newData}`);        
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> OpenWeatherAPI");
    }
}

const getData = async (data) => {
    const response = await fetch(`/weatherInfo?key=${data.key}`);
    try {
        const newData = await response.json();
        console.log(`New Data From My Server -> ${newData}`);
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> My Server - GET");   
    }
}

const myData = getDataFromOpenWeather({ value: '9000' });
const myData2 = postData({key: '9000', value: myData});