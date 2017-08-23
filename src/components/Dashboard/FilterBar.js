import React from 'react';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dropFilter: '',
    };
    //handles name change into searchbar
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    //handles dropdown input change
    this.handleDropFilter = this.handleDropFilter.bind(this);
  }

  handleNameChange(event) {
    this.setState({value: event.target.value});
  }

  //May change later to autofilter without submit
  handleNameSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  //
  handleDropFilter(event) {
    this.setState({dropFilter: event.target.value});
    if (event.target.value === "Most likes") {
      this.props.setFilter(this.props.top());
    } else if (event.target.value === "Least likes") {
      this.props.setFilter(this.props.low());
    } else if (event.target.value === "Least Popular") {
      this.props.setFilter(this.props.lessPop());
    } else if (event.target.value === "Popular") {
      this.props.setFilter(this.props.pop());
    } else if (event.target.value === "New") {
      this.props.setFilter(this.props.new());
    }  else if (event.target.value === "Old") {
      this.props.setFilter(this.props.old());
    }else {
      this.props.setFilter(this.props.original());
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleNameSubmit}>
          <label>
            Filter Pet by Name doesnt work yet:
            <input type="text" value={this.state.value} onChange={this.handleNameChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <select value={this.state.dropFilter} onChange={this.handleDropFilter}>
          <option value="Most likes" list="1">Most likes</option>
          <option value="Least likes" list="2">Least likes</option>
          <option value="Popular" list="3"> Popular </option>
          <option value="Least Popular" list="4">Least Popular</option>
          <option value="New" list="5"> New </option>
          <option value="Old" list="6"> Old </option>
          <option value="Original" list="7"> Original </option>
        </select>
      </div>
    );
  }
}

export default FilterBar;