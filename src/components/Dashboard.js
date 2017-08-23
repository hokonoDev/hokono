import React from 'react';
import FilterBar from './Dashboard/FilterBar.js';
import Nav from './Dashboard/Nav.js';
import PetList from './Dashboard/PetList.js';
import { connect } from 'react-redux';

const Dashboard = (props) => {

  const topVotedData = props.petData.sort((a, b)=> {
    return b.likes - a.likes;
  });
  const topPopularData = props.petData;
  const topNewData = props.petData.sort((a,b)=> {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <div>
      Dashboard
      <Nav/>
      <PetList petData={props.petData}/>
      <FilterBar top={topVotedData} popular={topPopularData} new={topNewData} petData={props.petData}/>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    petData: state.Pets
  }
};

export default connect(mapStateToProps)(Dashboard);