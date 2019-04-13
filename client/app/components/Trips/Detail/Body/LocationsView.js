import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native'
import { colors } from '../../../../config/styles';

export default class LocationsView extends Component {
  render() {
    return (
      <View style={{marginTop: 20}}>
        <ScrollView
          horizontal={true}>
          {this.props.stop === [] ? this.props.stops.map((name, thumbnail, location) => (
            <View style={styles.stopWrapper}>
              <Image source={{uri: thumbnail}} style={styles.stopImage}/>
              <View>
                <Text style={{fontWeight: 'bold'}}>{ name }</Text>
                <Text>{ location.addres }</Text>
              </View>
            </View>
          )) : null}
            <View style={styles.stopWrapper}>
              <View>
                <Image source={{uri: 'https://stad.gent/sites/default/files/styles/sidebar_full_width/public/page/images/Gent%20Sint%20Pietersstation%20%285%29.jpg?itok=0taZfsk1'}} style={styles.stopImage}/>
              </View>
              <View style={styles.infoWrapper}>
                <Text style={{fontWeight: 'bold', color:'black', fontSize: 12}}>Gent sint-pieters</Text>
                <Text style={{color: 'black', fontSize: 12}}>Sint-pieterslaan 92</Text>
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stopWrapper: {
    width: 160,
    height: 160,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2 
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
    width: '100%'
  }
})