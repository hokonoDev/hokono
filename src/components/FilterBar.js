import React from 'react';
import { sortPetsAction } from '../actions/PetsActions';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filter: props.filter || '<.createdSort',
    };
    //handles name change into searchbar
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    //handles dropdown input change
    this.handleDropFilter = this.handleDropFilter.bind(this);
  }

  handleNameChange(event) {
    this.setState({searchTerm: event.target.value});
    sortPetsAction(this.state.filter, event.target.value);
  }

  //May change later to autofilter without submit
  handleNameSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  //
  handleDropFilter(event) {
    this.setState({ filter: event.target.value })
    sortPetsAction(event.target.value, this.state.searchTerm);
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleNameSubmit}
        >
          Filter Pet by Name doesnt work yet:
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleNameChange}
          />
          <input type="submit" value="Submit" />
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
