import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Fontawesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteRequest, updateRequest } from '../../actions/requestActions';
import { updateTripCollaborators } from '../../actions/tripActions';

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
  componentDidMount() {
    this.getTripById();
    this.getUserById();
  }
  // make a function that gets trips name from id
  getTripById() {
    axios.get(`http://192.168.1.42:5000/api/trips/${this.props.trip}`)
      .then(res => {
        this.setState({
          trip: res.data
        })
      })
      .catch(err => console.log(err))
  }
  // make a function that gets requestingUsers name from id
  getUserById() {
    axios.get(`http://192.168.1.42:5000/api/users/${this.props.requesterId}`)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => console.log(err))
  }
  onApprove() {
    const collaboratorsArray = this.state.trip.collaborators;

    if(collaboratorsArray.includes(this.props.auth.user.id) === false) {
      collaboratorsArray.push(this.props.auth.user.id);
    }
    
    const updatedTrip = {
      id: this.props.trip,
      collaborators: collaboratorsArray
    }

    this.props.updateTripCollaborators(updatedTrip);
    this.props.deleteRequest(this.props.id);
  }
  onDeny() {
    console.log(this.props.id)
    this.props.deleteRequest(this.props.id);
  }
  render() {
    console.log(this.state.trip);
    return (
      <View style={styles.container}>
        <View style={styles.infoWrapper}>
          <Text style={styles.userName}>{this.state.user.name}</Text>
          <Text style={styles.tripName}>{this.state.trip.name}</Text>
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
  auth: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  updateTripCollaborators: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth
})

export default connect(mapStateToProps, {deleteRequest, updateTripCollaborators})(RequestItem);


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
