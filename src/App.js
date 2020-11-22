import './App.css';
import React from 'react'
import dataStore from './dummyStore'
import { Route } from 'react-router-dom'
import Main from './Main'
import Folder from './Folder'
import Note from './Note'

class App extends React.Component {
  state = {
    dataStore
  }
  render () {
    return(
      <div className="App">
        <Route exact 
        path='/' 
        render={() =>
          <Main
            dataStore={dataStore}
        />} />
        <Route  
        path='/folder/:id' 
        render={(props) =>
          <Folder
            id={props.match.params.id}
            dataStore={dataStore}
        />} />
        <Route  
        path='/note/:id' 
        render={(props) =>
          <Note
            id={props.match.params.id}
            dataStore={dataStore}
        />} />
      </div>
    )
  };
}

export default App;
