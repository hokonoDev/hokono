import React from 'react';
import { GoogleMap } from './index';
import { cordsFromAddress } from './lib/helpers';
import fb from 'firebase';

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      center: typeof this.props.userLocation === 'string' ? undefined : this.props.userLocation,
      markers: undefined,
    }
  }

  componentDidMount() {
    if (typeof this.props.userLocation === 'string') {
      cordsFromAddress(this.props.userLocation)
        .then(cords => {
          this.setState({ center: cords });
        });
    }

    fb.database().ref('/accounts').once('value')
      .then(snapshot => {
        const accounts = snapshot.val();
        this.setState({
          markers: Object.values(accounts).map(account => {
            return {
              position: account.location || account.address,
              title: account.displayName,
              animation: 'drop',
              onClick: () => {
                this.props.history.push(`/${account.acctType}/profile/${account.uid}`);
              },
            };
          }),
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLocation !== prevProps.userLocation) {
      if (typeof this.props.userLocation === 'string') {
        cordsFromAddress(this.props.userLocation)
          .then(cords => {
            this.setState({ center: cords });
          });
      }
    }
  }

  render() {
    return (
      <GoogleMap
        center={this.state.center}
        zoom={11}
        markers={this.state.markers}
        markerDelay={0}
        dimensions={['500px', '800px']}
      />
    );
  }
}
