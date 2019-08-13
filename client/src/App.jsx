import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import RoomTokenSale from "./contracts/RoomTokenSale.json";
import RoomContract from "./contracts/RoomContract.json";
import getWeb3 from "./utils/getWeb3";
// import Home from './components/Home';
import PublishToken from './components/PublishToken';
import BuyToken from './components/BuyToken';
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
            <Route exact path="/publish" component={PublishToken} />
            <Route exact path="/buy" component={BuyToken} />
            <Route exact path="/token" component={Token} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
