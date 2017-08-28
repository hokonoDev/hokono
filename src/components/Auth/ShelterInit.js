import React from 'react';
import { initAction } from '../../actions/ShelterProfileActions';

export default class extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      address: '',
      diaplayName: '',
      error: '',
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
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
    let error = '';
    if(this.verify()) {
      initAction({
        phoneNumber: this.state.phone,
        address: this.state.address,
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
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={this.change}
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
