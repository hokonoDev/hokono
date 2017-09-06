import React from 'react';
import { IfRender } from './index';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      sortDirection: props.sort ? props.sort[0] : 'Least',
      filter: props.sort ? props.sort[1] : 'createdSort',
    };
    //handles name change into searchbar
    this.handleNameChange = this.handleNameChange.bind(this);
    //handles dropdown input change
    this.handleDropFilter = this.handleDropFilter.bind(this);
    //handles sort direction button click
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
  }

  componentDidMount() {
    if (this.props.sort) {
      this.props.sortAction(this.state.filter, this.state.sortDirection, this.state.searchTerm);
    }
  }

  handleNameChange(event) {
    this.setState({searchTerm: event.target.value});
    this.props.sortAction(this.state.filter, this.state.sortDirection, event.target.value);
  }

  handleDropFilter(event) {
    this.setState({ filter: event.target.value })
    this.props.sortAction(event.target.value, this.state.sortDirection, this.state.searchTerm);
  }

  toggleSortDirection(e) {
    e.preventDefault();
    if (this.state.sortDirection === 'Least') {
      this.setState({ sortDirection: 'Most' })
      this.props.sortAction(this.state.filter, 'Most', this.state.searchTerm);
    } else {
      this.setState({ sortDirection: 'Least' })
      this.props.sortAction(this.state.filter, 'Least', this.state.searchTerm);
    }
  }

  render() {
    return (
      <div>
        <form>
          Search pets by name:
          <IfRender
            if={this.props.searchBar}
            ifTrue={() => (
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleNameChange}
              />
            )}
          />
          Sort:
          <button
            onClick={this.toggleSortDirection}
          >{this.state.sortDirection}</button>
          <select
            onChange={this.handleDropFilter}
            value={this.state.filter}
          >
            <option
              value="likeSort"
            >likes</option>
            <option
              value="trendSort"
            >Trending</option>
            <option
              value="popularSort"
            >Popular</option>
            <option
              value="createdSort"
            >Recent</option>
            <option
              value="distanceSort"
            >Distance</option>
          </select>
        </form>
      </div>
    );
  }
}

export default FilterBar;
