const fs = require('fs');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')

const chanceOfFailure = 0.10;
const port = 9001;
const shiftList = JSON.parse(fs.readFileSync('shift_list.json', 'utf8'));
const nurseList = JSON.parse(fs.readFileSync('nurse_list.json', 'utf8'));

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// app.use(cors());

var whitelist = ['http://localhost:3000']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

/**
 * Returns a JSON list of the shifts in the facility
 */
app.get('/shifts', (req, res) => {
  console.info('Attempting to send shift list to requestor');
  if(Math.random() > chanceOfFailure) {
    res.status(200).send(shiftList);
    console.info('Successfully delivered shift list');
  }
  else {
    res.status(500).send({ error: 'Server blew up'});
    console.error('Oh no! The send failed!');
  }
});

/**
 * Returns a JSON list of nurses in the facility
 */
app.get('/nurses', (req, res) => {
  console.info('Attempting to send nurse list to requestor');
  if(Math.random() > chanceOfFailure) {
    res.status(200).send(nurseList);
    console.info('Successfully delivered nurse list');
  }
  else {
    res.status(500).send({ error: 'Server blew up'});
    console.error('Oh no! The send failed!');
  }
});

/**
 * Given an API call with a shift ID to save and a nurseID in the request body, will fake saving that nurse to the shift.
 */
app.put('/shifts/:shiftID', (req, res) => {
    console.log(req.body);
    console.log(req.params);
  const shiftID = req.params.shiftID;
  const nurseID = req.body.nurseID;
  console.info(`Attempting to save shift ${shiftID} with nurse ${nurseID} assigned to it.`);
  if (Math.random() > chanceOfFailure) {
    res.status(200).send({
      shiftID,
      nurseID,
    });
    console.info(`Successfully saved the shift ${shiftID}`)
  }
  else {
    res.status(500).send({ error: 'Server blew up'});
    console.error('Oh no! The save failed!');
  }
});

/**
 * Start the server
 */
app.listen(port, () => {
 console.info(`Server is listening on port ${port}`); 
});
