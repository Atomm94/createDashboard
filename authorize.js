const passport = require('passport');
const {google} = require('googleapis');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const express = require('express');
const config = require('./config').config;


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL:config.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
        return done(null, done);
    }
))




const listMajors = async (auth) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        key: config.API_KEY,
        spreadsheetId: '1RvNsESO8aejlDFNHGFm2w9Eq4POwQASwvNMeRcBghOw',
        range: 'A:B',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        console.log(rows)
        console.log('ok data!')
        if (rows.length) {
            console.log('Name, Major:');
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found.');
        }
        console.log('ok')
    })
}


module.exports = {
    listMajors
}

