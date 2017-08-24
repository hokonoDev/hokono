import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home Hokono
      <Link to="/auth/login">Login</Link>
    </div>
  );
}

export default Home;
