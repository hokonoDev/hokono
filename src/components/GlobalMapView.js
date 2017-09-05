import React from 'react';
import {
  GoogleMap,
  Nav,
} from './index';
import { cordsFromAddress } from './lib/helpers';
import fb from 'firebase';

export default class extends React.Component {
  constructor(props) {
    super(props);
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
            return this.props.auth.uid !== account.uid ? {
              position: account.location || account.address,
              title: account.displayName,
              animation: 'drop',
              onClick: () => {
                this.props.history.push(`/${account.acctType}/profile/${account.uid}`);
              },
            } : {
              position: account.location || account.address,
              animation: 'none',
              onClick: () => {},
              icon: '/images/bullseye.png',
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
      } else {
        this.setState({ center: this.props.userLocation })
      }
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <div
          style={{display: 'flex', justifyContent: 'center'}}
        >
          <GoogleMap
            center={this.state.center}
            zoom={11}
            markers={this.state.markers}
            markerDelay={0}
            dimensions={['500px', '800px']}
          />
        </div>
      </div>
    );
  }
}
