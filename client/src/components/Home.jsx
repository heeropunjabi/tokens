import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <h1>Hotel Tokens</h1>
        <div className="action__btn">
          <Link to="/publish" className="ant-btn ant-btn-primary ant-btn-lg">Publish Tokens</Link>
          <Link to="/buy" className="ant-btn ant-btn-primary ant-btn-lg">Buy Tokens</Link>
        </div>
      </Fragment>
    )
  }
}
