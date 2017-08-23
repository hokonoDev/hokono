import React from 'react';
import FilterBar from './Dashboard/FilterBar.js';
import Nav from './Dashboard/Nav.js';
import PetList from './Dashboard/PetList.js';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      <Nav {...props}/>
      <Route
        exact path={`${props.match.path}`}
        render={(renderProps)=> (<PetList petData={props.petData}/>)}
      />
      <Route
        exact path={`${props.match.path}`}
        render={(renderProps)=> (<FilterBar
          petData={props.petData}
          top={topVotedData}
          popular={topPopularData}
          new={topNewData}
        />)}
      />
    </div>
  );
};


const mapStateToProps = state => {
  return {
    petData: state.pets
  }
};

export default connect(mapStateToProps)(Dashboard);