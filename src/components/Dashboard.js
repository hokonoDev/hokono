import React from 'react';
import FilterBar from './Dashboard/FilterBar.js';
import Nav from './Dashboard/Nav.js';
import PetList from './Dashboard/PetList.js';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log("this is props coming in", props);
    this.state = {
      filter: this.props.petData,
    };
    this.setFilter = this.setFilter.bind(this);
    this.mostLikesData = this.mostLikesData.bind(this);
    this.leastLikesData = this.leastLikesData.bind(this);
    this.mostPopularData = this.mostPopularData.bind(this);
    this.leastPopularData = this.leastPopularData.bind(this);
    this.sortNewData = this.sortNewData.bind(this);
    this.sortOldData = this.sortOldData.bind(this);
    this.originalData = this.originalData.bind(this);
  }

//make sure i have time stamps for petData
  mostLikesData() {
    let arr = this.props.petData;
    return arr.sort((a, b)=> {
      return b.likes - a.likes;
    });
  }
  leastLikesData() {
    let arr = this.props.petData;
    return arr.sort((a, b)=> {
      return a.likes - b.likes;
    });
  }
  //todo once timestamp comes through
  mostPopularData() {
    return this.props.petData;
  }
  leastPopularData() {
    return this.props.petData;
  }
  sortNewData () {
    let arr = this.props.petData;
    return arr.sort((a,b)=> {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  sortOldData () {
    let arr = this.props.petData;
    return arr.sort((a,b)=> {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  originalData () {
    let arr = this.props.petData;
    return arr;
  }
  setFilter(input) {
    this.setState({filter: input});
  }

  render() {
    <div>
      Dashboard
      <Nav
        {...props}
        authData={props.authData}
      />
        <Route
          exact path={`${this.props.match.path}`}
          render={(renderProps)=> (<PetList petData={this.state.filter}/>)}
        />
        <Route
          exact path={`${this.props.match.path}`}
          render={(renderProps)=> (<FilterBar
            petData={this.props.petData}
            top={this.mostLikesData}
            low={this.leastLikesData}
            pop={this.mostPopularData}
            lessPop={this.leastPopularData}
            new={this.sortNewData}
            old={this.sortOldData}
            original={this.originalData}
            setFilter={this.setFilter}
          />)}
        />
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    petData: state.pets,
    authData: state.auth,
  }
};

export default connect(mapStateToProps)(Dashboard);
