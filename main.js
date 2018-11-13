 
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCjZZJ2rNAzKgkZ9ioE0UeufR3W3RSDN1Y",
    authDomain: "walrusaesthetic.firebaseapp.com",
    databaseURL: "https://walrusaesthetic.firebaseio.com",
    projectId: "walrusaesthetic",
    storageBucket: "walrusaesthetic.appspot.com",
    messagingSenderId: "264200815299"
  };
  firebase.initializeApp(config);
  const storageService = firebase.storage();
  const storageRef = storageService.ref();
  const database = firebase.database();


//Authentication

// Get elements for authentication

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');




// add login event
btnLogin.addEventListener('click', e => {

  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

//Sign in
const promise = auth.signInWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));


});
// add signup event
btnSignUp.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

//Sign in
const promise = auth.createUserWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location.href = ('http://127.0.0.1:8080')
});


// add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser) {
  console.log(firebaseUser);
  btnLogout.classList.remove('hide');
  window.location.href = ('http://127.0.0.1:8080/profile.html')
} else{
  console.log('not logged in')
  btnLogout.classList.add('hide');
}
});

  // we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean
var isNewUser = true;
var ref = new Firebase("https://walrusaesthetic.firebaseio.com");
ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
});
// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}

// Authentication end





















//document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
//document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

//let selectedFile;
//function handleFileUploadChange(e)  {
  //selectedFile = e.target.files[0];
//}

//function handleFileUploadSubmit(e) {
   // const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
   // uploadTask.on('state_changed', (snapshot) => {
  //  // Observe state change events such as progress, pause, and resume
  //  }, (error) => {
   //   // Handle unsuccessful uploads
   //   console.log(error);
   // }, () => {
       // Do something once upload is complete
    //   console.log('success');
    //});
  //}




  // get elements
  //const preObject = document.getElementById('object');


  //creat references
  //const dbRefObject = firebase.database().ref().child('object');

  //sync object changes
 // dbRefObject.on('value', snap => console.log(snap.val()));

 // function writeUserData(userId, name, email, imageUrl) {
   // firebase.database().ref('users/' + userId).set({
   //   username: name,
   //   email: email,
   //   profile_picture : imageUrl
    //});
  //}