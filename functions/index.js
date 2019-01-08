const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


const uid = 'some-uid';

admin.auth().createCustomToken(uid).then((customToken) => {
  console.log(customToken);
  return;
}).catch((error) =>{
console.log('error' + error);
})
const functions = require("firebase-functions")
const express = require("express")
const app = express();

app.set('view engine', 'pug');
app.use(express.static('C:/Users/wally/Projects/aesthetic/public'));
app.use(bodyParser.json());

const jsonBodyParser = bodyParser.json()

app.get('/credentials', (req, res) =>{
  console.log('home');
  res.render('home');
});
app.post('/', jsonBodyParser, (req,res) =>{
  console.log(req.body.idtoken)
  console.log(req.body.uid);
  console.log(req.body.username)
  res.send(req.body.userid);
  app.locals.userid = req.body.uid;
});
console.log("applocalsid"  + app.locals.userid)
app.get('/', jsonBodyParser,  (req,res) =>{
  res.send("params" + req.params)
  res.send(req.header.idToken)
  console.log(req.idToken)
});
app.get('/user/:username/following', (req, res) => {
  res.render('following', {username:req.params.username});
});
app.get('/user/:username/followers', (req, res) => {
  res.render('followers', {username: req.params.username});
})
app.get('/profile', (req, res) =>{
res.render('profile');
});

app.get('/settings', (req, res) =>{
res.render('settings');
});

app.get('/user/:username', (req,res) =>{
  console.log('yeet');
  console.log(req.body.username)
  
  res.render('profile', {username:req.params.username, userUserName: req.body.username});
});

app.get('/explore', (req, res) =>{
  res.render('explore');
});

app.get('/user/:username/aesthetic/:aestheticName', (req, res) =>{
  res.render('aesthetic', {username: req.params.username, aestheticName: req.params.aestheticName});
  //res.send(req.params)
  //var user = db.getUserByUsername(captureFromRoute.get('username'));
  //var userTemplate = template.get('usertemplate');
  //userTemplate.populateWith(user.info());
  //return userTemplate
});

app.listen(5000, (req, res) =>{
  console.log('listening');
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.app = functions.https.onRequest(app);

