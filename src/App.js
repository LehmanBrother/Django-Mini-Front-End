import React, { Component } from 'react';
import './App.css';
import MovieContainer from './MovieContainer';
import Login from './Login';
import Header from './Header';
import Registration from './Registration';
import getCookie from 'js-cookie';
import { Route, Switch } from 'react-router-dom';

const My404 = () => {
  return (
    <div>
      You're lost, will you even be found?
    </div>
    )
}


class App extends Component {
  componentDidMount(){
    this.getToken();
  }

  logOut = async (e) => {
    e.preventDefault();
    console.log('logout called');
    const csrfCookie = getCookie('csrftoken');
    const loginResponse = await fetch('http://localhost:8000/users/logout/', {
      method: 'get',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json',
      }
    })
    console.log(loginResponse, '<--loginresponse');
    const parsedResponse = await loginResponse.json();
    if(parsedResponse.data === 'logout successful'){
      console.log('successful logout');
      // console.log(this.props.history.push('/'), 'props');
      console.log('<--props.history');
    } else {
      console.log(parsedResponse.error);
    }
  }

  getToken = async () => {
    const token = await fetch('http://localhost:8000/users/getToken/', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const tokenResponse = token.json();
    return tokenResponse;
  }
  render() {
    return (
      <div className="App">
        <Header logOut={this.logOut}/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Registration}/>
          <Route exact path="/movies" component={MovieContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
