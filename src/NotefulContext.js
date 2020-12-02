import React from 'react'

const NotefulContext = React.createContext({
        folders: [],
        notes: [],
        deleteNote: () => {},
        addNewFolder: () => {},
        addNewNote: () => {}
});

export default NotefulContext;