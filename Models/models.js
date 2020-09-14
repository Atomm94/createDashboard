const mongoose = require('mongoose');
require('./Schemas/users')

const users = mongoose.model('user');

module.exports = {
    users
}