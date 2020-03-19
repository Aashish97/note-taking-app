const fs = require('fs');
const chalk = require('chalk');

//loads the existing notes
const loadNotes = () => {
    try{
        const bufferData = fs.readFileSync('notes.json');
        const dataJSON = bufferData.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}


//adding the new notes
const addNotes = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })

        saveNotes(notes);
        console.log(chalk.green.inverse('Notes saved successfully'));
    }else{
        console.log(chalk.red.inverse('Title already taken'));
    }

}

//saving the new notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


//removing notes
const removeNotes = (title) => {
    const notes = loadNotes();

    const noteToKeep = notes.filter(function (note) {
        return note.title !== title;
    })
    if (notes.length > noteToKeep.length){
        console.log(chalk.green.inverse('Notes removed successfully'))
        saveNotes(noteToKeep);
    }else{
        console.log(chalk.red.inverse('No matching title found'))
    }
}

//listing notes
const listNotes = () => {
    const noteList = loadNotes();
    console.log(chalk.green("Displaying all the notes..."));

    noteList ? noteList.forEach(note => { console.log(chalk.black.bold(note.title))}) : console.log(chalk.red.inverse("No list found"));

}

//reading notes
const readNotes = (title) => {
    const readNote = loadNotes();
    if (readNote) {
        const matchNote = readNote.find((note) => note.title === title);

        if (matchNote){
            console.log(chalk.green.inverse("Match found !!!"));
            console.log(chalk.inverse(matchNote.title)+ ' : ' + matchNote.body);
        }else{
            console.log(chalk.red.inverse("No matching note found!!!"));
        }
    }else{
        console.log(chalk.red.inverse("No list found"));
    }
}

module.exports = {
    addNotes,
    removeNotes,
    listNotes,
    readNotes
}