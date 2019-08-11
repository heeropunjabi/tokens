import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
import { Link } from 'react-router-dom';

import RoomTokenSale from "../contracts/RoomTokenSale.json";
import RoomContract from "../contracts/RoomContract.json";
import getWeb3 from "../utils/getWeb3";

const { TextArea } = Input;
const { Option } = Select;

class BuyTokenForm extends Component {




  state = {
    storageValue: 0, web3: null, accounts: null, contract: null, hotels: [
      { id: 1, name: 'Hotel Taj' },
    ], rooms: [
      { id: 101, name: '101' },
      { id: 102, name: '102' },
      { id: 103, name: '103' },
    ],
    totalTokens: '0',
    selectedRoom: ''
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RoomTokenSale.networks[networkId];
      const deployedNetwork2 = RoomContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RoomTokenSale.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const roomContract = new web3.eth.Contract(
        RoomContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      instance.events.Sell({}, (e, event) => {
        if (!e) {
          this.runExample();
        }
      });

      this.setState({ web3, accounts, contract: instance, roomContract }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, roomContract } = this.state;
    const address = contract._address;

    roomContract.methods.balanceOf(address).call().then((balance) => {
      this.setState({
        totalTokens: balance
      })

    })
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        debugger
        const { contract } = this.state;
        contract.methods.buyTokens(this.state.selectedRoom).send({
          from: this.state.accounts[0]
        }, (error, event) => {

          if (!error) {
            alert('you have bought 1 token.'); return;
          }
          alert('this room is already bought.')
        });
        debugger
      }
    });
  };


  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-wrapper">
        <h1>Buy Tokens</h1>
        <Form onSubmit={this.handleSubmit} className="login-form" >

          <Form.Item label="Select Hotel Name">
            {getFieldDecorator('selectHotelName', {
              rules: [{ required: true, message: 'Please select hotel name!' }],
            })(
              <Select id="selectHotelName" placeholder="Select hotel name" showSearch size="large">
                {this.state.hotels.map(hotel => {
                  return (<Option value={hotel.id} >{hotel.name}</Option>)
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Select Room Name">
            {getFieldDecorator('roomName', {
              rules: [{ required: true, message: 'Please select room name!' }],
            })(
              <Select placeholder="Select Room Name" showSearch size="large" onChange={(selected) => {
                debugger
                this.setState({
                  selectedRoom: selected + ''
                })
              }}>
                {this.state.rooms.map(room => {
                  return (<Option value={room.id}>{room.name}</Option>)
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit" type="primary" size="large" disabled={!(parseInt(this.state.totalTokens) > 0)}>Buy Token</Button>
          </Form.Item>
          <Form.Item >
            <label>Total Token Available for Sell :{this.state.totalTokens} </label>
          </Form.Item>
          <Form.Item >
            <label>Account Address is => {!this.state.accounts ? 'loading' : this.state.accounts[0]} </label>
          </Form.Item>
        </Form>
        <Link to="/">Go back</Link>
      </div >
    )
  }
}

const BuyToken = Form.create({ name: 'normal_login' })(BuyTokenForm);

export default BuyToken;