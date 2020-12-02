import React from 'react'
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom'
import './Main.css'

class Main extends React.Component{
    static contextType = NotefulContext;
    state= {
        errorMessage: ''
    }

    handleClickDelete = e => {
        e.preventDefault()
        const noteID = e.target.getAttribute('id');

        fetch(`http://localhost:9090/notes/${noteID}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
          })
          .then(() => {
            this.context.deleteNote(noteID)
            this.props.history.push('/')
          })
          .catch(error => {
            this.setState({errorMessage: error.message});
          })
    }

    render(){
        const aviableNote = this.context.notes.map(matchingNotes => {
            return(
            <div className="folder_note_card" key={matchingNotes.id}>
                <div className="folder_note_title" >
                    <h3>{matchingNotes.name}</h3>
                    <span>{new Date(matchingNotes.modified).toLocaleString()}</span>
                </div>
                <button className="delete_note" id={matchingNotes.id} onClick={this.handleClickDelete}>Delete Note</button>
            </div>);
        });

        const folderList = this.context.folders.map(folder => {
            return (
                <li key={folder.id}> {folder.name}</li>
                );
        });

        return (
            <div className="flex-container">
                { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
                <section className="sidebar item">
                    <ul className="folder_list">    
                        {folderList}
                    </ul>
                    <Link to={'/AddFolder'}>
                        Add a new folder
                    </Link>
                </section>
                <section className="main item item-bg">
                    {aviableNote}
                    <Link to={'/AddNote'} className="folder_new_note">
                        Add a new note
                    </Link>
                </section>
            </div>
        );
    }
}

export default Main;