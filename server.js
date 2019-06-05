const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/receipts', (req, res) => {
    res.sendFile(path.join(__dirname, './assets', 'receipt_data.json'));
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

module.exports = app