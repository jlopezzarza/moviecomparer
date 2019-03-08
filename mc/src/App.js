import React, { Component } from 'react';
import Navbar from './Navbar';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Board />
      </div>
    );
  }
}

export default App;
