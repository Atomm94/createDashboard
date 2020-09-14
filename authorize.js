const passport = require('passport');
//const googleSheets = require('google-spreadsheets');
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

// axios.get('https://spreadsheets.google.com/feeds/list/1RvNsESO8aejlDFNHGFm2w9Eq4POwQASwvNMeRcBghOw/od6/public/values?alt=json')
//     .then(data => console.log(data.content))




//
// (async () => {
//   //  const response = await fetch('https://spreadsheets.google.com/feeds/list/1RvNsESO8aejlDFNHGFm2w9Eq4POwQASwvNMeRcBghOw/od6/public/values?alt=json');
//     const sheets = google.sheets({version: 'v4'}, 'https://www.googleapis.com/auth/spreadsheets');
//     const response = sheets.spreadsheets.values.get({
//         key: process.env.API_KEY,
//         spreadsheetId: '1RvNsESO8aejlDFNHGFm2w9Eq4POwQASwvNMeRcBghOw',    ///1UIV4RkOx8KJK2zQYig0klH5_f8FCOdwIWV8YF2VyF8I
//         range: 'A:B',
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const rows = res.data.values;
//         console.log(rows)
//         console.log('ok data!')
//         if (rows.length) {
//             console.log('Name, Major:');
//             // Print columns A and E, which correspond to indices 0 and 4.
//             rows.map((row) => {
//                 console.log(`${row[0]}, ${row[4]}`);
//             });
//         } else {
//             console.log('No data found.');
//         }
//         console.log('ok')
//     })
// })();



const listMajors = async (auth) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        key: config.API_KEY,
        spreadsheetId: '1RvNsESO8aejlDFNHGFm2w9Eq4POwQASwvNMeRcBghOw',    ///1UIV4RkOx8KJK2zQYig0klH5_f8FCOdwIWV8YF2VyF8I
        range: 'A:B',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        console.log(rows)
        console.log('ok data!')
        if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
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

