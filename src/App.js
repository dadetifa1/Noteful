import './App.css';
import React from 'react'
import { Route } from 'react-router-dom'
import Main from './Mainpage/Main'
import Folder from './Folder/Folder'
import Note from './Note/Note'
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import NotefulError from './NotefulError/NotefulError'
import Header from './Header/Header'

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }


  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  AddNewFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  AddNewNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  render () {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addNewFolder: this.AddNewFolder,
      addNewNote: this.AddNewNote
    }

    return(
      <div className="App">
        <header>
                    <Header />
        </header>
        <main>
          <section className="MainApp">
          <NotefulContext.Provider value={contextValue}>
          <Route exact 
            path='/' 
            component={Main} />
          <NotefulError>
            <Route exact 
              path='/AddFolder' 
              component={AddFolder} />
          </NotefulError>
          <NotefulError>
            <Route exact 
              path='/AddNote' 
              component={AddNote} />  
          </NotefulError>          
          <Route  
            path='/folder/:id' 
            render={({match, history}) =>
              <Folder
                id={match.params.id}
                history={history}
            />} 
          />
          <Route  
          path='/note/:id' 
          render={({match, history}) =>
            <Note
              id={match.params.id}
              history={history}
          />} />
        </NotefulContext.Provider>     
          </section>
        </main>




























        
      </div>
    )
  };
}

export default App;
