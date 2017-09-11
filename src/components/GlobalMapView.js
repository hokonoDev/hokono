import React from 'react';
import {
  GoogleMap,
  GlobalPetFeed,
} from './index';
import { cordsFromAddress } from './lib/helpers';
import fb from 'firebase';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: typeof this.props.userLocation === 'string' ? undefined : this.props.userLocation,
      markers: undefined,
      accounts: undefined,
      inboundPets: {},
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
        this.setState({ accounts });
        this.setState({
          markers: Object.values(accounts).map(account => {
            return this.props.auth.uid !== account.uid ? {
              position: account.location || account.address,
              label: account.displayName,
              title: account.uid,
              animation: 'drop',
              onClick: () => {
                this.props.history.push(`/${account.acctType}/profile/${account.uid}`);
              },
            } : {
              position: account.location || account.address,
              label: '',
              title: 'home',
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

  getInboundPets(map, markers) {
    const inboundPets = markers ? markers.reduce((accum, marker, i) => {
      if (marker.getTitle() === 'home') return accum;
      if (map.getBounds().contains(marker.getPosition())) {
        const pets = this.state.accounts[marker.getTitle()].pets;
        return pets ? { ...accum, ...pets } : accum;
      }
      return accum;
    }, {}) : {};
    this.setState({ inboundPets });
  }

  render() {
    return (
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <p
            className="title"
          >Map Search</p>
          <GoogleMap
            center={this.state.center}
            zoom={11}
            markers={this.state.markers}
            markerDelay={0}
            dimensions={['500px', '800px']}
            onIdle={this.getInboundPets.bind(this)}
          />
          <GlobalPetFeed
            {...this.props}
            gPets={this.state.inboundPets}
          />
        </div>
      </div>
    );
  }
}
