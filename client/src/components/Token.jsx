import React, { Component } from 'react';
import BuyTokenForm from './BuyTokenForm';
import ReturnTokenForm from './ReturnTokenForm';
import RedeemTokenForm from './RedeemTokenForm';
import getWeb3 from "../utils/getWeb3";

import HotelToken from '../contracts/HotelToken.json';
import HotelTokenSale from "../contracts/HotelTokenSale.json";
import { Row, Col, Card } from 'antd';



export default class Token extends Component {
  constructor() {
    super();
    this.state = {
      totalTokens: 'loading',
      accounts: ['loading'],
      balance: 'loading'
    }
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HotelTokenSale.networks[networkId];

      const deployedNetwork2 = HotelToken.networks[networkId];

      // const deployedNetwork2 = HotelToken.networks[networkId];
      const instance = new web3.eth.Contract(
        HotelTokenSale.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const HotelTokenInstance = new web3.eth.Contract(
        HotelToken.abi,
        deployedNetwork2 && deployedNetwork2.address
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      instance.events.allEvents({}, (e) => {
        if (!e) {
          this.runExample();
        }
      });
      HotelTokenInstance.events.allEvents({}, (e) => {
        if (!e) {
          this.runExample();
        }
      });

      this.setState({ web3, accounts, contract: instance, HotelToken: HotelTokenInstance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract, HotelToken, accounts } = this.state;
    const address = contract._address;

    HotelToken.methods.balanceOf(accounts[0]).call().then((balance) => {
      HotelToken.methods.balanceOf(address).call().then((total) => {
        this.setState({
          totalTokens: total,
          balance,
        })
      })
    })
  };
  render () {
    return (
      <div className="form-wrapper">
        <div className="header">
          <h1>Kogx</h1>
          <p>Hotel Sale</p>
        </div>

        {/* <div className="mb-50"> 
          <Button type="danger"><b>Total Token Available for Sell : {this.state.totalTokens}</b></Button>
        </div> */}
        <Row type="flex" justify="space-around" gutter="30">
          <Col span={8}>
            <Card bordered={false}>
              <BuyTokenForm />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <ReturnTokenForm />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <RedeemTokenForm />
            </Card>
          </Col>
        </Row>
        <br />
        <div><b>Tokens in your account : {this.state.balance} </b></div>
        <br />

        <div>Account Address is => {this.state.accounts[0]} </div>
      </div>
    )
  }
}
