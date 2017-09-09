import React from 'react';
import Geosuggest from 'react-geosuggest';
import { initAction } from '../../actions/ShelterProfileActions';

export default class extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      address: '',
      location: '',
      diaplayName: '',
      suggest: '',
      firstSuggest: '',
      error: '',
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.address !== nextState.address) {
      this._geoSuggest.update(nextState.address);
    }
  }

  change({ target }) {
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  verify() {
    return this.state.displayName && this.state.address;
  }

  submit(e) {
    e.preventDefault();
    if (this.state.suggest !== this.state.address) {
      const confirmed = false; // confirm(`You entered an invalid address. Did you mean "${this.state.firstSuggest}"?`);
      if (confirmed) {
        this.setState({ address: this.state.firstSuggest, suggest: this.state.firstSuggest});
      } else {
        alert('Please select an address from the dropdown menu');
        return;
      }
    }
    let error = '';
    if(this.verify()) {
      initAction({
        phoneNumber: this.state.phone,
        address: this.state.address,
        location: this.state.location,
        displayName: this.state.displayName,
        acctType: 'shelter',
      });
    } else if (!this.state.displayName){
      error = 'Enter a Name';
    } else if (!this.state.address){
      error = 'Enter an Address';
    }
    this.setState({ error });
  }

  render() {
    return (
      <div>
        <h1>Welcome To Hokono!</h1>
        <h3>You have successfully signed up for a SHELTER account.</h3>
        <h4>
          Please fill out the form below to complete your profile.<br/>
          Don't worry, you can edit this information at anytime from your profile page.
        </h4>
        <form
          onSubmit={this.submit}
        >
          <input
            type="text"
            name="displayName"
            placeholder="Shelter's Name"
            value={this.state.displayName}
            onChange={this.change}
          />
          <Geosuggest
            ref={el => this._geoSuggest = el}
            placeholder="Address"
            onChange={val => this.setState({ address: val })}
            initialValue={this.state.address}
            autoActivateFirstSuggest={true}
            onActivateSuggest={suggest =>
              this.state.suggest !== this.state.address ?
                this.setState({ firstSuggest: suggest.label, firstLocation: suggest.location }) :
                null
            }
            onSuggestSelect={suggest =>
              this.setState({ address: suggest.label, suggest: suggest.label, location: suggest.location })
            }
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.change}
          />
          <button
            type="submit"
          />
        </form>
        <p>{ this.state.error }</p>
      </div>
    );
  }

}
