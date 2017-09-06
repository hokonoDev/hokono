import React from 'react';
import { cordsFromAddress } from './lib/helpers';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.allMarkers = [];
    this.state = {
      center: this.props.center || {lat: -25.363, lng: 131.044},
      markers: this.props.markers || [],
      zoom: this.props.zoom || 3,
      markerDelay: this.props.markerDelay || 0,

    };
  }

  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.map, {
      zoom: this.state.zoom,
      center: this.state.center,
    });
    window.google.maps.event.addListener(this.map, 'idle', () =>
      this.props.onIdle(this.map, this.allMarkers)
    );
    this.setMarkers();
  }

  componentDidUpdate(prevProps, prevState) {
    // if map props have changed ... then update the state to reflect changes
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({
        center: this.props.center || {lat: -25.363, lng: 131.044},
        markers: this.props.markers || [],
        zoom: this.props.zoom || 3,
      });
    }

    //if the state has changed ... then update the map to reflect changes
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      //handle zoom changes
      if (this.map.getZoom() !== this.state.zoom)
        this.map.setZoom(this.state.zoom);
      //handle center changes
      if (JSON.stringify(prevState.center) !== JSON.stringify(this.state.center))
        this.map.panTo(this.state.center);
      //handle changes to markers (can only add markers)
      if (JSON.stringify(this.state.markers) !== JSON.stringify(prevState.markers))
        this.setMarkers();
    }
  }

  setMarkerByAddress(marker) {
    cordsFromAddress(marker.position)
      .then(cords => {
        const m = new window.google.maps.Marker({
          position: cords,
          animation:
            marker.animation === 'drop' ?
              window.google.maps.Animation.DROP :
                marker.animation === 'bounce' ?
                  window.google.maps.Animation.BOUNCE : null,
          title: marker.title,
          label: marker.label,
          map: this.map,
          icon: marker.icon,
        });
        window.google.maps.event.addListener(m, 'click', marker.onClick);
        this.allMarkers.push(m);
        return m;
      })
  }

  setMarkers() {
    this.state.markers.forEach((marker, i) => {
      // check the type of position entered ... if string it is an address
      if (typeof marker.position === 'string') {
        // therefore use a function that will deal with this
        this.setMarkerByAddress(marker);
      // ... if it is an object then the position is cordinates
      } else if (typeof marker.position === 'object'){
        setTimeout(() => {
          const m = new window.google.maps.Marker({
            position: marker.position,
            animation:
              marker.animation === 'drop' ?
                window.google.maps.Animation.DROP :
                  marker.animation === 'bounce' ?
                    window.google.maps.Animation.BOUNCE : null,
            title: marker.title,
            label: marker.label,
            map: this.map,
            icon: marker.icon,
          });
          window.google.maps.event.addListener(m, 'click', marker.onClick);
          this.allMarkers.push(m);
          return m;
        }, this.state.markerDelay * i);
      }
    });
  }

  render() {
    return (
      <div
        style={this.props.containerStyle}
      >
        <div
          ref='map'
          style={{
            height: this.props.dimensions ? this.props.dimensions[0] : '500px',
            width: this.props.dimensions ? this.props.dimensions[1] : '500px',
            ...this.props.mapStyle,
          }}
        >
        </div>
      </div>
    );
  }
}
