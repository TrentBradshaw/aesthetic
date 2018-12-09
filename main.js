//Connect to firebase storage, firebase database, and firebase authentication





const storageService = firebase.storage();
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();
// todo -- make each aesthetic have a unique id and make it accessible to the file uploader so it can store the files properly.
// todo -- make functions for code to eliminate scope issues
// todo -- make AestheticExists: True present in the firestore database if the project is submitted, then display
 //the submitted project in a preview where the create project div normally is

 //todo -- if doc.data().aestheticExists = true{
	// reshape the divs in profile to preview the aesthetic page
 //}

 // GRAB OBJECTS
const aestheticOneEditButton = document.createElement('button');
const aestheticTwoEditButton = document.createElement('button');
const dropDownUserNameDisplay = document.getElementById('dropdown');
const h2 = document.getElementById('h2');
const createProject = document.getElementById('createProject');
const uploader = document.getElementById('uploader');
const fileButtonOne = document.getElementById('fileButtonOne');
const fileButtonTwo = document.getElementById('fileButtonTwo');
const fileButtonThree = document.getElementById('fileButtonThree');
const fileButtonFour = document.getElementById('fileButtonFour');
const fileButtonFive = document.getElementById('fileButtonFive');
const fileButtonSix = document.getElementById('fileButtonSix');
const fileButtonSeven = document.getElementById('fileButtonSeven');
const fileButtonEight = document.getElementById('fileButtonEight');
const fileButtonNine = document.getElementById('fileButtonNine');
const aestheticOneHeader = document.getElementById('aestheticOneHeader');
const aestheticTwoHeader = document.getElementById('aestheticTwoHeader');
const usernameHeader = document.getElementById('usernameHeader');

const aestheticOneSaveButton = document.getElementById('aestheticOneSaveButton');
const aestheticTwoSaveButton = document.getElementById('aestheticTwoSaveButton');
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


//LOGIN EVENT
if (btnLogin){
	btnLogin.addEventListener('click', e => {
    	const email = txtEmail.value;
    	const password = txtPassword.value;
    
    	//Sign in
    	const promise = auth.signInWithEmailAndPassword(email,password);
		promise.catch(e => console.log(e.message));
		setTimeout(function () {
			window.location.href = 'http://127.0.0.1:8080/html/profile.html';
		}, 2000); //will call the function after 2 secs. Temporary
    });
}


//SIGN UP EVENT
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
					const userAestheticListInit = [];
					userAestheticListInit.push(true);
					db.collection('users').doc(firebaseUser.user.uid).set({
						userID: firebaseUser.user.uid,
						email: firebaseUser.user.email,
						userAestheticList : userAestheticListInit
					});
					
					btnLogout.classList.remove('hide');
					setTimeout(function () {
						window.location.href = 'http://127.0.0.1:8080/html/profile.html';
				 	}, 2000); //will call the function after 2 secs. Temporary
              	}    
			} 
	    )
	})
}

function getAestheticInfo(){
    const aesthetic = document.getElementById('aesthetic');
    const projectNameInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');
	const buttonDiv = document.createElement('div');
	const aestheticImg = document.getElementById('aestheticImg');

    //apply attributes to the buttons and input
    submitButton.setAttribute('id','aestheticCreationButton');
    cancelButton.setAttribute('id', 'aestheticCancelButton');
    buttonDiv.setAttribute('id','buttonDiv');
    projectNameInput.setAttribute('id','aestheticInput');

    // Create the nsfw slider
    const sliderDiv = document.createElement('div');
    const label = document.createElement('label');
    const checkInput = document.createElement('input');
    const span = document.createElement('span');
    const nsfwDiv = document.createElement('div');
    const nsfwHeader = document.createElement('h3');

    //create the tags div
    const tagsDiv = document.createElement('div');
    tagsDiv.setAttribute('class', 'tags-input');
    tagsDiv.setAttribute('data-name', 'tags-input')
    tagsDiv.setAttribute('id', 'tagsDiv');

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

    //change the style
    aesthetic.style.display = 'flex';
    aesthetic.style.flexDirection = 'column';
    aestheticImg.style.display = 'none';

    submitButton.innerHTML = 'SUBMIT';
    cancelButton.innerHTML = 'CANCEL';

    buttonDiv.appendChild(submitButton);
    buttonDiv.appendChild(cancelButton)


    aesthetic.appendChild(projectNameInput);
    aesthetic.appendChild(tagsDiv);
    aesthetic.appendChild(nsfwDiv);
    aesthetic.appendChild(buttonDiv);

	//todo -- fix tag system
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
                    if (filteredTag.length > 0){
                        addTag(filteredTag);
                    }
                        
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
	
		
		function removeTag (index) {
			let tag = tags[index];
			tags.splice(index, 1);
			el.removeChild(tag.element);
			refreshTags();
		}
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
		function refreshTags () {
		let tagsList = [];
		tags.forEach(function (t) {
				tagsList.push(t.text);
			});
			hiddenInput.value = tagsList.join(',');
			console.log(tagsList)
			return tagsList;
		}
		
		function filterTag (tag) {
			return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
		}

        el.appendChild(mainInput);
        el.appendChild(hiddenInput);
    });
}
function createAesthetic(){
    const aesthetic = document.createElement('div');
    const aestheticContainer = document.getElementById('aestheticContainer');
    
    const aestheticImg = document.createElement('img');
    aestheticImg.setAttribute('src', "/212203-200.png");
	aestheticImg.setAttribute('alt', 'plus sign');
	aestheticImg.setAttribute('id', 'aestheticImg');
	aesthetic.setAttribute('id', 'aesthetic');
	aesthetic.appendChild(aestheticImg);
	aestheticContainer.appendChild(aesthetic);
	
}
//todo redirect aesthetic url to be the unique time data and a random number at the end 


function manageUserInfo(user){
	
	db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().userID == user.uid){
				console.log(Date.now())
				const userDetails = doc.data();
				console.log(userDetails);
				

				let aestheticInput = document.getElementById('aestheticInput');
				let aestheticName = aestheticInput.value;
				console.log(aestheticName);
				let childDivs = document.getElementById('tagsDiv').getElementsByClassName('tag');
				let tagCount = 0;
				let tagsArray = [];
				for( i=0; i< childDivs.length; i++ ){
					tagCount +=1;
					var childDiv = childDivs[i];
					tagsArray.push(childDiv.innerText);
					console.log("tag" + tagCount + ":" + childDiv.innerText);
				}
				console.log(tagsArray);
				const userRef = db.collection('users').doc(user.uid);
				console.log(userRef)
				console.log(userRef.email);
				console.log(userDetails.userAestheticList);
				let aestheticsListArray = userDetails.userAestheticList;
				let aestheticEntry = ('aesthetic' + aestheticName + 'tags')
				aestheticsListArray.push(aestheticName);
				console.log(user.uid);
				db.collection('users').doc(user.uid).collection('aesthetics').doc(aestheticName).set({
					aestheticTags: tagsArray,
					aestheticExists: true,
					postIdFromTimeStamp: Date.now() + '-' + Math.floor((Math.random() * 1000000)),
					aestheticName: aestheticName,
					userID: user.uid
				})
				userRef.update({
					userAestheticList: aestheticsListArray,
					
				});
				db.collection('users').doc(user.uid).collection('aesthetics').get().then(snapshot => {
					snapshot.docs.forEach(doc => {
						if(doc.data().aestheticName == aestheticName){
							console.log(doc.data().userID);
							console.log(doc.data().postIdFromTimeStamp);
							const url = ("http://127.0.0.1:8080/" + 'aesthetic/' + doc.data().userID + "/" + doc.data().postIdFromTimeStamp);
							console.log(url);
							console.log(typeof url)
							window.location.href = url
						}
					})
				})
				
			}
		})
	})
	
}

//FIREBASE AUTHENTICATION STATE CHANGE
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		
		const userRef = db.collection('users').doc(user.uid);
		console.log("user: " + user);
		console.log("userRef: " + userRef)
		
		createAesthetic();
		
		aestheticImg.addEventListener('click', () =>{
			getAestheticInfo();
			const aestheticCreationButton = document.getElementById('aestheticCreationButton');
			aestheticCreationButton.addEventListener('click', ()=>{
				manageUserInfo(user);
			})
			
		})
		
		
		
		
				
		

		

		if(window.location.href == 'http://127.0.0.1:8080/html/aesthetic1.html'){
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc => {
				
				
						if (doc.data().userID == user.uid){
							if (doc.data().aestheticOneFileNames){
								//fileButtonOne.style.display = 'none';
								//aestheticOneSaveButton.style.display = 'none';
								
								for (i = 0; i < doc.data().aestheticOneFileNames.length; i++){
									const exploreRef = storageService.ref("/" + user.uid + "/" + doc.data().aestheticOne + "/" +doc.data().aestheticOneFileNames[i]);
									exploreRef.getDownloadURL().then(function(url) {
										console.log('url acquired');
										const newImg = document.createElement('img');
										
										console.log("url : " + url);
										newImg.src = url;
										let photoContainingdiv = document.getElementById('photocontainer');
										
										
										newImg.setAttribute('id', doc.data().aestheticOneFileNames[i]);
										newImg.setAttribute('height', '70%');
										
										newImg.setAttribute('width', '90%');
										photoContainingdiv.appendChild(newImg);
								})
							}
				
				
								aestheticOneEditButton.setAttribute('id', 'aestheticOneEditButton');
								aestheticOneEditButton.innerHTML = 'edit';
								aestheticOneHeader.appendChild(aestheticOneEditButton);
							}
				
				
						}
					})
				})
		}
		if(window.location.href == 'http://127.0.0.1:8080/html/aesthetic2.html'){
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
			
			
					if (doc.data().userID == user.uid){
						if (doc.data().aestheticTwoFileNames){
							//fileButtonOne.style.display = 'none';
							//aestheticOneSaveButton.style.display = 'none';
							
							for (i = 0; i < doc.data().aestheticTwoFileNames.length; i++){
								const exploreRef = storageService.ref("/" + user.uid + "/" + doc.data().aestheticTwo + "/" +doc.data().aestheticTwoFileNames[i]);
								exploreRef.getDownloadURL().then(function(url) {
									console.log('url acquired');
									const newImg = document.createElement('img');
									
									console.log("url : " + url);
									newImg.src = url;
									let photoContainingdiv = document.getElementById('photocontainer');
									
									
									newImg.setAttribute('id', doc.data().aestheticTwoFileNames[i]);
									newImg.setAttribute('height', '70%');
									
									newImg.setAttribute('width', '90%');
									photoContainingdiv.appendChild(newImg);
							})
						}
			
			
							aestheticTwoEditButton.setAttribute('id', 'aestheticOneEditButton');
							aestheticTwoEditButton.innerHTML = 'edit';
							aestheticTwoHeader.appendChild(aestheticTwoEditButton);
						}
			
			
					}
				})
			})
		}
		if(aestheticOneEditButton){
				aestheticOneEditButton.addEventListener('click', function(){
					fileButtonOne.style.display = 'inline';
					aestheticOneSaveButton.style.display = 'inline';
				})
		}
		if(aestheticTwoEditButton){
			aestheticTwoEditButton.addEventListener('click', function(){
				fileButtonTwo.style.display = 'inline';
				aestheticTwoSaveButton.style.display = 'inline';
			})
		}


		if (fileButtonOne){
				aestheticOneSaveButton.addEventListener('click', function(){
					userRef.update({
						aestheticOneFileNames: aestheticOneFileNamesArray
					})
						})
			//listen for file selection
			
			const divsContainer = document.getElementById('aestheticOneTagsContainer');
			console.log(userRef);
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc => {
				
				
						if (doc.data().userID == user.uid){
							console.log(user.uid);
							console.log(doc.data());
							const aestheticNameUpdated = doc.data().aestheticOne;
							const tagsArrayPulled = doc.data().aestheticOneTags;
							console.log(aestheticNameUpdated)
							console.log(tagsArrayPulled);
							console.log("tags array length" + tagsArrayPulled.length);
							for( i=0; i< tagsArrayPulled.length; i++ ){
								const tagSpan = document.createElement('span');
								tagSpan.innerHTML = tagsArrayPulled[i];
								divsContainer.appendChild(tagSpan);


							}


					}
					})
				})
				
				const aestheticOneFileNamesArray = [];
				fileButtonOne.addEventListener('change', function(e) {

				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc => {
					
					
						if (doc.data().userID == user.uid){
							console.log(user.uid);
							console.log(doc.data());
							const aestheticNameUpdated = doc.data().aestheticOne;
							console.log(aestheticNameUpdated)
						//get file

						let file = e.target.files[0];

				//create storage ref
				let storageRef = storageService.ref("/" + user.uid + "/" +  aestheticNameUpdated + '/' + file.name);

				//upload file
				file.name = user.uid + file.name;
				let task = storageRef.put(file);
				const filename = file.name;
				console.log(filename)
				
				
				aestheticOneFileNamesArray.push(file.name);
				console.log(aestheticOneFileNamesArray);
				console.log(file.name);
				console.log(filename);
				//const updatedAestheticOneFileNamesArray = aestheticOneFileNamesArray.push(file.name);
				//console.log(updatedAestheticOneFileNamesArray.item);
				//userRef.update({
				//aestheticOneFileNames: updatedAestheticOneFileNamesArray
				//})

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
				div.setAttribute('style', 'text-align: center')
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




						}
							
					});
				});

				})
		}	


		if (fileButtonTwo){
			console.log("filebuttonTwo")
			aestheticTwoSaveButton.addEventListener('click', function(){
				userRef.update({
					aestheticTwoFileNames: aestheticTwoFileNamesArray
				})
					})
		//listen for file selection
		const divsContainer = document.getElementById('aestheticTwoTagsContainer');
		console.log(userRef);
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
			
			
					if (doc.data().userID == user.uid){
						console.log(user.uid);
						console.log(doc.data());
						const aestheticNameUpdated = doc.data().aestheticTwo;
						const tagsArrayPulled = doc.data().aestheticTwoTags;
						console.log(aestheticNameUpdated)
						console.log(tagsArrayPulled);
						
						for( i=0; i< tagsArrayPulled.length; i++ ){
							const tagSpan = document.createElement('span');
							tagSpan.innerHTML = tagsArrayPulled[i];
							divsContainer.appendChild(tagSpan);


						}


				}
				})
			})
			
			const aestheticTwoFileNamesArray = [];
			fileButtonTwo.addEventListener('change', function(e) {

			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
				
				
					if (doc.data().userID == user.uid){
						console.log(user.uid);
						console.log(doc.data());
						const aestheticNameUpdated = doc.data().aestheticTwo;
						console.log(aestheticNameUpdated)
					//get file

					let file = e.target.files[0];

			//create storage ref
			let storageRef = storageService.ref("/" + user.uid + "/" +  aestheticNameUpdated + '/' + file.name);

			//upload file
			file.name = user.uid + file.name;
			let task = storageRef.put(file);
			const filename = file.name;
			console.log(filename)
			
			
			aestheticTwoFileNamesArray.push(file.name);
			console.log(aestheticTwoFileNamesArray);
			console.log(file.name);
			console.log(filename);
			//const updatedAestheticOneFileNamesArray = aestheticOneFileNamesArray.push(file.name);
			//console.log(updatedAestheticOneFileNamesArray.item);
			//userRef.update({
			//aestheticOneFileNames: updatedAestheticOneFileNamesArray
			//})

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
			div.setAttribute('style', 'text-align: center')
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




					}
						
				});
			});

			})
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
	
		}else{
		console.log('user not signed in');
		}



	
	if(btnLogout){
	btnLogout.addEventListener('click', e => {
	auth.signOut();
	console.log("Signed Out");
	//window.location.href = ('http://127.0.0.1:8080')
		});
	}







	//var projectDbRef = db.collection('projects').doc.



	// EXPLORE

	//console.log(exploreRef);
	//for(item in exploreRef){
	//	const exploreDiv = document.createElement('div');
	//	const imgPreviewer = document.createElement('img');
	//	console.log(exploreRef)
		
		//exploreDiv.appendChild(imgPreviewer);
		//.getDownloadURL().then(function(url) {
		//console.log('url acquired');
		//console.log("url : " + url);
		//imgPreviewer.src = url;
	//});
	//};
})
//get '/user/:username' run 
//{
    //var user = db.getUserByUsername(captureFromRoute.get('username'));
   // var userTemplate = template.get('usertemplate');
    //     userTemplate.populateWith(user.info());
       //  return userTemplate
//}
