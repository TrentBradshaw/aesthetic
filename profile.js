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
  const auth = firebase.auth();
  const img = document.getElementById('plus');
  img.addEventListener('click', function(e) {
    window.location.href = ('http://127.0.0.1:8080/create.html');
  })

  let userID = auth.currentUser.uid;
  console.log(userID);