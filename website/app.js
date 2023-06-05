//client-side
// Personal API Key for OpenWeatherMap API
const apiKey = 'aed7fea30e09c377e19166172ff010d0&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'

const postData = async (data={}) => {    
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
        // console.log(response);
        // console.log(response.status);
        const newData = await response.json();        
        // console.log(newData);
        console.log(newData)
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
        console.log(newData)
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> OpenWeatherAPI");
    }
}

const getData = async (data) => {
    // console.log(data.value);
    const response = await fetch(`/weatherInfo?q=${data.value}`);
    try {
        const newData = await response.json();
        console.log(`New Data From My Server -> ${newData}`);
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> My Server - GET");   
    }
}

document.getElementById('generate').addEventListener('click', getDataAndUpdateUI);
function getDataAndUpdateUI() {
    const fav = document.getElementById("feelings").value;
    const areaCode = document.getElementById("zip").value;

    getDataFromOpenWeather({value: areaCode})
    .then(        
        function(data) {
            postData({
                key: areaCode,
                value: {
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    temp: data.main.temp,
                    name: data.name,
                    fav: fav                    
                }
            })           
        },        
    )
    .then(() => getData({value: areaCode}))      
    .then((data) => {
        document.getElementById('temp').innerHTML = `${Math.round(data.temp)} °C`;        
    });

}

const updateUI = async () => {
    const response = await fetch('')
} 