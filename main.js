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
const user = firebase.auth().currentUser;
const submit = document.getElementById('btnSignUp');
const username = document.getElementById('username');
const auth = firebase.auth();






// add login event
if (btnLogin){
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    
    //Sign in
      const promise = auth.signInWithEmailAndPassword(email,password);
      promise.catch(e => console.log(e.message));
    
    
    })
}
  

if (btnSignUp) {
  // add signup event
btnSignUp.addEventListener('click', e => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  
  
  
  
  
  //Sign up
  const promise = auth.createUserWithEmailAndPassword(email,password).then(
    (firebaseUser)=>{
   // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
      if(firebaseUser){
        const displayName = username.value;
         firebaseUser.updateProfile({
         displayName: displayName,
           
        })
      console.log(displayName)
      }
  }).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // ...
  });
  promise.catch(e => console.log(e.message));
  });
}


btnLogout.addEventListener('click', e => {
firebase.auth().signOut();
window.location.href = ('http://127.0.0.1:8080')
});


// add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser) {
currentUser = firebaseUser.uid;
const displayName = firebaseUser.displayName;
console.log(displayName);
console.log(firebaseUser.uid);
btnLogout.classList.remove('hide');
db.collection('users').add({

  email: firebaseUser.email,
  userID: firebaseUser.uid,
  username: displayName,
  
});
console.log(firebaseUser.userID)
      db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          
          //  console.log(doc.data());
            if (doc.data().userID == firebaseUser.uid){
              const username = doc.data().username;
              dropDownUserNameDisplay.innerHTML = username;
              console.log(username);
              h2.innerHTML = username;
            }
          })
        })

//window.location.href = ('http://127.0.0.1:8080/profile.html');
} else{
console.log('not logged in')
btnLogout.classList.add('hide');
}
});


//appjs








btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location.href = ('http://127.0.0.1:8080')
});




//profilejs

  const img = document.getElementById('plus');
  const dropDownUserNameDisplay = document.getElementById('dropdown');
  const h2 = document.getElementById('h2');
 

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href = ('http://127.0.0.1:8080')
  });


    

 












  //img.addEventListener('click', function(e) {
    //window.location.href = ('http://127.0.0.1:8080/create.html');
//})

  //let userID = auth.currentUser.uid;
  //console.log(userID);


  // createjs


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          
          //  console.log(doc.data());
            if (doc.data().userID == user.uid){
              const username = doc.data().username;
              dropDownUserNameDisplay.innerHTML = username;
              //h2.innerHTML = username;
            }
            
          
          
            
          
        })
      })
        // User is signed in.
    } else {
      // No user is signed in.
    }
  });




[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input'),
        tags = [];
    
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            mainInput.value = '';
        }
    });

    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    

    function addTag (text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);

        refreshTags();
    }

    function removeTag (index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags () {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag (tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }
});

//var projectDbRef = db.collection('projects').doc.