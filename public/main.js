/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-undef */
'use strict';
/* eslint-disable promise/no-nesting */

// Connect to firebase storage, firebase database, and firebase authentication
const config = {
  apiKey: 'AIzaSyCjZZJ2rNAzKgkZ9ioE0UeufR3W3RSDN1Y',
  authDomain: 'walrusaesthetic.firebaseapp.com',
  databaseURL: 'https://walrusaesthetic.firebaseio.com',
  projectId: 'walrusaesthetic',
  storageBucket: 'walrusaesthetic.appspot.com',
  messagingSenderId: '264200815299',
};
// eslint-disable-next-line no-undef
firebase.initializeApp(config);                                               // initialize the configurations
// eslint-disable-next-line no-undef
const db = firebase.firestore();											  // connect to firebases firebase firestore database
db.settings({timestampsInSnapshots: true}); 								  // allow timestamps to come with the snapshots
const storageService = firebase.storage();									  // refer to the firebase storage(image hosting in this case);
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();

// todo -- add aesthetic likes
// todo -- finish letting aesthetics be deleted
// todo -- update profile page aesthetics posts when an aesthetic is created, then adjust it when it's deleted

// todo add an option for a 30s music file to accompany the aesthetic to better capture the essence trying to be conveyed

// todo -- make functions for code to eliminate scope issues
//	todo swap around the user's profile page with a timeline
//	todo move the current profile pug to their profile page
//	todo let an mp4 be hosted as a gif if the file extension is a .mp4 or .mkv
// Grab the different elements from the page where aesthetics are created
//	todo fix all casing issues and make sure to handle cases in input so there are no issues like if(username === Username) issues
const usernameHeader = document.getElementById('usernameHeader');
const uploader = document.getElementById('uploader');
const followingAnchor = document.getElementById('followingAnchor');
const followersAnchor = document.getElementById('followersAnchor');
const fileButton = document.getElementById('fileButton');

const aestheticSpecsContainer = document.getElementById('aestheticSpecsContainer');
const settingsForm = document.getElementById('settingsForm');
const currentUser = document.getElementById('profileDropDown');
const followingDiv = document.getElementById('followingDiv');
const followersDiv = document.getElementById('followersDiv');
const profilePic = document.getElementById('profilePic');
const profilePicFileButton = document.getElementById('profilePicFileButton');
const profilePicProgress = document.getElementById('profilePicProgress');
// eslint-disable-next-line max-len
const aestheticInteractionDiv = document.getElementById('aestheticInteractionDiv');
const searchBar = document.getElementById('searchBar');
const aestheticSaveButton = document.getElementById('aestheticSaveButton');
const aestheticContainer = document.getElementById('aestheticContainer');
const aesthetic = document.getElementById('createAesthetic');
const aestheticImg = document.getElementById('aestheticImg');
const homeAnchor = document.getElementById('homeAnchor');
const unfollowButton = document.getElementById('unfollowButton');

const followBtn = document.getElementById('followButton');
const searchButton = document.getElementById('searchButton');
const exploreContainer = document.getElementById('exploreContainer');

// Get elements for authentication
const signUpEmail = document.getElementById('signUpTextEmail');
const signUpPassword = document.getElementById('signUpTextPassword');
const loginButton = document.getElementById('loginButton');
const signUpButton = document.getElementById('signUpButton');
const btnLogout = document.getElementById('btnLogout');
const signUpUsername = document.getElementById('signUpUsername');
const loginEmail = document.getElementById('loginTextEmail');
const loginPassword = document.getElementById('loginTextPassword');

const profileHeader = document.getElementById('profileHeader');
// todo redirect the user to their profile using a database lookup to get their username and redirect to site/user/:username
// LOGIN EVENT
if (loginButton) {                                                                   // if login button exists on the page
	loginButton.addEventListener('click', e => {									 // listen for a click
    	const email = loginEmail.value;
    	const password = loginPassword.value;
    	// Sign in
    	const promise = auth.signInWithEmailAndPassword(email, password);         // sign the user in witht he provided
		promise.catch(e => console.log(e.message));
		if (firebaseUser) {
			const currentUserLoggedIn = db.collection('users').doc(firebaseUser.user.uid).username;
			setTimeout(() => {
				window.location.href = 'https://walrusaesthetic.firebaseapp.com/user/'  + currentUserLoggedIn;  // redirect to the signed in user's profile
			}, 500); // will call the function after .5 secs. Temporary
		}
	});
}

// SIGN UP EVENT
if (signUpButton) {                                                                  // if sign up button exists on the page
	// add signup event
	signUpButton.addEventListener('click', e => {                                    // listen for clicks on the sign up button
		e.preventDefault();														  // prevent the default behavior
		const email = signUpEmail.value;
		const password = signUpUsername.value;
		const userUsername = signUpUsername.value;
		// Sign up
  		auth.createUserWithEmailAndPassword(email, password).then((firebaseUser)=>{   // create a new user with the email and password provided
			// if successful
			if (firebaseUser) {
				console.log(firebaseUser);
				// initialize values in storage
				db.collection('users').doc(firebaseUser.user.uid).set({ // enter the user in the database with a userID, email, initialization for aesthetic list and username
					userID: firebaseUser.user.uid,
					email: firebaseUser.user.email,
					userAestheticList: [true],
					username: userUsername,
					followers: 0,
					following: 0,
					aestheticPosts: 0,
					followersArray: [true],
					followingArray: [true],
					twitterUrl: 'Please Enter our URL',
					instagramUrl: 'Please Enter our URL',
					redditUrl: 'Please Enter our URL',
					youtubeUrl: 'Please Enter our URL',
					facebookUrl: 'Please Enter our URL',
					profilePic: 'https://walrusaesthetic.firebaseapp.com/default-profile-pic-png-8.png',
				});
			} return true;
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// console.log(errorMessage, errorCode)
		});
		setTimeout(() => {
			window.location.href = 'https://walrusaesthetic.firebaseapp.com/user/' + userUsername;
		}, 500);
	});
}
// this function fires when a user is creating a new aesthetic and grabs all of the information about it

// FIREBASE AUTHENTICATION STATE CHANGE
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		function populateProfileInfo() {
			const lowerUsername = usernameHeader.innerHTML.toLowerCase();
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username === lowerUsername) {
						console.log(doc.data());
						const twitterAnchor = document.getElementById('twitterAnchor');
						twitterAnchor.setAttribute('target', '_blank');
						const redditAnchor = document.getElementById('redditAnchor');
						redditAnchor.setAttribute('target', '_blank');
						const instagramAnchor = document.getElementById('instagramAnchor');
						instagramAnchor.setAttribute('target', '_blank');
						const youtubeAnchor = document.getElementById('youtubeAnchor');
						youtubeAnchor.setAttribute('target', '_blank');
						const facebookAnchor = document.getElementById('facebookAnchor');
						facebookAnchor.setAttribute('target', '_blank');
						if (doc.data().twitterUrl !== 'Please Enter our URL') {
							console.log(doc.data().twitterUrl);
							twitterAnchor.setAttribute('href', doc.data().twitterUrl);
						}
						if (doc.data().instagramUrl !== 'Please Enter our URL') {
							instagramAnchor.setAttribute('href', doc.data().instagramUrl);
						}
						if (doc.data().facebookUrl !== 'Please Enter our URL') {
							facebookAnchor.setAttribute('href', doc.data().facebookUrl);
						}
						if (doc.data().youtubeUrl !== 'Please Enter our URL') {
							youtubeAnchor.setAttribute('href', doc.data().youtubeUrl);
						}
						if (doc.data().redditUrl !== 'Please Enter our URL') {
							redditAnchor.setAttribute('href', doc.data().redditUrl);
						}
					}
				});
			});
		}
		function loadProfileAestheticPreview() {
			// create and add the previews for a user's aesthetics on their profile with the aestheticname, url, and a preview picture
			const aestheticPreviewContainer = document.createElement('div');
			const profileBody = document.getElementById('profileBody');  // get the body of the profile
			aestheticPreviewContainer.setAttribute('id', 'aestheticPreviewContainer');
			profileBody.appendChild(aestheticPreviewContainer); // append the div to the body
			// TODO : IF USER.USERID = THIS PAGE'S OWNER'S USER ID -> ALLOW EDITING OF THE PAGE
			console.log(usernameHeader.innerHTML.toLowerCase());
			console.log('userpage');
			db.collection('users').get().then(snapshot => {                                                   // cycle through documents in the 'users' database
				snapshot.docs.forEach(doc => {
					let documentUsername = doc.data().username.toLowerCase();
					let lowerUsername = usernameHeader.innerHTML.toLowerCase();
					const followersNumb = document.getElementById('followersNumb');
					const followingNumb = document.getElementById('followingNumb');
					if (documentUsername === lowerUsername) {                                  // if the document's username value is equal to the username on the page
						console.log(doc.data());
						followersNumb.innerHTML = doc.data().followers;
						followingNumb.innerHTML = doc.data().following;
						const profileUserId = doc.data().userID;                                                // then the userID value of that document belongs to the page owner
						const profileAestheticsToLoad = doc.data().userAestheticList;                           // grab the owner's list of aesthetics
						console.log(profileAestheticsToLoad);
						console.log('help');
						console.log(lowerUsername);
						console.log('yeet');
						populateProfileInfo();
						// eslint-disable-next-line promise/no-nesting
						let i;
						for (i = 1; i < profileAestheticsToLoad.length; i++) {             // loop through them(except for the first one as it has an init value of true)
							console.log(profileAestheticsToLoad.length);										// 4
							let currentAesthetic = profileAestheticsToLoad[i];  // aestheticfullishtest            //current aesthetic is equal to the current aesthetic in the loop
							const profileAestheticDiv = document.createElement('div');                          // create a div
							const profileAestheticText = document.createElement('h3');
							profileAestheticText.setAttribute('class', 'profileAestheticPreviewText');                      // create an h3
							const aestheticAnchor = document.createElement('a'); 		                        // create an anchor for redirect
							profileAestheticDiv.setAttribute('class', 'aestheticProfilePreview');                // give the div a class for styling
							profileAestheticText.innerHTML = currentAesthetic;                                  // make the h3's match the current aesthetic name in the cycle
							console.log(currentAesthetic);												        // aestheticfullishtest
							console.log(profileUserId);
							aestheticAnchor.appendChild(profileAestheticText);                                  // append the h3 to the anchor element
							profileAestheticDiv.appendChild(aestheticAnchor);                                   // append the anchor element to the div
							aestheticPreviewContainer.appendChild(profileAestheticDiv);

							db.collection('users').doc(profileUserId).collection('aesthetics').get().then(snapshot => { // cycle throught the aesthetics collection
								snapshot.docs.forEach(doc => {
									console.log(doc.data());
									if (doc.data().aestheticName === currentAesthetic) {  // if the name of the document's aestheticName value is equal to the current aesthetic
										let storageRefForPreview = storageService.ref('/' + profileUserId + '/' +  currentAesthetic + '/' + doc.data().aestheticFileNames[1]);
										console.log('inside doc');
										storageRefForPreview.getDownloadURL().then((url) => {
											console.log(doc.data());
											const aestheticPreviewImg = document.createElement('img'); // create an image
											aestheticPreviewImg.setAttribute('src', url);
											aestheticPreviewImg.setAttribute('id', doc.data().aestheticFileNames[0]);
											aestheticPreviewImg.style.objectFit = 'cover';
											if (doc.data().portrait === true) {
												console.log(doc.data().portrait);
												aestheticPreviewImg.setAttribute('class', 'portraitPreviewImg');
												profileAestheticDiv.classList.add('portraitContainer');
											} else if (doc.data().landscape === true) {
												console.log(doc.data().landscape);
												aestheticPreviewImg.setAttribute('class', 'landscapePreviewImg');
												profileAestheticDiv.classList.add('landscapeContainer');
											}
											profileAestheticDiv.appendChild(aestheticPreviewImg);
											aestheticAnchor.setAttribute('href', doc.data().url);
											console.log('url acquired');
											console.log('url : ' + url);
										});
									}
								});
							}).catch((error) => {
								const errorCode = error.code;
								const errorMessage = error.message;
								// console.log(errorMessage, errorCode)
							}); console.log('outside of doc');
						}
					}
				});
				return true;
			}).catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// console.log(errorMessage, errorCode)
			});
		}
		function getAestheticInfo() {
			// populate elements
			const aesthetic = document.getElementById('createAesthetic');
			const projectNameInput = document.createElement('input');
			const submitButton = document.createElement('button');
			const cancelButton = document.createElement('button');
			const buttonDiv = document.createElement('div');
			const aestheticImg = document.getElementById('aestheticImg');
			const aestheticInfoForm = document.createElement('form');
			aestheticInfoForm.setAttribute('id', 'aestheticInfoForm');

			// apply attributes to the buttons and input
			submitButton.setAttribute('id', 'aestheticCreationButton');
			cancelButton.setAttribute('id', 'aestheticCancelButton');
			projectNameInput.setAttribute('placeholder', 'Title');
			buttonDiv.setAttribute('id', 'buttonDiv');
			projectNameInput.setAttribute('id', 'aestheticInput');

			// Create the nsfw slider
			const sliderDiv = document.createElement('div');
			const label = document.createElement('label');
			const checkInput = document.createElement('input');
			const span = document.createElement('span');
			const nsfwDiv = document.createElement('div');
			const nsfwHeader = document.createElement('h3');

			// create the tags div
			const tagsDiv = document.createElement('div');
			tagsDiv.setAttribute('class', 'tags-input');
			tagsDiv.setAttribute('data-name', 'tags-input');
			tagsDiv.setAttribute('id', 'tagsDiv');
			// create the portrait or landscape options and size options --
			// add the data to firebase in the aesthetic's info  design it so that 2 portraits take up the space of one landscape photo
			const orientationDiv = document.createElement('div');
			const portrait = document.createElement('input');
			const landscape = document.createElement('input');
			const linebreak = document.createElement('br');
			const aestheticSpecsContainer = document.createElement('div');
			const resSelection = document.createElement('select');
			const pickARes = document.createElement('option');
			const smallOption = document.createElement('option');
			const medOption = document.createElement('option');
			const largeOption = document.createElement('option');
			const portraitHeader = document.createElement('h4');
			const landscapeHeader = document.createElement('h4');
			const portraitDiv = document.createElement('div');
			const landscapeDiv = document.createElement('div');

			portraitHeader.setAttribute('class', 'resHeader');
			landscapeHeader.setAttribute('class', 'resHeader');

			orientationDiv.setAttribute('id', 'orientationContainer');

			portrait.setAttribute('type', 'radio');
			portrait.setAttribute('class', 'radio');
			portrait.setAttribute('name', 'orientation');
			portrait.setAttribute('value', 'portrait');
			portrait.setAttribute('id', 'portraitRadio');
			portraitDiv.setAttribute('id', 'portraitDiv');
			portraitDiv.setAttribute('class', 'resDivs');
			portraitHeader.innerHTML = 'Portrait';

			landscape.setAttribute('type', 'radio');
			landscape.setAttribute('class', 'radio');
			landscape.setAttribute('name', 'orientation');
			landscape.setAttribute('value', 'landscape');
			landscape.setAttribute('id', 'landscapeRadio');
			landscapeDiv.setAttribute('id', 'landscapeDiv');
			landscapeDiv.setAttribute('class', 'resDivs');
			landscapeHeader.innerHTML = 'Landscape';

			resSelection.setAttribute('id', 'resSelection');
			smallOption.setAttribute('id', 'smallOption');
			smallOption.innerHTML = 'Small';
			medOption.setAttribute('id', 'medOption');
			medOption.innerHTML = 'Medium';
			largeOption.setAttribute('id', 'largeOption');
			largeOption.innerHTML = 'Large';
			pickARes.innerHTML = 'Select a Resolution';

			resSelection.appendChild(pickARes);
			resSelection.appendChild(smallOption);
			resSelection.appendChild(medOption);
			resSelection.appendChild(largeOption);

			aestheticSpecsContainer.setAttribute('id', 'aestheticSpecsContainer');

			portraitDiv.appendChild(portrait);
			portraitDiv.appendChild(portraitHeader);

			landscapeDiv.appendChild(landscape);
			landscapeDiv.appendChild(landscapeHeader);

			orientationDiv.appendChild(portraitDiv);
			orientationDiv.appendChild(linebreak);
			orientationDiv.appendChild(landscapeDiv);

			// todo check if the nsfw slider is activated and log the appropriate value to the database
			// Apply attributes to the NSFW slider
			label.setAttribute('class', 'switch');
			checkInput.setAttribute('type', 'checkbox');
			checkInput.setAttribute('id', 'check');
			span.setAttribute('class', 'slider round');
			sliderDiv.setAttribute('id', 'sliderDiv');
			nsfwDiv.setAttribute('id', 'nsfwDiv');
			nsfwHeader.setAttribute('id', 'nsfwHeader');
			nsfwHeader.innerHTML = 'NSFW';

			// append elements to the slider div
			label.appendChild(checkInput);
			label.appendChild(span);
			sliderDiv.appendChild(label);
			nsfwDiv.appendChild(nsfwHeader);
			nsfwDiv.appendChild(sliderDiv);

			console.log(aesthetic);
			// change the style
			aesthetic.style.display = 'flex';
			aesthetic.style.flexDirection = 'column';
			aestheticImg.style.display = 'none';
			aesthetic.style.marginLeft = '7px';
			aesthetic.style.height = '800px';
			aesthetic.style.width = '95%';
			aestheticContainer.style.width = '18%';
			aestheticContainer.style.marginRight = '1%';
			nsfwDiv.style.flexDirection = 'column';

			submitButton.innerHTML = 'SUBMIT';
			cancelButton.innerHTML = 'CANCEL';

			buttonDiv.appendChild(submitButton);
			buttonDiv.appendChild(cancelButton);

			aestheticSpecsContainer.appendChild(orientationDiv);
			aestheticSpecsContainer.appendChild(resSelection);
			aestheticInfoForm.appendChild(aestheticSpecsContainer);
			aestheticInfoForm.appendChild(nsfwDiv);
			aesthetic.appendChild(projectNameInput);
			aesthetic.appendChild(tagsDiv);
			aesthetic.appendChild(aestheticInfoForm);
			aesthetic.appendChild(buttonDiv);

			// todo -- fix tag system
			[].forEach.call(document.getElementsByClassName('tags-input'), (el) => {
				// eslint-disable-next-line one-var
				let hiddenInput = document.createElement('input'),
				mainInput = document.createElement('input'),
				tags = [];
				hiddenInput.setAttribute('type', 'hidden');
				hiddenInput.setAttribute('name', el.getAttribute('data-name'));
				mainInput.setAttribute('type', 'text');
				mainInput.setAttribute('placeholder', 'Tags');
				mainInput.classList.add('main-input');
				mainInput.addEventListener('input', () => {
					let enteredTags = mainInput.value.split(',');
					if (enteredTags.length > 1) {
						enteredTags.forEach((t) => {
							let filteredTag = filterTag(t);
							if (filteredTag.length > 0) {
								addTag(filteredTag);
							}
						});
						mainInput.value = '';
					}
				});
				mainInput.addEventListener('keydown', (e) => {
					let keyCode = e.which || e.keyCode;
					if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
						removeTag(tags.length - 1);
					}
				});
				function removeTag(index) {
					let tag = tags[index];
					tags.splice(index, 1);
					el.removeChild(tag.element);
					refreshTags();
				}
				function addTag(text) {
					let tag = {
						text: text,
						element: document.createElement('span'),
					};
					tag.element.classList.add('tag');
					tag.element.textContent = tag.text;

					let closeBtn = document.createElement('span');
					closeBtn.classList.add('close');
					closeBtn.addEventListener('click', () => {
					removeTag(tags.indexOf(tag));
					});
					tag.element.appendChild(closeBtn);
					tags.push(tag);
					el.insertBefore(tag.element, mainInput);
					refreshTags();
				}
				function refreshTags() {
				let tagsList = [];
				tags.forEach((t) => {
						tagsList.push(t.text);
					});
					hiddenInput.value = tagsList.join(',');
					console.log(tagsList);
					return tagsList;
				}
				function filterTag(tag) {
					return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
				}
				el.appendChild(mainInput);
				el.appendChild(hiddenInput);
			});
		}
		function manageUserInfo(user) {
			db.collection('users').get().then(snapshot => {                                     // cycle through the 'users' collection in the database
				snapshot.docs.forEach(doc => {							                        // snapshot the documents in the 'users' collection
					if (doc.data().userID === user.uid) {				                        // if this user's ID is equal to the document's userID value
						const userDetails = doc.data();                                         // get the document that allows for selecting all values
						console.log(userDetails);
						let aestheticInput = document.getElementById('aestheticInput');         // get the name of the aesthetic that's to be processed
						let aestheticName = aestheticInput.value;								// declare aestheticName to be the name of the aesthetic
						console.log(aestheticName);
						let childDivs = document.getElementById('tagsDiv').getElementsByClassName('tag');  // grab the div that holds the tags
						let tagCount = 0;
						let tagsArray = [];
						let i;
						for (i = 0; i < childDivs.length; i++) {                                 // loop while the items in the childDivs haven't fully been parsed
							tagCount += 1;                                                        // increase the tag count by 1 for each element in the childDivs
							let childDiv = childDivs[i];                                         // isolate the element and assign it to the variable childDiv
							tagsArray.push(childDiv.innerText);                                  // push the isolated element to our initially empty array
							console.log('tag' + tagCount + ':' + childDiv.innerText);
						}
						console.log(tagsArray);
						const userRef = db.collection('users').doc(user.uid);
						console.log(userRef);
						console.log(userDetails.email);
						console.log(userDetails.userAestheticList);
						let aestheticsListArray = userDetails.userAestheticList;                // grab the array of the list of aesthetics in the document belonging to the user
						// let aestheticEntry = ('aesthetic' + aestheticName + 'tags')
						aestheticsListArray.push(aestheticName);
						const portraitStatus = document.getElementById('portraitRadio').checked;
						const landscapeStatus = document.getElementById('landscapeRadio').checked;
						const nsfwStatus = document.getElementById('check').checked;
						console.log(aestheticsListArray);                                // add the aesthetic currently being created to the list
						console.log(user.uid);
						db.collection('users').doc(user.uid).collection('aesthetics').doc(aestheticName).set({  // create the document with the aesthetic info
							aestheticTags: tagsArray,                                                           // the aestheticTags value is the collection of tags we've acrued
							aestheticExists: true,                                                              // the aestheticExists value is true so we know to look for it later
							postIdFromTimeStamp: Date.now(),
							aestheticName: aestheticName,
							userID: user.uid,
							username: userDetails.username,
							aestheticFileNames: [true],
							likes: 0,
							portrait: portraitStatus,
							landscape: landscapeStatus,
							nsfw: nsfwStatus,
							likedByArray: [true],
						});
						userRef.update({
							userAestheticList: aestheticsListArray,
							aestheticPosts: doc.data().aestheticPosts + 1,
						});
						// eslint-disable-next-line promise/no-nesting
						db.collection('users').doc(user.uid).collection('aesthetics').get().then(snapshot => {
							snapshot.docs.forEach(doc => {
								if (doc.data().aestheticName === aestheticName) {
									console.log(doc.data());
									const usernamePulled = doc.data().username;
									console.log(usernamePulled);
									console.log(doc.data().userID);
									console.log(doc.data().postIdFromTimeStamp);
									const url = ('https://walrusaesthetic.firebaseapp.com/user/' + usernamePulled + '/aesthetic/'  + doc.data().aestheticName);
									console.log(url);
									db.collection('users').doc(user.uid).collection('aesthetics').doc(aestheticName).update({
										url: url,
									});
									window.location.href = url;
								}
							});
							return true;
						}).catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							// console.log(errorMessage, errorCode)
						});
					}
				});
				return true;
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// console.log(errorMessage, errorCode)
			});
		}
		function populateSearches() {
			searchButton.addEventListener('click', () =>{
				const tagToSearch = searchBar.value;
				console.log(tagToSearch);
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc =>{
						console.log(doc.data());
						db.collection('users').doc(doc.data().userID).collection('aesthetics').get().then(snapshot => { // cycle throught the aesthetics collection
							snapshot.docs.forEach(doc => {
								console.log(doc.data());
								if (doc.data().aestheticExists === true) {
									let i;
									for (i = 0; i < doc.data().aestheticTags.length; i++) {
										console.log(doc.data().aestheticTags[0]);
										if (tagToSearch === doc.data().aestheticTags[i]) {
											console.log('Yata!');
											let exploreAestheticToLoad = doc.data().aestheticName;                       // current aesthetic is equal to the current aesthetic in the loop
											const exploreAestheticToLoadUserId = doc.data().userID;                      // grab the id of the document's owner
											const exploreAestheticDiv = document.createElement('div');                          // create a div
											const exploreAestheticText = document.createElement('h3'); 							// create an h3
											exploreAestheticText.setAttribute('class', 'exploreAestheticPreviewText');                // give the text a class for styling
											const aestheticAnchor = document.createElement('a'); 		                        // create an anchor for redirect
											exploreAestheticDiv.setAttribute('class', 'exploreAestheticPreview');                // give the div a class for styling
											exploreAestheticText.innerHTML = exploreAestheticToLoad;                                  // make the h3's match the current aesthetic name in the cycle
											console.log(exploreAestheticToLoad);												        // aestheticfullishtest
											aestheticAnchor.appendChild(exploreAestheticText);                                  // append the h3 to the anchor element
											exploreAestheticDiv.appendChild(aestheticAnchor);                                   // append the anchor element to the div
											exploreContainer.appendChild(exploreAestheticDiv);
											db.collection('users').doc(exploreAestheticToLoadUserId).collection('aesthetics').get().then(snapshot => { // cycle throught the aesthetics collection
												snapshot.docs.forEach(doc => {
													console.log(doc.data());
													if (doc.data().aestheticName === exploreAestheticToLoad) {  // if the name of the document's aestheticName value is equal to the current aesthetic
														console.log('dd1' + doc.data());
														let storageRefForExplorePreview = storageService.ref('/' + doc.data().userID + '/' +  exploreAestheticToLoad + '/' + doc.data().aestheticFileNames[1]);
														console.log('inside doc');
														storageRefForExplorePreview.getDownloadURL().then((url) => {
															const exploreAestheticPreviewImg = document.createElement('img'); // create an image
															if (doc.data().portrait === true) {
																exploreAestheticPreviewImg.setAttribute('width', '100%');
																exploreAestheticDiv.setAttribute('class', 'exploreAestheticPortraitPreview');
															}
															if (doc.data().landscape === true) {
																exploreAestheticPreviewImg.setAttribute('width', '100%');
																exploreAestheticDiv.setAttribute('class', 'exploreAestheticLandscapePreview');
															}
															exploreAestheticPreviewImg.setAttribute('src', url);
															exploreAestheticPreviewImg.setAttribute('id', doc.data().aestheticFileNames[0]);
															exploreAestheticPreviewImg.setAttribute('class', 'previewImg');
															exploreAestheticPreviewImg.style.objectFit = 'cover';
															exploreAestheticPreviewImg.setAttribute('class', 'exploreAestheticPreviewImg');
															exploreAestheticDiv.appendChild(exploreAestheticPreviewImg);
															aestheticAnchor.setAttribute('href', doc.data().url);
															console.log('url acquired');
															console.log('url : ' + url);
														});
													}
												});
											}).catch((error) => {
												const errorCode = error.code;
												const errorMessage = error.message;
												// console.log(errorMessage, errorCode)
											});
										}
									}
								}
							});
						});
					});
				});
			});
		}
		function unfollow() {
			unfollowButton.addEventListener('click', () =>{
				console.log(usernameHeader.innerHTML.toLowerCase());
				console.log('buttonclickedunfollow');
				db.collection('users').get().then(snapshot =>{
					snapshot.docs.forEach(doc =>{
						if (doc.data().username.toLowerCase() === usernameHeader.innerHTML.toLowerCase()) {
							console.log(doc.data());
							const personUnfollowing = document.getElementById('profileDropDown');
							console.log(personUnfollowing.innerHTML);
							const pageOwnerUid = doc.data().userID;
							console.log(pageOwnerUid);
							const followersArrayForManipulation = doc.data().followersArray;
							console.log(followersArrayForManipulation);
							let i;
							for (i = 0; i < followersArrayForManipulation.length; i++) {
								console.log('im in there dawg');
								console.log(followersArrayForManipulation[i]);
								console.log(usernameHeader.innerHTML.toLowerCase());
								if (followersArrayForManipulation[i] === personUnfollowing.innerHTML.toLowerCase()) {
									console.log(followersArrayForManipulation);
									followersArrayForManipulation.splice(i, 1);
									console.log(followersArrayForManipulation);
									db.collection('users').doc(pageOwnerUid).update({
										followersArray: followersArrayForManipulation,
										followers: doc.data().followers - 1,
									});
									const followersNumb = document.getElementById('followersNumb');
									followersNumb.innerHTML = doc.data().followers;
									db.collection('users').get().then(snapshot => {
										snapshot.docs.forEach(doc =>{
											if (doc.data().username.toLowerCase() === personUnfollowing.innerHTML.toLowerCase()) {
												console.log('userdoc' + doc.data());
												const followingArrayForManipulation = doc.data().followingArray;
												console.log(followingArrayForManipulation);
												let i;
												for (i = 0; i < followingArrayForManipulation.length; i++) {
													console.log(followingArrayForManipulation[i]);
													console.log(usernameHeader.innerHTML.toLowerCase());
													if (followingArrayForManipulation[i] === usernameHeader.innerHTML.toLowerCase()) {
														console.log(followingArrayForManipulation[i]);
														followingArrayForManipulation.splice(i, 1);
														db.collection('users').doc(doc.data().userID).update({
															followingArray: followingArrayForManipulation,
															following: doc.data().following - 1,
														});
													}
												}
											}
										});
									});
								}
							}
						}
					});
				followBtn.style.display = 'block';
				unfollowButton.style.display = 'none';
				});
			});
		}
		function follow() {
			console.log('followBtn');
			followBtn.addEventListener('click', () => {
				// const pageToFollowValue = pageToFollow.innerHTML.toLowerCase();
				// const userUserNameValue = userUserName.innerHTML.toLowerCase();
				db.collection('users').get().then(snapshot =>{
					snapshot.docs.forEach(doc => {
						const userUsername = document.getElementById('profileDropDown');
						if (doc.data().username.toLowerCase() === userUsername.innerHTML.toLowerCase()) {
							console.log(doc.data());
							db.collection('users').doc(doc.data().userID).update({
								followingArray: firebase.firestore.FieldValue.arrayUnion(usernameHeader.innerHTML.toLowerCase()),
								following: doc.data().following + 1,
							});
							console.log('followingAdded');
						}
					});
				});
				db.collection('users').get().then(snapshot =>{
					snapshot.docs.forEach(doc =>{
						if (doc.data().username.toLowerCase() === usernameHeader.innerHTML.toLowerCase()) {
							console.log(doc.data());
							const pageOwnerUid = doc.data().userID;
							const userUsername = document.getElementById('profileDropDown');
							console.log(doc.data().followers);
							db.collection('users').doc(pageOwnerUid).update({
								followersArray: firebase.firestore.FieldValue.arrayUnion(userUsername.innerHTML.toLowerCase()),
								followers: doc.data().followers + 1,
							});
							const followersNumb = document.getElementById('followersNumb');
							followersNumb.innerHTML = doc.data().followers;
							console.log('followerAdded');
							console.log(doc.data().followers);
						}
					});
				});
				console.log('changingInnerHTML');
				followBtn.style.display = 'none';
				unfollowButton.style.display = 'block';
				console.log('hello');
			});
		}
		function logSettings() {
			const twitterURLInput = document.getElementById('twitterURLInput');
			const instagramURLInput = document.getElementById('instagramURLInput');
			const facebookURLInput = document.getElementById('facebookURLInput');
			const redditURLInput = document.getElementById('redditURLInput');
			const youtubeURLInput = document.getElementById('youtubeURLInput');
			const nsfwContentCheck = document.getElementById('nsfwCheckbox');
			const settingsSubmitButton = document.getElementById('settingsSubmit');
			console.log(user.uid);
			settingsSubmitButton.addEventListener('click', () => {
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc =>{
						if (doc.data().userID === user.uid) {
							db.collection('users').doc(user.uid).update({
							twitterUrl: twitterURLInput.value,
							instagramUrl: instagramURLInput.value,
							facebookUrl: facebookURLInput.value,
							redditUrl: redditURLInput.value,
							youtubeUrl: youtubeURLInput.value,
						});
						}
					});
				});
			});
			if (profilePicFileButton) {
				profilePicFileButton.addEventListener('change', (e) => {
					console.log('change');
					db.collection('users').get().then(snapshot => {
						snapshot.docs.forEach(doc => {
							if (doc.data().userID === user.uid) {
								console.log('im in there dawg');
								// eslint-disable-next-line no-inner-declarations
								function progress(snapshot) {
									const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
									profilePicProgress.value = percentage;
								}
								// eslint-disable-next-line no-inner-declarations
								function error(err) {
									const errorMessage = err.message;
									const errorCode = err.code;
									// console.log(errorMessage,errorCode);
								}

								// eslint-disable-next-line no-inner-declarations
								function complete() {
									console.log('profilePicDone');

									// eslint-disable-next-line promise/no-nesting
									console.log('after url request');
									profilePicRef.getDownloadURL().then((url) => {
										db.collection('users').doc(user.uid).update({
											profilePic: url,
										});
									});
								}
								console.log(user.uid);
								console.log(doc.data());
								// const aestheticNameUpdated = doc.data().aesthetic;
								// console.log(aestheticNameUpdated)
								// get file
								let file = e.target.files[0];
								console.log(file);
								const filename = file.name;
								// create storage ref
								 let profilePicRef = storageService.ref(user.uid + '/profile_picture' + filename);

								// upload file
								 let task = profilePicRef.put(file);
								console.log(filename);

								// update progress bar
								task.on('state_changed', progress, error, complete);
								}
							});
						});
					});
			}
		}
		function listenForEdit() {
			console.log('aestheticInteractionDiv');
					const aestheticLookup = aestheticNamePassed.innerHTML;
					const ownerOfAesthetic = document.getElementById('ownerOfAesthetic');
					const owner = ownerOfAesthetic.innerHTML;
					const currentUser = document.getElementById('profileDropDown');
					db.collection('users').get().then(snapshot => {
						snapshot.docs.forEach(doc => {
							if (doc.data().username === owner) {
								if (user.uid === doc.data().userID) {
									console.log('yataa');
									const deleteButton = document.createElement('button');
									deleteButton.setAttribute('id', 'deleteButton');
									deleteButton.innerHTML = 'delete';
									const editButton = document.createElement('button');
									editButton.setAttribute('id', 'editButton');
									editButton.innerHTML = 'edit';
									const aestheticInteractionButtonDiv = document.getElementById('aestheticInteractionButtonDiv');
									const uploadAndProgress = document.getElementById('uploadAndProgress');
									aestheticInteractionButtonDiv.appendChild(editButton);
									aestheticInteractionButtonDiv.appendChild(deleteButton);
									if (editButton) {
										editButton.addEventListener('click', () => {
										console.log('dab');
										uploadAndProgress.style.display = 'block';
										});
									}
									if (deleteButton) {
										deleteButton.addEventListener('click', () => {
											if (confirm('delete Curation?')) {
												const aestheticLookup = aestheticNamePassed.innerHTML;
												const ownerOfAesthetic = document.getElementById('ownerOfAesthetic');
												const currentUser = document.getElementById('profileDropDown');
												db.collection('users').get().then(snapshot =>{ // cycle through users
													snapshot.docs.forEach(doc => {
														if (doc.data().username.toLowerCase() === ownerOfAesthetic.innerHTML.toLowerCase()) {
															if (currentUser.innerHTML.toLowerCase() === ownerOfAesthetic.innerHTML.toLowerCase()) {
																const arrayListForManipulationAndDeletion = doc.data().userAestheticList;
																const userID = doc.data().userID;
																let i;
																for (i = 0; i < arrayListForManipulationAndDeletion.length; i++) {
																	const aestheticUnderInspection = arrayListForManipulationAndDeletion[i];
																	console.log(aestheticUnderInspection);
																	if (aestheticUnderInspection === aestheticLookup) {
																		arrayListForManipulationAndDeletion.splice(i, 1);
																		db.collection('users').doc(userID).update({
																			userAestheticList: arrayListForManipulationAndDeletion,
																			aestheticPosts: doc.data().aestheticPosts - 1,
																		});
																		db.collection('users').doc(userID).collection('aesthetics').doc(aestheticLookup).delete();
																		setTimeout(() => {
																			window.location.href = 'https://walrusaesthetic.firebaseapp.com/user/' + currentUser.innerHTML;  // redirect to the signed in user's profile
																		}, 500); // will call the function after 2 secs. Temporary
																	}
																}
															}
														}
													});
												});
											} else {
												console.log('cancelled');
											}
										});
									}
								}
							}
						});
					});
		}
		function showCurrentAestheticFiles() {
			const ownerOfAesthetic = document.getElementById('ownerOfAesthetic');
			const owner = ownerOfAesthetic.innerHTML;
			const aestheticLookup = aestheticNamePassed.innerHTML;
			console.log(owner);
					// if owner === page owner create the edit button and then add the file upload and save buttons
					// console.log(db.collection('users').doc(user.uid).collection('aesthetics').doc(aestheticLookup).aestheticFileNames);
					db.collection('users').get().then(snapshot =>{ // cycle through users
						snapshot.docs.forEach(doc => {  // take a look at the documents
							console.log(doc.data());
							if (doc.data().username === owner) {  // if the document's username field is equal to the owner of the current page
								console.log(doc.data());
								const ownerUID = doc.data().userID;  // declare OwnerUID as the userID field of the document
								console.log(ownerUID);
								console.log(aestheticLookup.toLowerCase());
								db.collection('users').doc(ownerUID).collection('aesthetics').get().then(snapshot => {  // look through the owner's aesthetics collection
									snapshot.docs.forEach(doc => { // peek at the docs
										if (doc.data().aestheticName.toLowerCase() === aestheticLookup.toLowerCase()) { // if the aestheticName field is equal to the aesthetic name of the page
											console.log(doc.data());
											console.log(doc.data().aestheticFileNames.length);
											let i;
											for (i = 1; i < doc.data().aestheticFileNames.length; i++) {  // loop through the files in the aestheticfilenames field
												console.log('inside the loop');

												const storageRefForLoad = storageService.ref('/' + ownerUID + '/' +  aestheticLookup + '/' + doc.data().aestheticFileNames[i]);  // create a reference to the img in storage
												console.log(storageRefForLoad);
												let currentFileName = doc.data().aestheticFileNames[i];  // store the name of the image
												// eslint-disable-next-line promise/no-nesting
												// eslint-disable-next-line no-loop-func
												storageRefForLoad.getDownloadURL().then((url) => {  // take a look at the image we're referencing and get it's url
												const photoDiv = document.getElementById('photoContainerTwo');  // grab the div that holds the image
												const permImgContainer = document.createElement('img'); // create an image
												const photoHolder = document.createElement('div');

												photoDiv.setAttribute('style', 'text-align: center');
												permImgContainer.setAttribute('id', currentFileName);  // set the id of the image to the file name of the image in storage
												permImgContainer.setAttribute('height', '70%');
												console.log(doc.data());
												console.log(currentFileName);
												if (doc.data().landscape === true) {  // if the aesthetic has been declared as a landscape curation
													photoHolder.setAttribute('class', 'landscapeHolder');
													permImgContainer.setAttribute('width', '100%');
												} else if (doc.data().portrait === true) { // if the aesthetic has been declared as a portrait curation
												    permImgContainer.setAttribute('width', '100%');
													photoHolder.setAttribute('class', 'portraitHolder'); // set its width to 50%
												}
												console.log('url acquired');
												console.log('url : ' + url);
												permImgContainer.setAttribute('src', url);  // set the image's source as the download url we got
												photoHolder.appendChild(permImgContainer);
												photoDiv.appendChild(photoHolder);  // append the processed image to the container on the page
													return true;
												// eslint-disable-next-line no-loop-func
												}).catch((error) => {
													const errorCode = error.code;
													const errorMessage = error.message;
													// console.log(errorMessage, errorCode)
												});
											}
										}
									});
								return true;
		 }).catch((error) => {
									const errorCode = error.code;
									const errorMessage = error.message;
									// console.log(errorMessage, errorCode)
								});
							}
						});
						return ownerUID;
					}).catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						// console.log(errorMessage, errorCode)
					});
		}
		function checkIfFollowing() {
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username.toLowerCase() === usernameHeader.innerHTML.toLowerCase()) { // if page is found in database by matching the page owner's name with the document's username identifier
						const currentuser = document.getElementById('profileDropDown');                 // the current user is the one with the corresponding name in the website header
						console.log(usernameHeader.innerHTML.toLowerCase() !== currentuser.innerHTML.toLowerCase());
						if (usernameHeader.innerHTML.toLowerCase() === currentuser.innerHTML.toLowerCase()) {  // if the page owner's username is equal to the current user's username
							unfollowButton.style.display = 'none';  // hide the unfollow button
							followBtn.style.display = 'none';			// hide the follow button
						}
						if (usernameHeader.innerHTML.toLowerCase() !== currentuser.innerHTML.toLowerCase()) {  // if the profile page doesn't belong to the current user viewing the page
							console.log('im in there dawgie');
							let i;
							for (i = 0; i < doc.data().followersArray.length; i++) {  // loop through the document that belongs to the page owner
								console.log(doc.data().followersArray[i]);
								console.log(currentUser.innerHTML.toLowerCase());
								if (doc.data().followersArray[i] === currentuser.innerHTML.toLowerCase()) {  // if the currentuser is in the array of followers belonging to the profile page
									followBtn.style.display = 'none';										 // hide the follow button, as they're already following
									unfollowButton.style.display = 'block';									 // present the unfollow button to the user
								} else {																	 // if they're not following the page
									unfollowButton.style.display = 'none';									// hide the unfollow button
									followBtn.style.display = 'block';										// present the follow button to the user
								}
							}
						}
					}
				});
			});
		}
		function checkIfLiked() {
			const owner = document.getElementById('ownerOfAesthetic');
			const aestheticName = document.getElementById('aestheticNamePassed');
			const likeButton = document.getElementById('like');
			const unlikeButton = document.getElementById('unlike');
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username.toLowerCase() === owner.innerHTML.toLowerCase()) { // if page is found in database by matching the page owner's name with the document's username identifier
						const currentuser = document.getElementById('profileDropDown');                 // the current user is the one with the corresponding name in the website header
						if (owner.innerHTML.toLowerCase() === currentuser.innerHTML.toLowerCase()) {  // if the page owner's username is equal to the current user's username
							likeButton.style.display = 'none';  // hide the like button
							unlikeButton.style.display = 'none';		// hide the unlike button
							db.collection('users').doc(doc.data().userID).collection('aesthetics').get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									if (doc.data().aestheticName.toLowerCase() === aestheticName.innerHTML.toLowerCase()) {
										const likes = document.getElementById('likes');
										likes.textContent = doc.data().likes;
									}
								});
							});
						}
						if (owner.innerHTML.toLowerCase() !== currentuser.innerHTML.toLowerCase()) {  // if the profile page doesn't belong to the current user viewing the page
							console.log('im in there dawgie for likes');
							db.collection('users').doc(doc.data().userID).collection('aesthetics').get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									if (doc.data().aestheticName.toLowerCase() === aestheticName.innerHTML.toLowerCase()) {
										const arrayToCheckIfLiked = doc.data().likedByArray;
										let i;
										for (i = 0; i < arrayToCheckIfLiked.length; i++) {  // loop through the document that belongs to the page owner
											console.log(arrayToCheckIfLiked[i]);
											const currentLiker = arrayToCheckIfLiked[i];
											if (currentLiker === currentuser.innerHTML.toLowerCase()) {  // if the currentuser is in the array of followers belonging to the profile page
												likeButton.style.display = 'none';										 // hide the follow button, as they're already following
												unlikeButton.style.display = 'block';									 // present the unfollow button to the user
											} else {																	 // if they're not following the page
												unlikeButton.style.display = 'none';									// hide the unfollow button
												likeButton.style.display = 'block';										// present the follow button to the user
											}
										}
										const likes = document.getElementById('likes');
										likes.textContent = doc.data().likes;
									}
								});
							});
						}
					}
				});
			});
		}
		function logTags() {
			const divsContainer = document.getElementById('aestheticTagsContainer');
					// populate the tags container with the tags from the post
					console.log(userRef);
						db.collection('users').get().then(snapshot => {
							snapshot.docs.forEach(doc => {
								if (doc.data().userID === user.uid) {
									console.log(user.uid);
									console.log(doc.data());
									const tagsArrayPulled = doc.data().aestheticTags;
									// console.log(aestheticNameUpdated)
									// console.log(tagsArrayPulled);
									// .log("tags array length" + tagsArrayPulled.length);
									let i;
									for (i = 0; i < tagsArrayPulled.length; i++) {
										const tagSpan = document.createElement('span');
										tagSpan.innerHTML = tagsArrayPulled[i];
										divsContainer.appendChild(tagSpan);
									}
								}
							});
						return true;
						 }).catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							// console.log(errorMessage, errorCode)
						});
		}
		function checkIfProfileIsOwnedByOwner() {
			db.collection('users').get().then(snapshot =>{
				snapshot.docs.forEach(doc =>{
					if (doc.data().userID === user.uid) {
						console.log(doc.data());
						const profileDropDown = document.getElementById('profileDropDown');
						profileDropDown.innerHTML = doc.data().username;
						homeAnchor.setAttribute('href', 'https://walrusaesthetic.firebaseapp.com/user/' + doc.data().username);
						console.log(window.location.href);
						if (window.location.href === 'https://walrusaesthetic.firebaseapp.com/user/' + doc.data().username) {
							console.log('amen');
							followBtn.style.display = 'none';
						}
					}
				});
			});
		}
		function fileUploadHandler() {
			const aestheticFileNamesArray = [];
						fileButton.addEventListener('change', (e) => {
							console.log('change');
							db.collection('users').get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									if (doc.data().userID === user.uid) {
										console.log('im in there dawg');
										// eslint-disable-next-line no-inner-declarations
										function progress(snapshot) {
											const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
											uploader.value = percentage;
										}
										// eslint-disable-next-line no-inner-declarations
										function error(err) {
											const errorMessage = err.message;
											const errorCode = err.code;
											// console.log(errorMessage,errorCode);
										}

										// eslint-disable-next-line no-inner-declarations
										function complete() {
											const div = document.getElementById('photoContainer');
											div.setAttribute('style', 'text-align: center');
											const imgContainer = document.createElement('img');
											imgContainer.setAttribute('id', file.name);
											imgContainer.setAttribute('height', '70%');
											imgContainer.setAttribute('width', '90%');
											div.appendChild(imgContainer);

											// eslint-disable-next-line promise/no-nesting
											storageRef.getDownloadURL().then((url) => {
												console.log('url acquired');
												var img = document.getElementById(file.name);
												console.log('url : ' + url);
												img.src = url;
												return true;
											}).catch((error) => {
												const errorCode = error.code;
												const errorMessage = error.message;
												// console.log(errorMessage, errorCode)
											});
											console.log('after url request');
										}
										console.log(user.uid);
										console.log(doc.data());
										// const aestheticNameUpdated = doc.data().aesthetic;
										const aestheticH2Passed = document.getElementById('aestheticNamePassed');
										const aestheticNamePassed = aestheticH2Passed.innerHTML;
										console.log(aestheticNamePassed);
										// console.log(aestheticNameUpdated)
										// get file
										let file = e.target.files[0];
										console.log(file);
										const filename = file.name;
										// create storage ref
										let storageRef = storageService.ref(user.uid + '/' +  aestheticNamePassed + '/' + filename);

										// upload file
										let task = storageRef.put(file);
										console.log(filename);

										aestheticFileNamesArray.push(filename);
										console.log(aestheticFileNamesArray);
										console.log(filename);
										// const updatedAestheticOneFileNamesArray = aestheticOneFileNamesArray.push(file.name);
										// console.log(updatedAestheticOneFileNamesArray.item);
										// userRef.update({
										// aestheticOneFileNames: updatedAestheticOneFileNamesArray
										// })

										// update progress bar
										task.on('state_changed', progress, error, complete);
										console.log(file.name);
										console.log(e.target.value);
										console.log('file uploaded');
										console.log('before url request');
										console.log(storageRef);
										aestheticSaveButton.addEventListener('click', () => {
											console.log('save');
											const uploadAndProgress = document.getElementById('uploadAndProgress');
											uploadAndProgress.style.display = 'none';
											db.collection('users').doc(user.uid).collection('aesthetics').doc(aestheticNamePassed).update({
												aestheticFileNames: firebase.firestore.FieldValue.arrayUnion(file.name),
											});
										});
									}
								});
						return true;
							 }).catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							// console.log(errorMessage, errorCode)
						});
					});
		}
		function populateFollowingPageWithFollowing() {
			console.log('hello');
			const nameOfPersonFollowing = document.getElementById('nameOfPersonFollowing');
			const nameOfPersonFollowingValue = nameOfPersonFollowing.innerHTML.toLowerCase();
			console.log('name ' + nameOfPersonFollowingValue);
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username === nameOfPersonFollowingValue) {
						console.log(doc.data().followingArray);
						const arrayOfFollowing = doc.data().followingArray;
						let i;
						for (i = 1; i < arrayOfFollowing.length; i++) {
							const followingInstance = arrayOfFollowing[i];
							const followingInstanceAnchor = document.createElement('a');
							const followingInstanceHeader = document.createElement('h1');
							followingInstanceHeader.innerHTML = followingInstance;
							const followingInstanceContainer = document.createElement('div');
							db.collection('users').get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									if (doc.data().username.toLowerCase() === followingInstance.toLowerCase()) {
										const followingUrl = 'https://walrusaesthetic.firebaseapp.com/user/' + followingInstance;
										followingInstanceAnchor.setAttribute('href', followingUrl);
										if (doc.data().profilePic) {
											const followingInstanceProfilePic = document.createElement('img');
											followingInstanceProfilePic.setAttribute('id', 'followingInstanceProfilePic');
											followingInstanceProfilePic.setAttribute('src', doc.data().profilePic);
											followingInstanceContainer.appendChild(followingInstanceProfilePic);
										}
									}
								});
							});
							followingInstanceAnchor.appendChild(followingInstanceHeader);
							followingInstanceContainer.appendChild(followingInstanceAnchor);
							followingDiv.appendChild(followingInstanceContainer);
						}
					}
				});
			});
		}
		function populateFollowersPageWithFollowers() {
			console.log('hello');
			const nameOfPersonBeingFollowed = document.getElementById('nameOfPersonBeingFollowed');
			const nameOfPersonBeingFollowedValue = nameOfPersonBeingFollowed.innerHTML.toLowerCase();
			console.log('name ' + nameOfPersonBeingFollowedValue);
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username === nameOfPersonBeingFollowedValue) {
						console.log(doc.data().followersArray);
						const arrayOfFollowers = doc.data().followersArray;
						let i;
						for (i = 1; i < arrayOfFollowers.length; i++) {
							const followerInstance = arrayOfFollowers[i];
							const followerInstanceAnchor = document.createElement('a');
							const followerInstanceHeader = document.createElement('h1');
							followerInstanceHeader.innerHTML = followerInstance;
							const followerInstanceContainer = document.createElement('div');
							db.collection('users').get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									if (doc.data().username.toLowerCase() === followerInstance.toLowerCase()) {
										const followerUrl = 'https://walrusaesthetic.firebaseapp.com/user/' + followerInstance;
										followerInstanceAnchor.setAttribute('href', followerUrl);
										if (doc.data().profilePic) {
											const followerInstanceProfilePic = document.createElement('img');
											followerInstanceProfilePic.setAttribute('id', 'followerInstanceProfilePic');
											followerInstanceProfilePic.setAttribute('src', doc.data().profilePic);
											followerInstanceContainer.appendChild(followerInstanceProfilePic);
										}
									}
								});
							});
							followerInstanceAnchor.appendChild(followerInstanceHeader);
							followerInstanceContainer.appendChild(followerInstanceAnchor);
							followersDiv.appendChild(followerInstanceContainer);
						}
					}
				});
			});
		}
		function like() {
			const likeButton = document.getElementById('like');
			const unlikeButton = document.getElementById('unlike');
			likeButton.addEventListener('click', () => {
				const aestheticOwner = document.getElementById('ownerOfAesthetic');
				const thisAesthetic = document.getElementById('aestheticNamePassed');
				const liker = document.getElementById('profileDropDown');
				const likes = document.getElementById('likes');
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc =>{
						if (doc.data().username.toLowerCase() === aestheticOwner.innerHTML.toLowerCase()) {
							const ownerID = doc.data().userID;
							db.collection('users').doc(ownerID).collection('aesthetics').get().then(snapshot => { // cycle throught the aesthetics collection
								snapshot.docs.forEach(doc => {
									if (doc.data().aestheticName.toLowerCase() === thisAesthetic.innerHTML.toLowerCase()) {
										db.collection('users').doc(ownerID).collection('aesthetics').doc(thisAesthetic.innerHTML).update({
											likedByArray: firebase.firestore.FieldValue.arrayUnion(liker.innerHTML.toLowerCase()),
											likes: doc.data().likes + 1,
										});
										likes.textContent = parseInt(likes.textContent) + 1;
										unlikeButton.style.display = 'block';
										likeButton.style.display = 'none';
									}
								});
							});
						}
					});
				});
			});
		}
		function unlike() {
			const unlikeButton = document.getElementById('unlike');
			const likeButton = document.getElementById('like');
			unlikeButton.addEventListener('click', () => {
				const aestheticOwner = document.getElementById('ownerOfAesthetic');
				const thisAesthetic = document.getElementById('aestheticNamePassed');
				const unLiker = document.getElementById('profileDropDown');
				const likes = document.getElementById('likes');
				db.collection('users').get().then(snapshot => {
					snapshot.docs.forEach(doc =>{
						if (doc.data().username.toLowerCase() === aestheticOwner.innerHTML.toLowerCase()) {
							const ownerID = doc.data().userID;
							db.collection('users').doc(ownerID).collection('aesthetics').get().then(snapshot => { // cycle throught the aesthetics collection
								snapshot.docs.forEach(doc => {
									if (doc.data().aestheticName.toLowerCase() === thisAesthetic.innerHTML.toLowerCase()) {
										const likerArrayForManipulation = doc.data().likedByArray;
												console.log(likerArrayForManipulation);
												let i;
												for (i = 0; i < likerArrayForManipulation.length; i++) {
													console.log(likerArrayForManipulation[i]);
													if (likerArrayForManipulation[i] === unLiker.innerHTML.toLowerCase()) {
														console.log(likerArrayForManipulation[i]);
														likerArrayForManipulation.splice(i, 1);
														db.collection('users').doc(ownerID).collection('aesthetics').doc(thisAesthetic.innerHTML).update({
															likedByArray: likerArrayForManipulation,
															likes: doc.data().likes - 1,
														});
													}
												}
										likes.textContent = parseInt(likes.textContent) - 1;
										likeButton.style.display = 'block';
										unlikeButton.style.display = 'none';
									}
								});
							});
						}
					});
				});
			});
		}

		// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
			// Send token to your backend via HTTPS
			// ...
			// console.log(idToken);
			// const xhr = new XMLHttpRequest();
			// xhr.open('POST', 'https://walrusaesthetic.firebaseapp.com/');
			// xhr.setRequestHeader('Content-Type', 'application/json');
			// xhr.onload = function() {
			// };
			// db.collection('users').get().then(snapshot =>{
				// snapshot.docs.forEach(doc =>{
					// if (doc.data().userID === user.uid) {
					//	xhr.send(JSON.stringify({'idtoken': idToken, 'uid': user.uid, 'username': doc.data().username}));
					//	console.log('Signed in as: ' + doc.data().username);
				//	}
			//	});
		//	});
	//	}).catch(function(error) {
			// Handle error
		//  });
		const userRef = db.collection('users').doc(user.uid);
		console.log('user: ' + user);
		console.log('userRef: ' + userRef);
		if (aestheticImg) {
			aestheticImg.addEventListener('click', () =>{
				getAestheticInfo();
				const aestheticCreationButton = document.getElementById('aestheticCreationButton');
				aestheticCreationButton.addEventListener('click', ()=>{
					manageUserInfo(user);
				});
			});
		}

		if (settingsForm) {
			logSettings();
		}

		if (profileHeader) {
			checkIfProfileIsOwnedByOwner();
		}
		if (aestheticInteractionDiv) {
			// listen for file selection
			document.addEventListener('DOMContentLoaded', function(event) {
				console.log('DOM fully loaded and parsed');
			});
			const likeButton = document.getElementById('like');
			const unlikeButton = document.getElementById('unlike');
			const aestheticOwner = document.getElementById('ownerOfAesthetic');
			const thisAesthetic = document.getElementById('aestheticNamePassed');
			checkIfLiked();
			like();
			unlike();
			logTags();
			fileUploadHandler();
			listenForEdit();
			showCurrentAestheticFiles();
		}
		// todo use an equation to read the size of the monitor the person has and then read images and then resize the images for their monitor
		if (usernameHeader) { // if the username header on the profile page exists
			// todo make followers and following update in realtime
			const followingUrl = 'https://walrusaesthetic.firebaseapp.com/user/' + usernameHeader.innerHTML.toLowerCase() + '/following';
			const followersUrl = 'https://walrusaesthetic.firebaseapp.com/user/' + usernameHeader.innerHTML.toLowerCase() + '/followers';
			followingAnchor.setAttribute('href', followingUrl);
			followersAnchor.setAttribute('href', followersUrl);
			checkIfFollowing();
			if (followBtn) {
				follow();
			}
			// todo fix not updating the number of followers
			if (unfollowButton) {
				unfollow();
			}

			loadProfileAestheticPreview();
			db.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc =>{
					if (doc.data().username.toLowerCase() === usernameHeader.innerHTML.toLowerCase()) {
						const numberOfAesthetics = document.getElementById('aestheticNumb');
						profilePic.setAttribute('src', doc.data().profilePic);
						numberOfAesthetics.innerHTML = doc.data().userAestheticList.length - 1;
					}
				});
			});
		}

		if (exploreContainer) {
		populateSearches();
		}
		if (followingDiv) {
			populateFollowingPageWithFollowing();
		}
		if (followersDiv) {
			populateFollowersPageWithFollowers();
		}
	} else {
		console.log('user not signed in');
	}

	if (btnLogout) {
		btnLogout.addEventListener('click', () => {
		auth.signOut();
		console.log('Signed Out');
		setTimeout(() => {
			window.location.href = 'https://walrusaesthetic.firebaseapp.com/'; // + username;  //redirect to the signed in user's profile
		}, 500); // will call the function after 2 secs. Temporary
		});
	}
});
// todo followers/following -- when a user clicks follow on another user go into the database of their profile and make the followers value the followers value + 1
// log the username that followed the user in the followers array

