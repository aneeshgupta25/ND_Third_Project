//client-side
// Personal API Key for OpenWeatherMap API
const apiKey = 'aed7fea30e09c377e19166172ff010d0&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
let isTempInF = true;
let tempInF, tempInC;

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
    const response = await fetch(`${baseURL}zip=${data.zipCode},${data.countryCode}&appid=${apiKey}`);    
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
    const response = await fetch(`/weatherInfo?c=${data.countryCode}&z=${data.zipCode}`);
    try {
        const newData = await response.json();
        console.log(`New Data From My Server -> ${newData}`);
        return newData;
    } catch(e) {
        console.log("ERROR OCCURRED -> My Server - GET");   
    }
}

function getDataAndUpdateUI(countryCode, zip, feeling) {

    getDataFromOpenWeather({
        zipCode: zip,
        countryCode: countryCode
    })
    .then(        
        function(data) {
            postData({
                key: countryCode,
                zip: zip,
                value: {
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    temp: data.main.temp,
                    name: data.name,
                    wind: data.wind.speed,
                    cloudiness: data.clouds.all,
                    date: data.dt,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    icon: data.weather[0].icon,
                    fav: feeling                  
                }
            })           
        },        
    )
    .then(() => getData({countryCode: countryCode, zipCode: zip}))      
    .then((data) => {

        setBackgroundImage(data.icon);
        tempInF = data.temp;

        document.getElementById('location-title').innerHTML = `${data.name}`;
        document.getElementById('temp').innerHTML = `${data.temp} F`;
        document.getElementById('weather-info').innerHTML = `${data.main}`
        document.getElementById('wind').innerHTML = `${data.wind} miles/hour`

        document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
        
        //get date from unix time stamp
        const currDate = unixToDate(data.date);
        const sunriseTime = unixToDate(data.sunrise);
        const sunsetTime = unixToDate(data.sunset);
        document.getElementById('date').innerHTML = `${currDate.weekday},\n${currDate.day}-${currDate.month}-${currDate.year}`
        document.getElementById('user-feelings').innerHTML = data.fav;
        document.getElementById('sunrise').innerHTML = `${sunriseTime.hours.slice(0, sunriseTime.hours.length-3)}:${sunriseTime.minutes} AM`
        document.getElementById('sunset').innerHTML = `${sunsetTime.hours.slice(0, sunsetTime.hours.length-3)}:${sunsetTime.minutes} PM`
        document.getElementById('cloud').innerHTML = `${data.cloudiness} %`
    });
}

const setBackgroundImage = (iconId)=> {
    document.getElementById("container").style.backgroundImage = `url('imgs/${iconId}.jpg')`;
}

function unixToDate(unix) {
    const ms = unix*1000;
    const dateObj = new Date(ms);    
    const weekdayVal = dateObj.toLocaleString("en-US", {weekday: "long"}) // Monday
    const monthVal = dateObj.toLocaleString("en-US", {month: "long"}) // June
    const dayVal = dateObj.toLocaleString("en-US", {day: "numeric"}) // 6
    const yearVal = dateObj.toLocaleString("en-US", {year: "numeric"}) // 2023

    const hoursVal = dateObj.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
    const minutesVal = dateObj.toLocaleString("en-US", {minute: "numeric"}) // 30

    const ans = {
        weekday: weekdayVal,
        month: monthVal,
        day: dayVal,
        year: yearVal,
        hours: hoursVal,
        minutes: minutesVal
    };        
    return ans;
}

document.getElementById('generate').addEventListener('click', ()=>{
    const countryCode = document.getElementById('search-country-dropdown').value;        
    let zip = document.getElementById('zip').value;     
    let feeling = document.getElementById('feelings').value;
    feeling = feeling.trim();
    zip = zip.trim();

    if(countryCode == 'Select Country') {
        alert('Kindly Select a Country..');
        return;
    } else if(zip.length == 0 || zip < 0) {
        alert('Kindly Enter a Valid Zip Code');
        return;
    } else if(feeling.length == 0) {
        alert("We won't tell your feelings to anyone.. 😉");
        return;
    }

    getDataAndUpdateUI(countryCode, zip, feeling);

})

document.getElementById('conversion').addEventListener('click', ()=>{
    const temp = document.getElementById('temp').innerText;
    if(temp != '--') {
        if(isTempInF) {
            //convert to C
            let temp = (tempInF-32)*(5/9);
            temp = Math.round(temp * 100) / 100;
            tempInC = temp;
            document.getElementById('temp').innerHTML = `${temp} °C`
            isTempInF = false;
            document.getElementById('conversion').innerHTML = '(Convert to F)';
        } else {
            //conver to F
            let temp = (tempInC * (9/5)) + 32;
            temp = Math.round(temp * 100) / 100;
            tempInF = temp;
            document.getElementById('temp').innerHTML = `${temp} F`
            isTempInF = true;
            document.getElementById('conversion').innerHTML = '(Convert to °C)';
        }
    }
});