import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

class Note extends React.Component{
    render(){
        const selectedNotes = this.props.dataStore.notes
        .filter(note => note.id === this.props.id)
        .map(matchingNotes => {
            return(
            <div className="note_title" key={matchingNotes.id}>
                <h3>{matchingNotes.name}</h3>
                <span>{new Date(matchingNotes.modified).toLocaleString()}</span>
                <div className="note_content">
                    {matchingNotes.content}
                </div>
            </div>);
        });

        let folderId = this.props.dataStore.notes.find(note => note.id === this.props.id)

        const foldersList = this.props.dataStore.folders
        .filter(folder => folder.id === folderId.folderId)
        .map(folder => {
            return (
            <div key={folder.id}>
                {folder.name}
                <div>
                    <Link to="">
                        Back
                    </Link>
                </div>
            </div>
            );
        });
        return (
            <div>
                <header>
                    <Header />
                </header>
                <section className="main">
                    {selectedNotes}
                </section>
                <section className="sidebar">
                    {foldersList}
                </section>
            </div>
        );
    }
}

export default Note;