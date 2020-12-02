import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import './Note.css';
import PropTypes from 'prop-types';

class Note extends React.Component{
    static contextType = NotefulContext;
    state = {
        errormessage: ""
    }

    handleClickDelete = e => {
        e.preventDefault()
        this.props.history.push('/')
        fetch(`http://localhost:9090/notes/${this.props.id}`, {
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
            this.context.deleteNote(this.props.id)
            
          })
          .catch(error => {
            this.setState({ errormessage:  error.message })
          })
     }

    render(){
        const selectedNotes = this.context.notes
        .filter(note => note.id === this.props.id)
        .map(matchingNotes => {
            return(
            <div className="noteitem_card" key={matchingNotes.id}>
                <div className="note_topic" >
                    <div className="note_name_date">
                        <h3>{matchingNotes.name}</h3>
                        <span>{new Date(matchingNotes.modified).toLocaleString()}</span>
                    </div> 
                    <button id="delete_note"
                        onClick={this.handleClickDelete}
                    >Delete Note</button>
                </div>
                <div className="note_content">
                    {matchingNotes.content}
                </div>
            </div>);
        });

        let folderId = this.context.notes.find(note => note.id === this.props.id)

        const foldersList = this.context.folders
        .filter(folder => folder.id === folderId.folderId)
        .map(folder => {
            return (
            <div key={folder.id}>
                <div>
                    <Link to="">
                        Back
                    </Link>
                </div>
                <div>
                    {folder.name}
                </div>
            </div>
            );
        });
        return (
            <div className="flex-container">
                { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
                <div className="sidebar item">
                    {foldersList}
                </div>
                <div className="main item item-bg">
                    {selectedNotes}
                </div>
            </div>
        );
    }
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default Note;