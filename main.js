const storageService = firebase.storage();
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();
// todo -- make each aesthetic have a unique id and make it accessible to the file uploader so it can store the files properly.
// todo -- make functions for code to eliminate scope issues
// todo -- make AestheticExists: True present in the firestore database if the project is submitted, then display
 //the submitted project in a preview where the create project div normally is
const dropDownUserNameDisplay = document.getElementById('dropdown');
const h2 = document.getElementById('h2');
const createProject = document.getElementById('createProject');
const uploader = document.getElementById('uploader');
const fileButtonOne = document.getElementById('fileButtonOne');
const fileButtonTwo = document.getElementById('filebuttonTwo');
const fileButtonThree = document.getElementById('fileButtonThree');
const fileButtonFour = document.getElementById('fileButtonFour');
const fileButtonFive = document.getElementById('fileButtonFive');
const fileButtonSix = document.getElementById('fileButtonSix');
const fileButtonSeven = document.getElementById('fileButtonSeven');
const fileButtonEight = document.getElementById('fileButtonEight');
const fileButtonNine = document.getElementById('fileButtonNine');


const aestheticOne = document.getElementById('aestheticOne');
const aestheticImgOne = document.getElementById('aestheticImgOne');
const aestheticTwo = document.getElementById('aestheticTwo');
const aestheticImgTwo = document.getElementById('aestheticImgTwo');
const aestheticThree = document.getElementById('aestheticThree');
const aestheticImgThree = document.getElementById('aestheticImgThree');
const aestheticFour = document.getElementById('aestheticFour');
const aestheticImgFour = document.getElementById('aestheticImgFour');
const aestheticFive = document.getElementById('aestheticFive');
const aestheticImgFive = document.getElementById('aestheticImgFive');
const aestheticSix = document.getElementById('aestheticSix');
const aestheticImgSix = document.getElementById('aestheticImgSix');
const aestheticSeven = document.getElementById('aestheticSeven');
const aestheticImgSeven = document.getElementById('aestheticImgSeven');
const aestheticEight = document.getElementById('aestheticEight');
const aestheticImgEight = document.getElementById('aestheticImgEight');
const aestheticNine = document.getElementById('aestheticNine');
const aestheticImgNine = document.getElementById('aestheticImgNine');
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

function getUserData(user, projectName) {
	
	

}


// add login event
if (btnLogin){
	btnLogin.addEventListener('click', e => {
    	const email = txtEmail.value;
    	const password = txtPassword.value;
    
    	//Sign in
    	const promise = auth.signInWithEmailAndPassword(email,password);
		promise.catch(e => console.log(e.message));
		window.location.href = ('http://127.0.0.1:8080/html/profile.html');
    });
}
  

if (btnSignUp) {
	// add signup event
    btnSignUp.addEventListener('click', e => {
			e.preventDefault();
		const email = txtEmail.value;
		const password = txtPassword.value;
		
  		//Sign up
  		auth.createUserWithEmailAndPassword(email,password).then(
        	(firebaseUser)=>{
				
					
				
				console.log('uid',firebaseUser.user.uid);
            	// here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
        		if(firebaseUser){
					db.collection('users').doc(firebaseUser.user.uid).set({
						userID: firebaseUser.user.uid,
						email: firebaseUser.user.email,
					});
					btnLogout.classList.remove('hide');
            		//window.location.href = ('http://127.0.0.1:8080/html/profile.html');
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
		console.log(user);
		const userRef = db.collection('users').doc(user.uid);
		
		
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
		
		
	
		if(aestheticOne){
			aestheticImgOne.addEventListener('click', e => {
				e.preventDefault();
				let projectNameInput = document.createElement('input');
				const submitButton = document.createElement('button');
				const cancelButton = document.createElement('button');
				const buttonDiv = document.createElement('div');

				//apply attributes to the buttons and input
				submitButton.setAttribute('id','aestheticCreationButton');
				cancelButton.setAttribute('id','aestheticCancelButton');
				buttonDiv.setAttribute('id', 'buttonDiv');
				projectNameInput.setAttribute('id', 'aestheticInput');
				
				// Create the nsfw slider
				const sliderDiv = document.createElement('div');
				const label = document.createElement('label');
				const checkInput = document.createElement('input');
				const span = document.createElement('span');
				const nsfwDiv = document.createElement('div');
				const nsfwHeader = document.createElement('h3');

				// Apply attributes to the NSFW slider
				label.setAttribute('class', 'switch');
				checkInput.setAttribute('type', 'checkbox');
				checkInput.setAttribute('id', 'check');
				span.setAttribute('class', 'slider round');
				sliderDiv.setAttribute('id', 'sliderDiv');
				nsfwDiv.setAttribute('id', 'nsfwDiv');
				nsfwHeader.innerHTML = 'NSFW';

				//append elements to the slider div
				label.appendChild(checkInput);
				label.appendChild(span);
				sliderDiv.appendChild(label);
				nsfwDiv.appendChild(sliderDiv);
				nsfwDiv.appendChild(nsfwHeader);
				
				aestheticOne.style.display = 'flex';
				aestheticOne.style.flexDirection = 'column';
				submitButton.innerHTML = 'SUBMIT';
				cancelButton.innerHTML = 'CANCEL';
				

				buttonDiv.appendChild(submitButton);
				buttonDiv.appendChild(cancelButton)

				aestheticImgOne.style.display = 'none';
				aestheticOne.appendChild(projectNameInput);
				aestheticOne.appendChild(nsfwDiv);
				aestheticOne.appendChild(buttonDiv);
				
				const aestheticCreationButton = document.getElementById('aestheticCreationButton');
				aestheticCreationButton.addEventListener('click', e => {
					console.log(userRef);
					console.log(projectNameInput.value);
					userRef.update({
						aestheticOne: projectNameInput.value
					});
					setTimeout(function () {
						window.location.href = 'http://127.0.0.1:8080/html/aesthetic1.html'; //will redirect to your blog page (an ex: blog.html)
				 }, 2000); //will call the function after 2 secs.
				});
	}); 
}


if(aestheticTwo){
	aestheticImgTwo.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticTwo.style.display = 'flex';
		aestheticTwo.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgTwo.style.display = 'none';
		aestheticTwo.appendChild(projectNameInput);
		aestheticTwo.appendChild(nsfwDiv);
		aestheticTwo.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticTwo: projectNameInput.value
				
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic2.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticThree){
	aestheticImgThree.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticThree.style.display = 'flex';
		aestheticThree.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgThree.style.display = 'none';
		aestheticThree.appendChild(projectNameInput);
		aestheticThree.appendChild(nsfwDiv);
		aestheticThree.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticThree: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic3.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticFour){
	aestheticImgFour.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticFour.style.display = 'flex';
		aestheticFour.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgFour.style.display = 'none';
		aestheticFour.appendChild(projectNameInput);
		aestheticFour.appendChild(nsfwDiv);
		aestheticFour.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticFour: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic4.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticFive){
	aestheticImgFive.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticFive.style.display = 'flex';
		aestheticFive.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgFive.style.display = 'none';
		aestheticFive.appendChild(projectNameInput);
		aestheticFive.appendChild(nsfwDiv);
		aestheticFive.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticFive: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic5.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticSix){
	aestheticImgSix.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticSix.style.display = 'flex';
		aestheticSix.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgSix.style.display = 'none';
		aestheticSix.appendChild(projectNameInput);
		aestheticSix.appendChild(nsfwDiv);
		aestheticSix.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticSix: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic6.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticSeven){
	aestheticImgSeven.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticSeven.style.display = 'flex';
		aestheticSeven.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgSeven.style.display = 'none';
		aestheticSeven.appendChild(projectNameInput);
		aestheticSeven.appendChild(nsfwDiv);
		aestheticSeven.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticSeven: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic7.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticEight){
	aestheticImgEight.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticEight.style.display = 'flex';
		aestheticEight.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgEight.style.display = 'none';
		aestheticEight.appendChild(projectNameInput);
		aestheticEight.appendChild(nsfwDiv);
		aestheticEight.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticEight: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic8.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}

if(aestheticNine){
	aestheticImgNine.addEventListener('click', e => {
		e.preventDefault();
		let projectNameInput = document.createElement('input');
		const submitButton = document.createElement('button');
		const cancelButton = document.createElement('button');
		const buttonDiv = document.createElement('div');

		//apply attributes to the buttons and input
		submitButton.setAttribute('id','aestheticCreationButton');
		cancelButton.setAttribute('id','aestheticCancelButton');
		buttonDiv.setAttribute('id', 'buttonDiv');
		projectNameInput.setAttribute('id', 'aestheticInput');
		
		// Create the nsfw slider
		const sliderDiv = document.createElement('div');
		const label = document.createElement('label');
		const checkInput = document.createElement('input');
		const span = document.createElement('span');
		const nsfwDiv = document.createElement('div');
		const nsfwHeader = document.createElement('h3');

		// Apply attributes to the NSFW slider
		label.setAttribute('class', 'switch');
		checkInput.setAttribute('type', 'checkbox');
		checkInput.setAttribute('id', 'check');
		span.setAttribute('class', 'slider round');
		sliderDiv.setAttribute('id', 'sliderDiv');
		nsfwDiv.setAttribute('id', 'nsfwDiv');
		nsfwHeader.innerHTML = 'NSFW';

		//append elements to the slider div
		label.appendChild(checkInput);
		label.appendChild(span);
		sliderDiv.appendChild(label);
		nsfwDiv.appendChild(sliderDiv);
		nsfwDiv.appendChild(nsfwHeader);
		
		aestheticNine.style.display = 'flex';
		aestheticNine.style.flexDirection = 'column';
		submitButton.innerHTML = 'SUBMIT';
		cancelButton.innerHTML = 'CANCEL';
		

		buttonDiv.appendChild(submitButton);
		buttonDiv.appendChild(cancelButton)

		aestheticImgNine.style.display = 'none';
		aestheticNine.appendChild(projectNameInput);
		aestheticNine.appendChild(nsfwDiv);
		aestheticNine.appendChild(buttonDiv);
		
		const aestheticCreationButton = document.getElementById('aestheticCreationButton');
		aestheticCreationButton.addEventListener('click', e => {
			console.log(userRef);
			console.log(projectNameInput.value);
			userRef.update({
				aestheticNine: projectNameInput.value
			});
			setTimeout(function () {
				window.location.href = 'http://127.0.0.1:8080/html/aesthetic9.html'; //will redirect to your blog page (an ex: blog.html)
		 }, 2000); //will call the function after 2 secs.
		});
}); 
}



if (fileButtonOne){
//listen for file selection
fileButtonOne.addEventListener('change', function(e) {
//get file
let file = e.target.files[0];

//create storage ref
let storageRef = storageService.ref(user.uid + userRef.aestheticOne);
let storageRefSpecific = storageRef.child(aestheticName);
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
	

if (fileButtonTwo){
		//listen for file selection
		fileButtonTwo.addEventListener('change', function(e) {
		//get file
		let file = e.target.files[0];
		
		//create storage ref
		let storageRef = storageService.ref(user.uid);
		let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonThree){
			//listen for file selection
			fileButtonThree.addEventListener('change', function(e) {
			//get file
			let file = e.target.files[0];
			
			//create storage ref
			let storageRef = storageService.ref(user.uid);
			let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonFour){
				//listen for file selection
				fileButtonFour.addEventListener('change', function(e) {
				//get file
				let file = e.target.files[0];
				
				//create storage ref
				let storageRef = storageService.ref(user.uid);
				let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonFive){
					//listen for file selection
					fileButtonFive.addEventListener('change', function(e) {
					//get file
					let file = e.target.files[0];
					
					//create storage ref
					let storageRef = storageService.ref(user.uid);
					let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonSix){
						//listen for file selection
						fileButtonSix.addEventListener('change', function(e) {
						//get file
						let file = e.target.files[0];
						
						//create storage ref
						let storageRef = storageService.ref(user.uid);
						let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonSeven){
							//listen for file selection
							fileButtonSeven.addEventListener('change', function(e) {
							//get file
							let file = e.target.files[0];
							
							//create storage ref
							let storageRef = storageService.ref(user.uid);
							let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonEight){
								//listen for file selection
								fileButtonEight.addEventListener('change', function(e) {
								//get file
								let file = e.target.files[0];
								
								//create storage ref
								let storageRef = storageService.ref(user.uid);
								let storageRefSpecific = storageRef.child(aestheticName);
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

if (fileButtonNine){
									//listen for file selection
									fileButtonNine.addEventListener('change', function(e) {
									//get file
									let file = e.target.files[0];
									
									//create storage ref
									let storageRef = storageService.ref(user.uid);
									let storageRefSpecific = storageRef.child(aestheticName);
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
	//window.location.href = ('http://127.0.0.1:8080')
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
