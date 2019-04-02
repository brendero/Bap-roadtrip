import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native'
import TripItem from '../../components/Trips/TripItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrips } from '../../actions/tripActions';

class PersonalTrips extends Component {
  componentDidMount() {
    this.props.getTrips();
  }
  render() {
    const { trips } = this.props.trip;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.tripWrapper}>
      {trips && JSON.stringify(trips) != "{}" ? trips.map(({ _id, name, location, collaborators, archived }) => (
          archived ? 
          null :
          // Add onpress event onPress={() => {navigate('DetailPage', {Trip: _id})}} tht actually works
          <TripItem name={name} location={location.addres} membersCount={collaborators.length} id={_id} key={_id}></TripItem>          
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