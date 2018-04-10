import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cabecalho from './components/Cabecalho'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Cabecalho />
      </React.Fragment>
    );
  }
}

export default App;
