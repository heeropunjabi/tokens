import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

class BuyTokenForm extends Component {

  hotels = [
    {id: 1, name: 'hotel 1'},
    {id: 2, name: 'hotel 2'},
    {id: 3, name: 'hotel 3'}
  ]

  rooms = [
    {id: 101, name: 'room 101'},
    {id: 102, name: 'room 102'},
    {id: 103, name: 'room 103'},
    {id: 104, name: 'room 104'},
    {id: 105, name: 'room 105'},
    {id: 106, name: 'room 106'}
  ]
    
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.error('Received values of form: ', values);
      }
    });
  };

  render() {
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
                {this.hotels.map(hotel => {
                  return (<Option value={hotel.id}>{hotel.name}</Option>)
                })}             
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Select Room Name">
            {getFieldDecorator('roomName', {
                rules: [{ required: true, message: 'Please select room name!' }],
              })(
                <Select placeholder="Select Room Name" showSearch size="large">
                  {this.rooms.map(room => {
                    return (<Option value={room.id}>{room.name}</Option>)
                  })}             
                </Select>
              )}
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit" type="primary" size="large" >Buy Token</Button>
          </Form.Item>
        </Form>
        <Link to="/">Go back</Link>
      </div>
    )
  }
}

const BuyToken = Form.create({ name: 'normal_login' })(BuyTokenForm);

export default BuyToken;