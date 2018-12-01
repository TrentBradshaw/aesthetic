const createProject = document.getElementById('createProject');

    createProject.addEventListener('click', e => {
        let projectName = document.getElementById('projectName');
        const userRef = db.collection('users').doc(user.uid);
        userRef.update({
            aesthetic2: projectName.value
        })
        location.href = 'http://127.0.0.1:8080/profile.html';
    })



