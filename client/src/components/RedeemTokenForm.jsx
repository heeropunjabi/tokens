import React, { Component } from 'react'
import { Row, Divider, Form, Input, Button, Col } from 'antd';

class RedeemTokenFormJsx extends Component {
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