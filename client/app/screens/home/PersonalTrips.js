import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

export default class PersonalTrips extends Component {
  render() {
    return (
      <ScrollView style={styles.tripWrapper}>
        <Text> Your Trips </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  tripWrapper: {
    height: '100%',
  }
})