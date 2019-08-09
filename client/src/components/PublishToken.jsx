import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

class PublishTokenForm extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="form-wrapper">
        <h1>Publish Tokens</h1>
        <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">

          <Form.Item label="Hotel Name">
            {getFieldDecorator('hotelName', {
              rules: [{ required: true, message: 'Please enter hotel name!' }],
            })(
              <Input id="hotelName" placeholder="Enter Hotel Name" size="large" />,
            )}
          </Form.Item>
          <Form.Item label="Number of Rooms">
            {getFieldDecorator('noOfRooms', {
              rules: [{
                type: 'number',
                message: 'Enter valid number value',
              },
              { 
                required: true, 
                message: 'Please enter number of rooms!' 
              }],
            })(
              <Input id="noOfRooms" placeholder=" Enter Number of Rooms " size="large" />,
            )}
          </Form.Item>
          <Form.Item label="Room names">
            {getFieldDecorator('roomNames', {
              rules: [{ required: true, message: 'Please enter room names!' }],
            })(
              <TextArea
                id="roomNames" placeholder="Enter Room names"
                autosize={{ minRows: 2, maxRows: 6 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" >Publish Token</Button>
          
          </Form.Item>
        </Form>
        <Link to="/" >Go back</Link>
      </Card>
    )
  }
}

const PublishToken = Form.create({ name: 'normal_login' })(PublishTokenForm);

export default PublishToken;