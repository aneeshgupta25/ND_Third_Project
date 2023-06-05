const express = require('express');

const projectData = {};
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log("I am a Server and I'm Listening!!");
}

app.get('/weatherInfo', (req, res)=>{
    // const pinCode = req.query.pinCode;
    const q = req.query.q;
    // console.log(q);
    // console.log("*********")
    // console.log(projectData);
    // console.log("*********")
    const response = projectData[q];
    // console.log(response);
    res.send(response);
});
app.post('/postWeather', addUserData);
function addUserData(req, res) {
    const key = req.body.key;
    const value = req.body.value;    
    projectData[key] = value;

    console.log(projectData);        
    res.send({myStatus: 'Received'});
}