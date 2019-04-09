import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

export default class LocationsView extends Component {
  render() {
    console.log(this.props.stops)
    return (
      <View>
        <ScrollView
          horizontal={true}>
          {this.props.stops.map((name, thumbnail, location) => {
            <View style={styles.stopWrapper}>
              <Image source={{uri: thumbnail}} style={styles.stopImage}/>
              <View>
                <Text style={{fontWeight: 'bold'}}>{ name }</Text>
                <Text>{ location.addres }</Text>
              </View>
            </View>
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stopWrapper: {
    width: 20,
    height: 20,
    flexDirection: 'row'
  },
  stopImage: {
    width: '100%'
  }
})