import React, { Component } from 'react'
import { Row, Divider, Form, Input, Button, Col } from 'antd';

class BuyTokenFormJsx extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Divider><h2>Buy Token</h2></Divider>      
        <Form onSubmit={this.handleSubmit} className="buy-form">
          <Row type="flex">
            <Col span={16}>
              <Form.Item >
                {getFieldDecorator('buyToken', {
                  rules: [{ required: true, message: 'Please enter value' }],
                })(
                  <Input id="buyToken" type="text" size="large" placeholder="Buy Token" />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button className="btn-success" htmlType="submit">
                  Buy Token
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const BuyTokenForm = Form.create({ name: 'buy_token' })(BuyTokenFormJsx);

export default BuyTokenForm;