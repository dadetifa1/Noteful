import React from 'react'
import Header from './Header'

class Main extends React.Component{
    render(){
        const aviableNote = this.props.dataStore.notes.map((note, index) => {
                            
                            return(<li key={index}> {note.name}, { new Date(note.modified).toLocaleString()} </li>);

        });
        const folderList = this.props.dataStore.folders.map(folder => {
            return (
                <li key={folder.id}> {folder.name}</li>
                );
        });
            return (
            <div>
                <header>
                    <Header />
                </header>
                <section className="main">
                    <ul>
                        {aviableNote}
                    </ul>
                </section>
                <section className="sidebar">
                    <ul>
                        {folderList}
                    </ul>
                </section>
            </div>
        );
    }
}

export default Main;