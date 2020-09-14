const express = require('express');

const successHandler = (res,data) => {
    let resObj = {
        success: true,
        data: data || null,
        message: 'ok'
    }
    res.status(res.statusCode).json(resObj);
}

const errorHandler = (res,err) => {
    let resObj = {
        success: false,
        data: null,
        message: err.message || 'Something went wrong'
    }
    res.status(res.statusCode).json(resObj);
}

module.exports = {
    successHandler,
    errorHandler
}