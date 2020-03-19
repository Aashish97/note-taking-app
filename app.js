const chalk = require('chalk')
const notes = require('./notes.js');
const yargs = require('yargs');

yargs.version('1.1.0');

//Adding a note
yargs.command({
    command: 'add',
    describe: 'Add new notes...',
    builder: {
        title: {
            describe: 'Adding not on basis of title',
            demandOption: true, //makes sure that there is title as input
            type: 'string'  //defines what type is to be passed as input
        },
        body: {
            describe: 'Adding body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNotes(argv.title, argv.body)
})

//Removing a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Removing note on basis of title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNotes(argv.title)
})

//List a note
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: () => notes.listNotes()
})

//Read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Reading a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title)
})

//parses all the above yargs documents
yargs.parse();