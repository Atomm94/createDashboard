const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./Api/routes').router;
const passport = require('passport');
const authorize = require('./authorize');
const config = require('./config');
const path = require('path');
// const proxy = require('express-http-proxy');
// const app = require('express')();
//
// app.use('/', proxy('localhost:3000/google'));

const app = express()
const port = config.config.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api', routes);


app.get('/home', async (req,res) => {
    res.sendFile(path.join(__dirname, 'home.html'))
})

app.get('/google/callback', async (req,res) => {
    const auth =  await passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/spreadsheets']});
    await authorize.listMajors(auth)
    res.write('<h1>Hello!</h1>');
    res.end();
})



app.get('/google', passport.authenticate( 'google',{scope: ['email', 'profile']}));


app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})
