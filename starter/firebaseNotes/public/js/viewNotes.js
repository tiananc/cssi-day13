let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      googleUser = googleUserId;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderData(data);
  });
};

const renderData = (data) => {
    const destination = document.querySelector('#app');
    destination.innerHTML = "";
    for (let key in data) {
        const note = data[key];
        destination.innerHTML += createCard(note, key);
    }
};

const createCard = (note, noteId) => {
    return `<div class="column is-one-quarter">
                <div class="card"> 
                    <header class="card-header"> 
                        <p class="card-header-title"> 
                            ${note.title} 
                        </p> 
                    </header> 
                    <div class="card-content"> 
                        <div class="content">
                            ${note.text} 
                        </div>
                        <footer class="card-footer">
                              <a href="#"
                               class = "card-footer-item"
                               onclick="deleteNote('${noteId}')">
                                Delete 
                              </a>
                          <a href="#"
                               class = "card-footer-item"
                               onclick="editNote('${noteId}')">
                          Edit 
                          </a>
                          </footer>                     
                </div>
            </div>`;
};
const deleteNote = (noteId) => {
const noteToDelete = firebase.database().ref(`users/${googleUser}/${noteId}`);
noteToDelete.remove();
}
//use a "modal, similar to a popup, but not!"
const editNoteModal = document.querySelector("#editNoteModal");

const editNote = (noteId) => {
   editNoteModal.classList.add('is-active');
   const noteToEdit = firebase.database().ref(`users/${googleUser}/${noteId}`);
   noteToEditRef.once('value', (snapshot) => {
       const note = snapshot.val();
        const editNoteTitleInput = document.querySelector("#editTitleText");
        const editNoteTextInput = document.querySelector("#editNoteText");
        
        editNoteTitleInput.value = note.title;

        editNoteTextInput.value = note.text;

       
   });
   

}
const closeModal = () => {
    editNoteModal.classList.remove('is-active');
}
const saveChanges = () => {

   const editNoteTitleInput = document.querySelector("#editTitleText");
   const editNoteTextInput = document.querySelector("#editNoteText");


   const saveChanges= firebase.database().ref(`users/${googleUser}/${noteId}`);

   noteToEditRef.update({
       title: title,
       text: text
   })
closeModal();
}
