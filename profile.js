

  const storageService = firebase.storage();
  const storageRef = storageService.ref();
  const database = firebase.database();
  const auth = firebase.auth();
  const img = document.getElementById('plus');
  
 



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          
          //  console.log(doc.data());
            if (doc.data().userID == user.uid){
              const username = doc.data().username;
              const h2 = document.getElementById('h2');
              h2.innerHTML = username;
            }
            
          
          
            
          
        })
      })
      console.log(user);
      console.log(user.uid);
      console.log(user.username);
      console.log()
      const userCurrent = db.collection('users').where('userID', '==', user.uid);
      console.log(userCurrent);
     
      var docRef = db.collection('users').doc();
      console.log(docRef);

      //const users = db.collection('users');
      //const userCurrent = users.where('userID', '==', user.uid);
      //const userData = userCurrent.data();
      //const username = userData.username;
      //console.log(username)
      //console.log(user);
      //console.log(userCurrent);
      
      
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });



  














  img.addEventListener('click', function(e) {
    window.location.href = ('http://127.0.0.1:8080/create.html');
  })

  //let userID = auth.currentUser.uid;
  //console.log(userID);