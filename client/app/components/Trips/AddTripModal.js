import React, { Component } from 'react'
import { TouchableHighlight, TouchableOpacity, Modal, View, Text, Image, TextInput, StyleSheet} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { colors } from '../../config/styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import SearchLocationComponent from './SearchLocationComponent';
import {forwardGeocoding} from '../../utils/LocationService'
import PropTypes from 'prop-types';
import { addTrip } from '../../actions/tripActions';
import axios from 'axios';

class AddTripModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchResults: [],
      destination: '',
      newTripName: '',
      endLocation: ''
    }

    this.addNewTrip = this.addNewTrip.bind(this);
    this.setDestination = this.setDestination.bind(this);
  } 
  setDestination(addres, lattitude, longitude) {
    this.setState({
      destination: [parseFloat(longitude), parseFloat(lattitude)],
      endLocation: {
        addres: `${addres[1]} ${addres[0]} ${addres[3]}`,
        lattitude,
        longitude
      }
    })
  }
  searchAddressLocation(adress) {
    // This works but don't make to many requests 
    forwardGeocoding(adress)
      .then(res => {
      this.setState({
        searchResults: res.data
      })
    })
      .catch(err => console.log(err))    
  }
  addNewTrip() {
    if(this.state.destination !== '' || this.state.newTripName !== '' || this.state.endLocation !== '') {
        axios.post('http://10.0.2.2:5000/api/messages')
        .then(res => {
            const locationData = this.state.endLocation;
            
            const newTripData = {
                name: this.state.newTripName,
                location : locationData,
                messageId: res.data._id
            }  
            this.props.addTrip(newTripData);
            this.props.onPress;
        })
    }
  }
  render() {
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={modal.container}>
        <View style={modal.wrapper}>
          <View style={modal.titleWrapper}>
            <TouchableOpacity onPress={this.props.onPress}><FontAwesome style={{color: 'white', fontSize: 20}}>{Icons.times}</FontAwesome></TouchableOpacity>
            <Text style={modal.title}>Your new trip</Text>
            <Image source={require('../../assets/Logo.png')} style={{width: 50, height: 50}}></Image>
          </View>
          <View style={{margin: 10}}>
            <Text>Name</Text>
            <TextInput
            style={modal.nameInput}
            value={this.state.newTripName}
            maxLength={40}
            onChangeText={value => {
              this.setState({
                newTripName: value
              })
            }}
            />
          </View>
          <View style={{flex:1}}>
            <Text style={{marginLeft: 10}}>Destination</Text>
            <SearchLocationComponent searchResults={this.state.searchResults} onSubmit={value => this.searchAddressLocation(value)} setDestination={this.setDestination}/>

            <MapboxGL.MapView
              ref={(c) => this._map = c}
              style={{flex: 1}}
              zoomLevel={13}
              centerCoordinate={this.state.destination ? this.state.destination : this.props.userLocation}
              styleURL={ MapboxGL.StyleURL.TrafficDay }>
              { this.state.destination ? 
                <MapboxGL.PointAnnotation 
                  key="key1"
                  id='ùldkjms'
                  title="end Destination"
                  coordinate={this.state.destination}
                ></MapboxGL.PointAnnotation>
                : null }
            </MapboxGL.MapView>
          </View>

          {/* TODO: conditional disabled if tripName is empty or destination is empty */}
          <TouchableHighlight onPress={this.addNewTrip} style={{backgroundColor: colors.secondaryDark, padding: 10, borderRadius: 50,position: 'absolute', bottom: 10, right: 10}}>
            <Text style={{color: 'white'}}><FontAwesome style={{paddingRight: 30}}>{Icons.paperPlane}</FontAwesome>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    )
  }
}

AddTripModal.propTypes = {
  addTrip: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {addTrip})(AddTripModal);

const modal = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  wrapper: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    elevation: 3
  },
  titleWrapper: {
    backgroundColor: colors.secondaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    fontSize: 20
  },
  nameInput: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: 0,
    marginTop: 3
  }
})
