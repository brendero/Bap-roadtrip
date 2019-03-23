import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native'
import TripItem from '../../components/Trips/TripItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrips } from '../../actions/tripActions';

class PersonalTrips extends Component {
  componentDidMount() {
    this.props.getTrips();
    // Object.assign(trips.find(b => b._id === action.payload),action.payload)
  }
  render() {
    const { trips } = this.props.trip;
    console.log(trips);
    return (
      <ScrollView style={styles.tripWrapper}>
      {trips && JSON.stringify(trips) != "{}" ? trips.map(({ _id, name, location, collaborators, archived }) => (
          archived ? null : <TripItem name={name} location={location.addres} membersCount={collaborators.length} id={_id} key={_id}></TripItem>
          
        )) : <Text>No trips yet for this user</Text>}
      </ScrollView>
    )
  }
}

PersonalTrips.propTypes = {
  auth: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  trip: state.trip
})

export default connect(mapStateToProps, {getTrips})(PersonalTrips);


const styles = StyleSheet.create({
  tripWrapper: {
    height: '100%'
  }
})