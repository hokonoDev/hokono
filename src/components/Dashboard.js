import React from 'react';
import FilterBar from './Dashboard/FilterBar.js';
import Nav from './Dashboard/Nav.js';
import PetList from './Dashboard/PetList.js';
import { connect } from 'react-redux';

const Dashboard = () => {

  return (
    <div>
      Dashboard
      <Nav/>
      <PetList/>
      <FilterBar/>
    </div>
  );
};

const mapStateToProps = state => (
  {

  }
);


export default Dashboard;