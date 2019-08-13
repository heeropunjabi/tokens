import React, { Component } from 'react'
import { Row, Divider, Form, Input, Button, Col } from 'antd';


import getWeb3 from "../utils/getWeb3";

import HotelToken from '../contracts/HotelToken.json';
import HotelTokenSale from "../contracts/HotelTokenSale.json";


class RedeemTokenFormJsx extends Component {
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

      this.setState({ web3, accounts, contract: instance, HotelToken: HotelTokenInstance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        debugger;
        const { HotelToken } = this.state;

        HotelToken.methods.redeem(parseInt(values.redeemToken)).send({
          from :this.state.accounts[0] 
        },(error, event) => {

          if (!error) {
            alert(`you have return ${values.redeemToken} token.`); return;
          }
          alert(error);
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Divider><h2>Redeem Token</h2></Divider>
        <Form onSubmit={this.handleSubmit} className="redeem-form">
          <Row type="flex">
            <Col span={16}>
              <Form.Item >
                {getFieldDecorator('redeemToken', {
                  rules: [{ required: true, message: 'Please enter value' }],
                })(
                  <Input id="redeemToken" type="text" size="large" placeholder="Redeem token" />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button type="secondary" className="btn-warning" htmlType="submit">
                  Redeem Token
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const RedeemTokenForm = Form.create({ name: 'buy_token' })(RedeemTokenFormJsx);

export default RedeemTokenForm;