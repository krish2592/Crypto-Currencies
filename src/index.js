const express = require('express');
const route = require('./routes/routes.js');
const mongoose = require('mongoose');
const app = express();


mongoose.connect("mongodb+srv://root:Monkey_db%40123@cluster0.in2io.mongodb.net/cryptocurr", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});