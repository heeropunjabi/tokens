import React, { Component } from 'react';
import BuyTokenForm from './BuyTokenForm';
import ReturnTokenForm from './ReturnTokenForm';
import RedeemTokenForm from './RedeemTokenForm';

export default class Token extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <BuyTokenForm />
        <ReturnTokenForm />
        <RedeemTokenForm />
        <br />
        <div>Total Token Available for Sell : </div>
        <br />
        <div>Account Address is => loading </div>
      </div>
    )
  }
}
