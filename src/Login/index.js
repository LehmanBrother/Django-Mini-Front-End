import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import getCookie from 'js-cookie';
import './style.css';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      message: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  changeMessage = (message) => {
    this.setState({
      message: message
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const csrfCookie = getCookie('csrftoken');
    const loginResponse = await fetch('http://localhost:8000/users/login/', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();

    if(parsedResponse.data === 'login successful'){
      // change our component
      console.log('succes login')
      this.setState({
        isLoggedIn: true
      })
      // this automatically get passed to your component as a prop
      this.props.history.push('/movies');
    } else {
      this.changeMessage('Username or password incorrect')
    }
  }
  render(){
    console.log(this.state.isLoggedIn, '<--Logged In');
    return (
      <div>
        <h4>{this.state.message}</h4>
        <Form onSubmit={this.handleSubmit}>
          <Label> Username</Label>
          <Form.Input type='text' name="username" onChange={this.handleChange} />
          <Label> Password</Label>
          <Form.Input type='password' name="password" onChange={this.handleChange} />
          <Button type="Submit" color="green">Login</Button>
        </Form>
      </div>
      
      )
  }
}

export default Login;
