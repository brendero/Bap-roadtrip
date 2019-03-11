import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import TripItem from '../../components/Trips/TripItem';

export default class PersonalTrips extends Component {
  render() {
    return (
      <ScrollView style={styles.tripWrapper}>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
        <TripItem ></TripItem>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  tripWrapper: {
    height: '100%'
  }
})