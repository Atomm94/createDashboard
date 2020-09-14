const express = require('express');
const user = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../Models/models').users
const successHandler = require('../responseHandler').successHandler;
const errorHandler = require('../responseHandler').errorHandler;
const Validation = require('./validation');
const auth = require('../../config').authorization;

user.post('/register', Validation.registerValidation, async (req,res) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const createUser = await userModel.create(req.body);
        return successHandler(res,createUser);
    } catch (err) {
        return errorHandler(res,err);
    }
})

user.post('/login', Validation.loginValidation, async (req,res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const userFind = await userModel.findOne({email: email});
        const compare = await bcrypt.compareSync(password, userFind.password);
        if(compare) {
            const refreshToken = await jwt.sign({data: userFind}, process.env.tokenSecret, {expiresIn: 86400});
            await userFind.updateOne({$set: {token: refreshToken}})
            userFind.token = refreshToken;
            return successHandler(res, userFind);
        } else {
            let err = {};
            err.message = 'password is not correct.';
            return errorHandler(res, err);
        }
    } catch (err) {
        return errorHandler(res,err);
    }
});

user.put('/update/:id', async (req,res) => {
    try {
        await auth(req,res);
        if(req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
        }
        const userUpdateById = await userModel.updateOne({_id: req.params.id}, req.body);

        return successHandler(res,userUpdateById)
    } catch (err) {
        return errorHandler(res,err)
    }
})


user.delete('/remove/:id', async (req,res) => {
    try {
        await auth(req,res);
        const userRemoveById = await userModel.deleteOne({_id: req.params.id});
        return successHandler(res,userRemoveById)
    } catch (err) {
        return errorHandler(res,err)
    }
})

user.get('/getAll', async (req,res) => {
    try {
        await auth(req,res);
        const users = await userModel.find();
        return successHandler(res,users);
    } catch (err) {
        return errorHandler(res,err);
    }
})

user.get('/:id', async (req,res) => {
    try {
        await auth(req,res);
        const userFind = await userModel.findById(req.params.id);
        return successHandler(res,userFind);
    } catch (err) {
        return errorHandler(res,err);
    }
})

module.exports = {
    user
}


// curl -H 'Content-Type: application/json' --data '{url: "http://localhost:3000"}' 'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=AIzaSyAgEfPZhn8w1FoOwiHAfkonD2LjIePnDMU'