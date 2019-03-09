import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Board from './containers/Board';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/custom.css';

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
