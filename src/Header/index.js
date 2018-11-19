import React from 'react';
import { Header, Button } from 'semantic-ui-react';

import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
  return (
    <Header>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li onClick={props.logOut}><Link to="/">Log Out</Link></li>
      </ul>
    </Header>
    )
}

export default HeaderApp;
