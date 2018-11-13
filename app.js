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
  
  const btnLogout = document.getElementById('btnLogout');
  const database = firebase.database();
  const storage = firebase.storage();
  const uploader = document.getElementById('uploader');
  const fileButton = document.getElementById('fileButton');
    btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href = ('http://127.0.0.1:8080')
});



//listen for file selection
fileButton.addEventListener('change', function(e) {
    //get file
    let file = e.target.files[0];
    
    //create storage ref
    let storageRef = storage.ref('/aesthetic_pics/' + file.name);
    console.log("storage ref " + storageRef);
    console.log("Storage ref url: " + storageRef.url);
    //upload file
    let task = storageRef.put(file);
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




















    

    

    
    
      
      
      
      
      
      
      //let displayURL =  storageService.refFromURL('gs://bucket/aesthetic_pics/' + file.name);
        //console.log(displayURL.location);

        
        
   


       
    
    
   



    
   // let storage = firebase.storage();
   // let storageReff = storage.ref();
   // let tangRef = storageReff.child('/aesthetic_pics' + file.name);
    //console.log('Before requesting download URL');
    //console.log(file.name);
    //tangRef.getDownloadURL().then(function(url) 
    //    {
       //  //   console.log('Got download URL');
      //      var test = url
        //    document.querySelector('img').src = test;
     //   }).catch(function(error) 
        
        //    switch (error.code) 
          //  {
              //  case 'storage/object_not_found':
                //    break;

             //   case 'storage/unauthorized':
                //    break;

             //   case 'storage/canceled':
                //    break;

            //    case 'storage/unknown':
             //       break;
            //
    //    });
       // console.log('After requesting download URL');
       // var test = 'firebase_url';
       // document.querySelector('img').src = test
    
