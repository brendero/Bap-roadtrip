import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { PermissionsAndroid } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BottomCard from '../../components/Trips/Detail/BottomCard';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import SearchBar from '../../components/Forms/SearchBar';

const YOUR_ACCES_TOKEN = "pk.eyJ1IjoiYnJvbnQyIiwiYSI6ImNqdWI4dm1teTA4eXk0M21oOTBuMmM2NGIifQ._07g-0VCeZ7jadmmxRE64g";

MapboxGL.setAccessToken(YOUR_ACCES_TOKEN);

const columbusCircleCoordinates = [
  4.137480, 51.098190
];

class DetailPage extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      trip: '',
      userLocation: columbusCircleCoordinates
    }
  }
  componentDidMount() {
    this.getTripDetails();

    const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    granted.then(res => {
      if(res === PermissionsAndroid.RESULTS.GRANTED) {
        this.getGeoLocation()
      }
      else {
        alert(`can't get your location brug`)
      }
    }
    )
    .catch(err => console.log(err))
  }
  getTripDetails() {
    const { trips } = this.props.trip;

    const tripData = trips.find(trip => trip._id == this.props.navigation.state.params.Trip);
    console.log(tripData);
    this.setState({
      trip: tripData
    })
  }
  getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = [position.coords.longitude, position.coords.latitude]

        this.setState({
          userLocation: userCoords
        })
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar messageOnPress={() => this.props.navigation.navigate('MessageScreen')}/>
        <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          zoomLevel={13}
          centerCoordinate={this.state.userLocation}
          styleURL={ MapboxGL.StyleURL.TrafficDay }>
        </MapboxGL.MapView>
        <BottomCard tripData={this.state.trip}/>
      </View>
    )
  }
}

DetailPage.propTypes = {
  trip: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, {})(DetailPage)

const styles = StyleSheet.create({
  container: {
    flex: 1 
  }
})