const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const projectData = {};
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('website'));
app.use(express.static(path.join(__dirname, '../website')));

const port = process.env.PORT || 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("I am a Server and I'm Listening!!");
}

app.get('/weatherInfo', (req, res)=>{    
    const c = req.query.c;
    const z = req.query.z;    
    const response = projectData[c][z];    
    res.send(response);
});

app.post('/postWeather', addUserData);
function addUserData(req, res) {
    const key = req.body.key;    
    const zip = req.body.zip;    
    const value = req.body.value;    
    if(projectData[key] == undefined) projectData[key] = {};
    projectData[key][zip] = value;

    console.log(projectData);        
    res.send({myStatus: 'Received'});
}

app.get('/all', getAll);
function getAll(req, res) {
    res.send(projectData);
}

// Route handler for the root route
// app.get('/', (req, res) => {        
//     // res.sendFile('index.html', { root: 'website' });    
//     res.send("Hello Data");
//   });