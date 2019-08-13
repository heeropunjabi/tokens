import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import Home from './components/Home';
import Token from './components/Token';

import 'antd/dist/antd.css'
import "./App.css";

class App extends Component {


  render () {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Token} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
