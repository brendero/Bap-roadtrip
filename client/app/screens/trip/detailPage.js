import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BottomCard from '../../components/Trips/Detail/BottomCard';
import { updateTrip } from '../../actions/tripActions';
import SearchBar from '../../components/Forms/SearchBar';
import {Permissions, MapView} from 'expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../../config/styles';

class DetailPage extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      trip: '',
      userLocation: null,
      newStopLoc: null,
      newStopMarker: null,
      newStopInfo: {}
    }

    this.setNewStopMarker = this.setNewStopMarker.bind(this);
    this.addNewStop = this.addNewStop.bind(this);
    this.setMapLocation = this.setMapLocation.bind(this);
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
  setMapLocation(lat, lon) {
    this.setState({
      newStopLoc: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    })

  }
  setNewStopMarker(address, lattitude, longitude) {
    this.setState({
      newStopInfo: {
        name: `${address[0]} ${address[1]} ${address[2]}`,
        thumbnail: 'https://data.whicdn.com/images/104123841/superthumb.jpg?t=1393711117',
        location: {
          addres: `${address[0]} ${address[1]} ${address[2]}`,
          lat: lattitude,
          lng: longitude
        }
      },
      newStopLoc: {
        latitude: parseFloat(lattitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      newStopMarker: {
        latitude: parseFloat(lattitude),
        longitude: parseFloat(longitude),
      },
    })
  }
  addNewStop() {
    const { trip, newStopInfo } = this.state;

    const stopData = {
      id: trip._id,
      stops: [...trip.stops, newStopInfo]
    }
    this.props.updateTrip(stopData)
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
    const { newStopMarker, newStopLoc, userLocation, newStopInfo, trip } = this.state;
    const { stops } = trip;

    return (
      <View style={styles.container}>
        <SearchBar setDestination={this.setNewStopMarker} messageOnPress={() => this.props.navigation.navigate('MessageScreen', {message: this.state.trip.messageRef})}/>
        <MapView
          style={{flex: 1}}
          initialRegion={userLocation}
          region={newStopLoc}
        >
          {
            newStopMarker ? 
              <MapView.Marker
                title="new Stop"
                coordinate={newStopMarker}
              >
                {/* TODO: add an image? */}
                <MapView.Callout onPress={this.addNewStop}>
                  <View style={callout.wrapper}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Click to add as a stop</Text>
                      <Text>{newStopInfo.location.addres}</Text>
                    </View>
                    <View style={callout.btnWrapper}>
                    </View>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
              : null
          }
          {
            stops ?
              stops.map((stop) => (
                <MapView.Marker key={stop._id}
                title={stop.name}
                coordinate={{latitude: parseFloat(stop.location.lat), longitude: parseFloat(stop.location.lng)}}
                />
              ))
              : null
          }
        </MapView>
        <BottomCard locationFunction={this.setMapLocation} tripData={trip}/>
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

export default connect(mapStateToProps, {updateTrip})(DetailPage)

const styles = StyleSheet.create({
  container: {
    flex: 1 
  }
})

const callout = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})