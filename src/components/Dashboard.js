import React from 'react';
import { Route } from 'react-router-dom';
import { signoutAction } from '../actions/AuthActions';
import {
  FilterBar,
  PetList,
  IfRedirect
} from './index';

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
          if={this.props.auth.displayName}
          ifFalse={`/auth/init`}
        />
        <IfRedirect
          if={this.props.auth.loggedIn}
          ifFalse="/auth/login"
        />
        {`${this.props.auth.displayName}'s Dashboard`}
          <button
            onClick={signoutAction}
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
                petData={this.props.petData}
              />
            )}
          />
          <pre>Auth: { JSON.stringify(this.props.auth) }</pre>
      </div>
    )
  };
};

export default Dashboard;
