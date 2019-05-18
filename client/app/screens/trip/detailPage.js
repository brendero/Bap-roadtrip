import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BottomCard from '../../components/Trips/Detail/BottomCard';
import SearchBar from '../../components/Forms/SearchBar';
import {Permissions, MapView} from 'expo';

class DetailPage extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      trip: '',
      userLocation: ''
    }
  }
  componentDidMount() {
    this.getTripDetails();
    this.getGeoLocation()
  }
  getTripDetails() {
    const { trips } = this.props.trip;

    const tripData = trips.find(trip => trip._id == this.props.navigation.state.params.Trip);

    this.setState({
      trip: tripData
    })
  }
  getGeoLocation() {
    const granted = Permissions.askAsync(Permissions.LOCATION)

    granted.then(res => {
      if(res.status === 'granted') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
    
            this.setState({
              userLocation: userCoords
            })
          },
          (err) => console.log(err),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
      else {
        alert(`can't get your location`)
      }
    }
    )
    .catch(err => console.log(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar messageOnPress={() => this.props.navigation.navigate('MessageScreen', {message: this.state.trip.messageRef})}/>
        <MapView
          style={{flex: 1}}
          initialRegion={this.state.userLocation}
        >
        </MapView>
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