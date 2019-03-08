import React, { Component } from 'react';
import Navbar from './Navbar';
import Board from './Board';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <div className="">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col s6"><Board /></div>
            <div className="col s6"><Board /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
