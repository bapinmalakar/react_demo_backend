'use strict';

const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3500;
const config = require('./config_folder');

//set default and required middleware
app.use(bodyParser.json());
app.use(cors());

config(app);
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})