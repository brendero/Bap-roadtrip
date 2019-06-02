import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class LocationsView extends Component {
  render() {
    console.log(this.props.stops)
    const { stops } = this.props;

    return (
      <View style={{marginTop: 20}}>
        <ScrollView
          horizontal={true}>
            {/* TODO: add onPress to go to place */}
          {(stops || []).map((stop) => (
            <View style={styles.stopWrapper} key={stop._id}>
              <Image source={{uri: stop.thumbnail}} style={styles.stopImage}/>
              <View style={styles.infoWrapper}>
                <Text style={{fontWeight: 'bold', color: 'black', fontSize: 12}}>{ stop.name }</Text>
                <Text style={{color: 'black', fontSize: 12}}>{ stop.location.addres }</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={{width: 170, height: 170, backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center'}}>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stopWrapper: {
    width: 170,
    height: 170,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    elevation: 50,
    margin: 0
  },
  stopImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoWrapper: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  }
})