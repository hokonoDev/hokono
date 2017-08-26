import React from 'react';
import { Link } from 'react-router-dom';
import { IfRender } from './index';
import { getAllPets } from '../actions/GlobalPetsActions';
import firebase from '../firebase/index';

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
        ifTrue={() => (
          <Link to="/shelter/dashboard">Dashboard</Link>
        )}
      />
    </div>
  );
}

export default Home;
