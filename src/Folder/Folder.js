import React from 'react'
import NotefulContext from '../NotefulContext'
import './Folder.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
const { API_SERVER_TOKEN, API_SERVER_URL  } = require('../config')

class Folder extends React.Component{
    state = {
      errorMessage: ''
    }

    static contextType = NotefulContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteID = e.target.getAttribute('id');

        fetch(`${API_SERVER_URL}/notes/${noteID}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${API_SERVER_TOKEN}`
          },
        })
          .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
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
        const selectedNotes = this.context.notes.filter(note => note.folderId === Number(this.props.id))
                                .map(matchingNotes => {
                                    return(
                                    <div className="folder_note_card" key={matchingNotes.id}>
                                        <div className="folder_note_title" >
                                            <h3>{matchingNotes.name}</h3>
                                            <span>{new Date(matchingNotes.modified).toLocaleString()}</span>
                                        </div>
                                        
                                            <button className="delete_note" id={matchingNotes.id} onClick={this.handleClickDelete}>Delete Note</button>
                                        
                                    </div>);
                                });
        const foldersList = this.context.folders.map(folder => {
            return (
            <li key={folder.id} className={folder.id === Number(this.props.id) ? "highlight": ""} >{folder.name}</li>
            );
        });
        return (
            <div className="flex-container">
                { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
                <section className="sidebar item">
                    <div className="Folder_list">
                        <Link to="">
                            Return to main page
                        </Link>
                        <ul>
                            {foldersList}
                        </ul>
                    </div>
                    <Link to={'/AddFolder'}>
                        Add a new folder
                    </Link>
                </section>
                <section className="main item item-bg">
                    {selectedNotes}
                    <Link to={'/AddNote'} className="folder_new_note">
                        Add a new note
                    </Link>
                </section>
            </div>
        );
    }
}

Folder.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default Folder;