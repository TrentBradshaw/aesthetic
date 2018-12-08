const functions = require("firebase-functions")
const express = require("express")
const admin = require('firebase-admin');

/* Express */
const app = express();

app.set('view engine', 'pug');

app.get("*", (req, res) => {
  res.render('index');
})

app.listen(5000, () =>{
  console.log('this app is running on LH3k');
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });