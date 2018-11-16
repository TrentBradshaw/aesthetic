const storageService = firebase.storage();
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();
// todo -- make each aesthetic have a unique id and make it accessible to the file uploader so it can store the files properly.
let projectName = document.getElementById('projectName');
const dropDownUserNameDisplay = document.getElementById('dropdown');
const h2 = document.getElementById('h2');

const uploader = document.getElementById('uploader');
	const fileButton = document.getElementById('fileButton');
//Authentication

// Get elements for authentication
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const username = document.getElementById('username');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');


// add login event
if (btnLogin){
	btnLogin.addEventListener('click', e => {
    	const email = txtEmail.value;
    	const password = txtPassword.value;
    
    	//Sign in
    	const promise = auth.signInWithEmailAndPassword(email,password);
		promise.catch(e => console.log(e.message));
		window.location.href = ('http://127.0.0.1:8080/profile.html');
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
	

	db.collection('users').add({
		userID: user.uid,
		email: user.email,
		username: user.displayName,
	});
	db.collection('users').get().then(snapshot => {
		snapshot.docs.forEach(doc => {
			if (doc.data().userID == user.uid){
			console.log(doc.data());
			userData = doc.data();
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

if (fileButton){
//listen for file selection
fileButton.addEventListener('change', function(e) {
	//get file
	let file = e.target.files[0];
	
	//create storage ref
	let storageRef = storageService.ref("/path/" + user.uid + file.name);
	console.log("user id" + user.uid);
	console.log("storage ref " + storageRef);
	console.log("Storage ref url: " + storageRef.url);
	//upload file
	file.name = user.uid + file.name;
	let task = storageRef.put(file);
	console.log(file);
	console.log("name of uploaded file: " + file.name);
  
	//update progress bar
	task.on('state_changed', progress, error, complete) 
	
	function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		uploader.value = percentage;
	};
	
	function error(err){
  
	};
  
	function complete(){
		console.log(file.name);
		console.log(e.target.value);
		console.log('file uploaded');
		console.log('before url request');
		console.log(storageRef);
		let div = document.getElementById('photocontainer');
		let imgContainer = document.createElement('img');
		imgContainer.setAttribute('id', file.name);
		imgContainer.setAttribute('height', '70%');
		
		imgContainer.setAttribute('width', '90%');
		div.appendChild(imgContainer);
		storageRef.getDownloadURL().then(function(url) {
			console.log('url acquired');
			var img = document.getElementById(file.name);
			console.log("url : " + url);
			img.src = url;
		
		}).catch(function(error) {
		// Handle any errors
		});
		console.log('after url request');
	};
  
   
  
  });
  




	}
	

} else{
		console.log('user not signed in');
	}
})

	




if(btnLogout){
	btnLogout.addEventListener('click', e => {
	auth.signOut();
	console.log("Signed Out");
	window.location.href = ('http://127.0.0.1:8080')
	});
}




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
