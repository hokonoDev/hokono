import React from 'react';
import FilterBar from './Dashboard/FilterBar.js';
import Nav from './Dashboard/Nav.js';
import PetList from './Dashboard/PetList.js';

const Dashboard = () => {

  return (
    <div>
      Dashboard
      <Nav/>
      <PetList/>
      <FilterBar/>
    </div>
  );
}


export default Dashboard;