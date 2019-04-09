import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class BookingsView extends Component {
  render() {
    console.log(this.props.bookings)
    return (
      <View>
        <Text> Bookings </Text>
      </View>
    )
  }
}
