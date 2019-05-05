import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { colors } from '../../../../config/styles';

export default class BookingsView extends Component {
  render() {
    return (
      <View>
        <ScrollView
          horizontal={true}>
            {this.props.stops === [] ? this.props.bookings.map((id, name, photo, price, location) => (
            <View style={styles.stopWrapper} key={id}>
            <View>
              <Image source={{uri: photo}} style={styles.stopImage}/>
            </View>
            <View style={styles.infoWrapper}>
              <View>
                <Text style={{fontWeight: 'bold', color:'black', fontSize: 10}}>{ name }</Text>
                <Text style={{color: 'black', fontSize: 10}}>{ location.addres }</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold', fontFamily: 'roboto', color: colors.main}}>{ price }</Text>
              </View>
            </View>
          </View>
            )): null}
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
    marginRight: 10
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
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})