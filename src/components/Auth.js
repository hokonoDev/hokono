import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AuthNav from './Auth/AuthNav';

const Auth = (props) => {
  return (
    <Router>
      <div>
        <AuthNav {...props} />
        <Route path={`${props.match.path}/login`} component={Login}/>
        <Route path={`${props.match.path}/signup`} component={Signup}/>
      </div>
    </Router>
  );
}

export default Auth;
