const express = require('express');

//app API endpoint
projectData = [];

//start an instance of app
const app = express();

//Dependencies - body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Dependencies - cors
const cors = require('cors');
app.use(cors());

// Point the Server to Client containing all html, css and js files
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log("I am a Server and I'm Listening!!");
}

//app get route
app.get('/weatherInfo', (req, res)=>{
    const pinCode = req.query.pinCode;
    res.send(projectData[req.query.pinCode]);
});
app.post('/postWeather', addUserData);
function addUserData(req, res) {
    const newEntry = {
        key: req.body.key,
        value: req.body.data
    }
    projectData[newEntry.key] = newEntry.value;    
    console.log(newEntry);
}