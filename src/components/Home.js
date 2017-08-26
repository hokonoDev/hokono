import React from 'react';
import { Link } from 'react-router-dom';
import { IfRender, IfRedirect } from './index';
import { getAllPets } from '../actions/GlobalPetsActions';

const Home = (props) => {
  return (
    <div>
      Home Hokono
      <IfRender
        if={props.auth.loggedIn}
        ifFalse={()=> (
          <div>
            <Link to="/auth/login">Login</Link>
            <Link to="/allpets" onClick={getAllPets}>Continue as a Guest</Link>
          </div>
        )}
      />
      <IfRedirect
        if={props.profile.acctType && props.profile.acctType === 'user'}
        ifTrue="/user/dashboard"
      />
      <IfRedirect
        if={props.profile.acctType && props.profile.acctType === 'shelter'}
        ifTrue="/shelter/dashboard"
      />
    </div>
  );
}

export default Home;
