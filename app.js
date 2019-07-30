const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
var cors = require('cors')
const router = require('./router');
const errorController = require('./controllers/errorController')

const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(router);

app.use(errorController.error);

app.listen(4000, () => {
    console.log("Server is runining on port 4000")
})
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true , useCreateIndex: true }, (err, db) => {
    if (err) {
        console.log('Mongodb Error');
    }
    else {
        console.log("Database created...");
    }
})
