import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import getCookie from 'js-cookie';

class Registration extends Component {
	constructor(){
		super();

		this.state = {
			username: '',
			password: '',
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
		const registrationResponse = await fetch('http://localhost:8000/users/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'X-CSRFToken': csrfCookie,
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await registrationResponse.json();
		if(parsedResponse.data === 'registration successful'){
			console.log('successful registration');
			this.props.history.push('/movies')
		} else {
			this.changeMessage('Username already exists')
		}
	}
	render(){
		return (
			<div>
				<h4>{this.state.message}</h4>
				<h2>Register Here</h2>
				<Form onSubmit={this.handleSubmit}>
					<Label>Username</Label>
					<Form.Input type='text' name='username' onChange={this.handleChange} />
					<Label>Password</Label>
					<Form.Input type='password' name='password' onChange={this.handleChange} />
					<Button type="Submit" color="green">Register</Button>
				</Form>
			</div>
		)
	}
}

export default Registration;