import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Fontawesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      trip: ''
    }
    this.onApprove = this.onApprove.bind(this);
    this.onDeny = this.onDeny.bind(this);
  }
  // make a function that gets trips name from id
  getTripById() {

  }
  // make a functiokn that gets requestingUsers name from id
  getUserById() {

  }
  onApprove() {
    const updatedRequest = {
      id: this.props.id,
      status: true
    }
    this.props.updateRequest(updatedRequest);
    const updatedTrip = {
      id: this.props.id,
      //collaborator
    }

    this.props.updateTrip(updatedTrip);
  }
  onDeny() {
    this.props.deleteRequest();
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/forest-haze-hd-wallpaper-39811.jpg')} style={styles.tripThumbnail}></Image>
        <View style={styles.infoWrapper}>
          <Text style={styles.userName}>{this.props.adminName}</Text>
          <Text style={styles.tripName}>{this.props.tripName}</Text>
        </View>
        <View style={styles.btnWrapper}> 
          <TouchableHighlight style={styles.btnApproved} onPress={this.onApprove}>
              <Fontawesome style={{color: '#FFFFFF'}}>{Icons.check}</Fontawesome>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnDenied} onPress={this.onDeny}>
              <Fontawesome style={{color: '#FFFFFF'}}>{Icons.times}</Fontawesome>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

RequestItem.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth
})

export default connect(mapStateToProps, {})(RequestItem);


const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 66,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    padding: 10,
    marginTop: 19,
    borderRadius: 10,
  },
  tripThumbnail: {
    width: 30,
    height: 30,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  infoWrapper: {
    marginLeft: 10
  },
  userName: {
    fontFamily: 'roboto',
    fontSize: 12,
    color: 'rgba(0,0,0,1)'
  },
  tripName: {
    fontFamily: 'roboto',
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)'
  },
  btnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnApproved: {
    backgroundColor: '#00FF80',
    padding: 10,
    borderRadius: 100
  },
  btnDenied: {
    backgroundColor: '#E40606',
    padding: 10,
    borderRadius: 100,
    marginLeft: 10
  }
});
