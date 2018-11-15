const storageService = firebase.storage();
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();

const img = document.getElementById('plus');
const dropDownUserNameDisplay = document.getElementById('dropdown');
const h2 = document.getElementById('h2');
//Authentication

// Get elements for authentication
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const username = document.getElementById('username');


// add login event
if (btnLogin){
	btnLogin.addEventListener('click', e => {
    	const email = txtEmail.value;
    	const password = txtPassword.value;
    
    	//Sign in
    	const promise = auth.signInWithEmailAndPassword(email,password);
		promise.catch(e => console.log(e.message));
		//window.location.href = ('http://127.0.0.1:8080/profile.html');
    });
}
  

if (btnSignUp) {
	// add signup event
    btnSignUp.addEventListener('click', e => {
		const email = txtEmail.value;
		const password = txtPassword.value;
		
  		//Sign up
  		auth.createUserWithEmailAndPassword(email,password).then(
        	(firebaseUser)=>{
				window.location.href = ('http://127.0.0.1:8080/profile.html');
				console.log('uid',firebaseUser.user.uid);
            	// here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
        		if(firebaseUser){
					btnLogout.classList.remove('hide');
            		
					//console.log(user)
            		//db.collection('users').get().then(snapshot => {
            		//	snapshot.docs.forEach(doc => {
                			//  console.log(doc.data());
                    		//if (doc.data().userID == user.uid){
							//	console.log(doc.data());
                    		//	const headerName = doc.data().username;
                      		//	dropDownUserNameDisplay.innerHTML = headerName;
                      		//	console.log(headerName);
                      		//	h2.innerHTML = headerName;
                    	//	}
                	//	});
            		//});
               
              	}    
				  
			} 
	    )
		
	})

}

firebase.auth().onAuthStateChanged(function(user) {
	
	if(user){
	
	console.log(user.uid);
	db.collection('users').add({
		userID: user.uid,
		email: user.email,
		username: user.displayName,
	});
	db.collection('users').get().then(snapshot => {
		snapshot.docs.forEach(doc => {
			if (doc.data().userID == user.uid){
			console.log(doc.data());
			//const headerName = doc.data().username;
		 	//console.log(headerName);
			//if(dropDownUserNameDisplay){
			//	dropDownUserNameDisplay.value = headerName;
		 	//}
			//if(h2){
			//	console.log(headerName);
			//	h2.innerHTML = headerName;
			//	}  
			//	   
			}
		});
});         
	} else{
		console.log('user not signed in');
	}
})

	





btnLogout.addEventListener('click', e => {
auth.signOut();
console.log("Signed Out");
window.location.href = ('http://127.0.0.1:8080')
});



//appjs






//profilejs

 



    

 












  //img.addEventListener('click', function(e) {
    //window.location.href = ('http://127.0.0.1:8080/create.html');
//})

  //let userID = auth.currentUser.uid;
  //console.log(userID);


  // createjs



     // db.collection('users').get().then(snapshot => {
        //snapshot.docs.forEach(doc => {
          
          //  console.log(doc.data());
         //   if (doc.data().userID == user.uid){
       ////       const username = doc.data().username;
       //       dropDownUserNameDisplay.innerHTML = username;
       //       //h2.innerHTML = username;
       //     }
            
          
          
            
          
      //  })
    //  })
   //     // User is signed in.
 //   } else {
   //   // No user is signed in.
   // }
  //});




//[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
 //   l//et hiddenInput = document.createElement('input'),
 // /   // //  mainInput = document.createElement('input'),
    ////    tags = [];
    ///
   // hiddenInput.setAttribute('type', 'hidden');
   /// hiddenInput.setAttribute('name', el.getAttribute('data-name'));

 //   mainInput.setAttribute('type', 'text');
  //  mainInput.classList.add('main-input');
 //   mainInput.addEventListener('input', function () {
      //  let enteredTags = mainInput.value.split(',');
   //     if (enteredTags.length > 1) {
      //      enteredTags.forEach(function (t) {
        //        let filteredTag = filterTag(t);
        //        if (filteredTag.length > 0)
        //            addTag(filteredTag);
      //      });
    //        mainInput.value = '';
  //      }
  //  });

    //mainInput.addEventListener('keydown', function (e) {
   //     let keyCode = e.which || e.keyCode;
    //    if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
  //          removeTag(tags.length - 1);
  //      }
    ///});

   // el.appendChild(mainInput);
   // el.appendChild(hiddenInput);

    

    //function addTag (text) {
       // let tag = {
         //   text: text,
        ////    element: document.createElement('span'),
      //  };

        ///tag.element.classList.add('tag');
      //  tag.element.textContent = tag.text;

      //  let closeBtn = document.createElement('span');
     //   closeBtn.classList.add('close');
     //   closeBtn.addEventListener('click', function () {
   //         removeTag(tags.indexOf(tag));
     //   });
      //  tag.element.appendChild(closeBtn);
//
     //   tags.push(tag);

    //    el.insertBefore(tag.element, mainInput);
//
  //      refreshTags();
 //   }
//
    //function removeTag (index) {
   //     let tag = tags[index];
     //   tags.splice(index, 1);
   //     el.removeChild(tag.element);
  //      refreshTags();
 //   }

  //  function refreshTags () {
   //     let tagsList = [];
      //  tags.forEach(function (t) {
    //        tagsList.push(t.text);
  //      });
    //    hiddenInput.value = tagsList.join(',');
  //  }

   // function filterTag (tag) {
 //       return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
  //  }
//});

//var projectDbRef = db.collection('projects').doc.
