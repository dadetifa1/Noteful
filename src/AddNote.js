import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types';

class AddNote extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            noteNameInput : {
                value: '',
                touched: false
            },
            noteContentInput: { 
                value : ''
            },
            noteFolderID: {
                value: ''
            },
            errorMessage: ''
        }
    }

    static contextType = NotefulContext;

    updateNoteName(noteName) {
        this.setState({noteNameInput: {value: noteName , touched: true}});
    }

    updateNoteContent(noteContent) {
        this.setState({noteContentInput: {value: noteContent}});
    }

    updateFolderId(folderId) {
        this.setState({noteFolderID: {value: folderId}});
    }

    AddingNewNoteToAPI (){
        fetch(`http://localhost:9090/notes`, {
          method: 'POST',
          body: JSON.stringify({
                "name": this.state.noteNameInput.value,
                "content": this.state.noteContentInput.value,
                "folderId": this.state.noteFolderID.value,
                "modified": new Date().toLocaleString()
          }),
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
        .then(data => {
          this.context.addNewNote(data)
          this.props.history.push('/')
        })
        .catch(error => {
         this.setState({errorMessage: error.message});
        })
    }

    validateName() {
        const name = this.state.noteNameInput.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.AddingNewNoteToAPI()
    }

    render(){
        const nameError = this.validateName();
        const folderOptions = this.context.folders.map(folder => 
                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                        );
        return(
            <div>
                <section className="AddingNotemain">
                    <Link to="/">
                        Return to main page
                    </Link>
                    { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
                    <form className="AddingNote" onSubmit={e => this.handleSubmit(e)}>
                        <h2>Add a new Note</h2>
                        
                        <div className="form-group">
                            <label htmlFor="selectFolders">Select Folder *</label>
                            <select name="selectFolders" id="selectFolders" onChange={e => this.updateFolderId(e.target.value)}>
                                <option>.....</option>
                                {folderOptions}
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="notename">Name *</label>
                            <input type="text" className="AddingNote__control"
                            name="notename" id="notename" onChange={e => this.updateNoteName(e.target.value)} />
                            {this.state.noteNameInput.touched && (<ValidationError message={nameError} />)}
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="notecontent">Content *</label>
                            <input type="text" className="AddingNote__control"
                            name="notecontent" id="notecontent" onChange={e => this.updateNoteContent(e.target.value)} />
                        </div>
                        <br />
                        <div className="AddingNote__button__group">
                            <button type="reset" className="AddingNote__button">
                                Cancel
                            </button>
                            <button type="submit" 
                            className="AddingNote__button"
                            disabled={
                                this.validateName()}>
                                Save
                            </button>
                        </div>
                    </form>
                    <div className="AddingNote__hint">* required field</div>
                </section>
                <section className="sidebar">
                </section>
            </div>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired
};


export default AddNote;