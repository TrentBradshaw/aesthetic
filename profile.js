const storageService = firebase.storage();
const storageRef = storageService.ref();
const database = firebase.database();
const auth = firebase.auth();

function createAesthetic(){
    const aesthetic = document.createElement('div');
    const aestheticContainer = document.getElementById('aestheticContainer');
    const aestheticImg = document.createElement('img');
    aestheticImg.setAttribute('src', "/212203-200.png");
    aestheticImg.setAttribute('alt', 'plus sign');
    aesthetic.setAttribute('id', 'aesthetic');
    aestheticContainer.appendChild(aesthetic);
}

function getUserInfo(user){
    db.collection('users').get().then(snapshot =>{
        if (doc.data().userID == user.uid){
            return doc.data();
        }
    })
}
function getAestheticInfo(){
    const aesthetic = document.getElementById('aesthetic');
    const projectNameInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const buttonDiv = document.createElement('div');

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
    
        el.appendChild(mainInput);
        el.appendChild(hiddenInput);
    });
}

function postAestheticInfo(){
    
}