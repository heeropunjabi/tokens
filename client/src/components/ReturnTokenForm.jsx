import React, { Component } from 'react'
import { Row, Divider, Form, Input, Button, Col } from 'antd';


class ReturnTokenForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-wrapper">
        <Divider><h2>Return Token</h2></Divider>
        <Form onSubmit={this.handleSubmit} className="return-form">
          <Row type="flex">
            <Col span={16}>
              <Form.Item >
                {getFieldDecorator('returnToken', {
                  rules: [{ required: true, message: 'Please enter value' }],
                })(
                  <Input id="returnToken" type="text" size="large" placeholder="Return Token" />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Button type="secondary" className="btn-info" htmlType="submit">
                  Return Token
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div >
    )
  }
}

const ReturnToken = Form.create({ name: 'return_token' })(ReturnTokenForm);

export default ReturnToken;