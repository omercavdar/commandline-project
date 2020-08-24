const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNote = notes.find((note) => note.title === title)

    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else {
        console.log(chalk.red.inverse('Duplicated title error'));
    }

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter((note) => note.title !== title);
    if(notes.length !== newNotes.length) {
        saveNotes(newNotes);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('Title not found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Your notes:"));
    notes.forEach((note) => {
        console.log(chalk.green.inverse(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes();

    const foundedNote = notes.find((note) => note.title === title)
    if(foundedNote) {
        console.log(chalk.green.inverse(foundedNote.title));
        console.log(foundedNote.body);
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
} 

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}