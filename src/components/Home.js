import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home Hokono
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/pet/pet_1">Pet 1</Link>
      <Link to="/auth">Login</Link>
    </div>
  );
}

export default Home;
