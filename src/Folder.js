import React from 'react'
import Header from './Header'

class Folder extends React.Component{
    render(){
        const selectedNotes = this.props.dataStore.notes.filter(note => note.folderId === this.props.id)
                                .map(matchingNotes => {
                                    return(
                                    <div className="note_title" key={matchingNotes.id}>
                                        {matchingNotes.name}
                                        <div className="note_content">
                                            {matchingNotes.content}
                                        </div>
                                    </div>);
                                });
        const foldersList = this.props.dataStore.folders.map(folder => {
            return (
            <li key={folder.id} className={folder.id === this.props.id ? "highlight": ""} >{folder.name}</li>
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
                <div className="Folder_list">
                    <ul>
                        {foldersList}
                    </ul>
                </div>
                </section>
            </div>
        );
    }
}

export default Folder;