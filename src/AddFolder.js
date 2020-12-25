import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types';
const { API_SERVER_TOKEN, API_SERVER_URL  } = require('./config')


class AddFolder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            folderNameInput : {
            value: ''
          },
          errorMessage: ''
        }
    }
    static contextType = NotefulContext;

    updateFolderName(folderName) {
        this.setState({folderNameInput: {value: folderName}});
    }

    AddingNewFolderToAPI (){
        this.props.history.push('/')
        fetch(`${API_SERVER_URL}/folders`, {
          method: 'POST',
          body: JSON.stringify({
                "name": this.state.folderNameInput.value
          }),
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${API_SERVER_TOKEN}`
          },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(data => {
          this.context.addNewFolder(data)
        })
        .catch(error => {
            this.setState({errorMessage: error.message});
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        this.AddingNewFolderToAPI()
    }

    render(){
        return(
            <div>
                <section className="Adding-Folder-Main">
                    <Link to="/">
                        Return to main page
                    </Link>
                { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
                    <form className="AddingFolder" onSubmit={e => this.handleSubmit(e)}>
                        <h2>Add a new folder</h2>
                        
                        <div className="form-group">
                            <label htmlFor="name">Enter *</label>
                            <input type="text" placeholder="Folder Name" className="AddingFolder__control"
                            name="foldername" id="name" onChange={e => this.updateFolderName(e.target.value)} required/>
                        </div>
                        <br />
                        <div className="AddingFolder__button__group">
                            <button type="reset" className="AddingFolder__button">
                                Cancel
                            </button>
                            <button type="submit" className="AddingFolder__button">
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

AddFolder.propTypes = {
    history: PropTypes.object.isRequired
};

export default AddFolder;