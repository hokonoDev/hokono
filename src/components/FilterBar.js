import React from 'react';
import { IfRender } from './index';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filter: props.filter || '<.createdSort',
    };
    //handles name change into searchbar
    this.handleNameChange = this.handleNameChange.bind(this);
    //handles dropdown input change
    this.handleDropFilter = this.handleDropFilter.bind(this);
  }

  handleNameChange(event) {
    this.setState({searchTerm: event.target.value});
    this.props.sortAction(this.state.filter, event.target.value);
  }

  handleDropFilter(event) {
    this.setState({ filter: event.target.value })
    this.props.sortAction(event.target.value, this.state.searchTerm);
  }

  render() {
    return (
      <div>
        <form>
          Search by name:
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
          <select
            onChange={this.handleDropFilter}
            value={this.state.filter}
          >
            <option
              value=">.likeSort"
            >Most likes</option>
            <option
              value="<.likeSort"
            >Least likes</option>
            <option
              value=">.trendSort"
            >Trending</option>
            <option
              value="<.trendSort"
            >Lagging</option>
            <option
              value=">.createdSort"
            >Newest</option>
            <option
              value="<.createdSort"
            >Oldest</option>
          </select>
        </form>
      </div>
    );
  }
}

export default FilterBar;
