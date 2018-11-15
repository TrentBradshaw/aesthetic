const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');
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
  