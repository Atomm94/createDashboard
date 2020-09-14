const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const config = {
    PORT:3000,
    DATABASE:'mongodb+srv://At11:atmak11@cluster0.d1re6.mongodb.net/googleDashboard?retryWrites=true&w=majority',
    GOOGLE_CLIENT_ID: '385039367681-4qh2mpp5g5m7qi6ruf26jdg9vt4ef6h4.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: 'r-BO-6fStFfiwaBijfy9sI9o',
    GOOGLE_CALLBACK_URL: 'http://localhost:3000/google/callback',
    API_KEY: 'AIzaSyC5SMwPoMtEkG2EdG8nEtwVXnVrTDg6k3A'
}


mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const authorization = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.query.token;

    let msg = {auth: false, message: 'No token provided.'};
    if (!token) res.status(500).json(msg);
    jwt.verify(token, process.env.tokenSecret, function (err, decoded) {
        let msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err) res.status(500).json(msg);
    });
}


module.exports = {
    authorization,
    config
};