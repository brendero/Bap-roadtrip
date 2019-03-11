import React, { Component } from 'react'
import { Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Fontawesome, { Icons } from 'react-native-fontawesome';


export default class RequestItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/forest-haze-hd-wallpaper-39811.jpg')} style={styles.tripThumbnail}></Image>
        <View style={styles.infoWrapper}>
          <Text style={styles.userName}>Frederick De Clipeleir</Text>
          <Text style={styles.tripName}>Uitstapke me zen 2</Text>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableHighlight style={styles.btnApproved}>
              <Fontawesome style={{color: '#FFFFFF'}}>{Icons.check}</Fontawesome>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnDenied}>
              <Fontawesome style={{color: '#FFFFFF'}}>{Icons.times}</Fontawesome>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

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
