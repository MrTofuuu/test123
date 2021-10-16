const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    // TODO: Logic for sending all the content of db/diagnostics.json
    readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    // TODO: Logic for appending data to the db/diagnostics.json file
    console.log('inside the POST of diagnostic');
    // Destructuring assignment for the items in req.body
    const { isValid, errors } = req.body;

    // If all the required properties are present
    if (!isValid) {
        // Variable for the object we will save
        const newDiagnostic = {
            time: Date.now(),
            error_id: uuidv4(),
            errors

        };

        readAndAppend(newDiagnostic, './db/diagnostics.json');

        const response = {
            status: 'success',
            body: newDiagnostic,
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});

module.exports = diagnostics;