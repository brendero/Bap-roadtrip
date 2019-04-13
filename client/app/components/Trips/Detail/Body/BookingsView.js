import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'

export default class BookingsView extends Component {
  render() {
    return (
      <View>
        <ScrollView
          horizontal={true}>
            {this.props.stops === [] ? this.props.bookings.map((id, name, photo, price, location) => (
              <View key={id}>
                <Image source={{uri: photo}}/>
                <View>
                  <View>
                  <Text>{ name }</Text>
                  <Text>{ location.addres }</Text>
                  </View>
                  <View>
                    <Text>{ price }</Text>
                  </View>
                </View>
              </View>
            )): null}
        </ScrollView>
      </View>
    )
  }
}
