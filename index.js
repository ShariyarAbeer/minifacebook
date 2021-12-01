const express = require('express');
const mongoose = require('mongoose');
const app = express();
//body data dorar jonno
app.use(express.json({
    limit: '100 mb'
}))
//url data dorar jonno 
app.use(express.urlencoded({
    limit: '100mb',
    extended: true
}))

// @connect database
const dbURL = `mongodb://localhost:27017/minifacebook?readPreference=primary&ssl=false`;
mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Mongo Connected. Database: minifacebook. Port: 27017`));


app.use('/api', require('./routes'))

app.listen(3000, () => {
    console.log('server running on port : 3000')
})