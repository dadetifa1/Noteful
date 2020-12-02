import React from 'react'
import NotefulContext from './NotefulContext'

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
        fetch(`http://localhost:9090/folders`, {
          method: 'POST',
          body: JSON.stringify({
                "name": this.state.folderNameInput.value
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
            // addNewFolder
          
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

export default AddFolder;