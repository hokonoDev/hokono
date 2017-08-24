import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FilterBar } from './index';
import { Nav } from './index';
import { PetList } from './index';
import { IfRedirect } from './index';
import { signout } from '../actions/AuthActions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

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
    return (
      <div>
        <IfRedirect
          if={this.props.auth.loggedIn}
          ifFalse="/auth/login"
        />
        <Nav
          {...this.props}
          authData={this.props.auth}
        />
        Dashboard
          <button
            onClick={() => this.props.dispatch(signout())}
          >
            Logout
          </button>
          <Route
            exact path={`${this.props.match.path}`}
            render={renderProps => (
              <FilterBar
                petData={this.props.petData}
                top={this.mostLikesData}
                low={this.leastLikesData}
                pop={this.mostPopularData}
                lessPop={this.leastPopularData}
                new={this.sortNewData}
                old={this.sortOldData}
                original={this.originalData}
                setFilter={this.setFilter}
              />
            )}
          />
          <Route
            exact path={`${this.props.match.path}`}
            render={renderProps=> (
              <PetList
                petData={this.state.filter}
              />
            )}
          />
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    petData: state.pets,
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(Dashboard);
