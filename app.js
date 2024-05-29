// app.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-note').addEventListener('click', addNote)
    loadNotes();
});

function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    const notes = getNotesFromLocalStorage();

    notes.forEach((note, index) => {


        const noteDiv = document.createElement('div');

        const noteTextarea = document.createElement('textarea');
        noteTextarea.value = note;
        noteTextarea.className = 'hidden notesTextarea'
        noteTextarea.oninput = () => updateNoteContent(index, noteTextarea.value);


        noteDiv.appendChild(noteTextarea);

        notesList.appendChild(noteDiv);


        noteDiv.className = 'note notetext relative border border-gray-700 rounded rounded-lg  col-span-4 h-32';

        const noteDivChild = document.createElement('div');
        noteDivChild.innerHTML = note;
        noteDivChild.className = 'bg-transparent noteDivChild max-h-full overflow-helipsis  text-balance p-2  truncate  w-full text-gray-400 pt-6 m text-md'

        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');

        const eventDiv = document.createElement('div');
        eventDiv.className = 'absolute top-0 right-0 flex gap-2 p-2  eventDiv';


        deleteButton.innerHTML = '<i class="fa-solid text-gray-500 fa-trash"></i>';
        editButton.innerHTML = '<i class="fa-solid text-gray-500 fa-pen-to-square"></i>';

        deleteButton.setAttribute('data-id', index)
        deleteButton.className = 'eliminar'
        editButton.setAttribute('data-id', index)
        editButton.className = 'editar'

        eventDiv.appendChild(deleteButton);
        eventDiv.appendChild(editButton);

        noteDiv.appendChild(noteDivChild);
        noteDiv.appendChild(eventDiv);

        notesList.appendChild(noteDiv);
    });


    
        
    

    document.querySelectorAll('.eliminar').forEach(boton => {
        boton.addEventListener('click', () => {
            let id = boton.getAttribute('data-id')
            deleteNote(id);
        })
    })

    document.querySelectorAll('.editar').forEach((boton, i)=>{
        notesDivs = document.querySelectorAll('.noteDivChild')
        notesTextarea = document.querySelectorAll('.notesTextarea')
        notetext = document.querySelectorAll('.notetext')
        eventDiv = document.querySelectorAll('.eventDiv')
        boton.addEventListener('click',()=>{
            notetext[i].className = 'note notetext relative   rounded rounded-lg  col-span-4 h-32'
            notesDivs[i].className = 'hidden'
            eventDiv[i].className = 'hidden'
            notesTextarea[i].className = 'bg-transparent notesTextarea border border-dashed   outline-none rounded-lg border-gray-500 r p-2 h-full w-full text-gray-400 pt-3 text-md '

        })
    })
}

function addNote() {
    const newNoteText = document.getElementById('new-note').value;
    if (newNoteText.trim() !== '') {
        const notes = getNotesFromLocalStorage();
        notes.push(newNoteText);
        saveNotesToLocalStorage(notes);
        document.getElementById('new-note').value = '';
    loadNotes();
}
}

function deleteNote(index) {
    const notes = getNotesFromLocalStorage();
    notes.splice(index, 1);
    saveNotesToLocalStorage(notes);
    loadNotes();
}



function updateNoteContent(index, newContent) {
    const notes = getNotesFromLocalStorage();
    notes[index] = newContent;
    saveNotesToLocalStorage(notes);
}

function getNotesFromLocalStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotesToLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}
