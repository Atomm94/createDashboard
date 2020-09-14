const express = require('express');
const router = express.Router();

const userRoutes = require('./Users/index').user;

router.use('/user', userRoutes);

module.exports = {
    router
}