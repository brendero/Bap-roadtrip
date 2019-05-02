import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import MembersView from './Body/MembersView'
import LocationsView from './Body/LocationsView'
import BookingsView from './Body/BookingsView'

export default class OptionsBody extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.itemWrapper} >
          <Text>Members</Text>
          <MembersView trip={this.props.trip} members={this.props.trip.collaborators}/>
        </View>
        <View style={styles.itemWrapper}>
          <Text>Stops</Text>
          <LocationsView stops={this.props.trip.stops}/>
        </View>
        <View style={styles.itemWrapper}>
          <Text>Bookings</Text>
          <BookingsView bookings={this.props.trip.bookings}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    paddingVertical: 20
  }
})