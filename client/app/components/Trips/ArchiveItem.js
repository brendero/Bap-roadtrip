import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Fontawesome, {Icons} from 'react-native-fontawesome';
import { colors } from '../../config/styles';

export default class ArchiveItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/fog-foggy-forest-4827.jpg')} style={styles.tripThumbnail}></Image>
        <View style={styles.infoWrapper}>
            <Text style={styles.tripName}>Reiske Met De Girls</Text>
            <Text style={styles.tripDestination}>Zwarte woud</Text>
        </View>
        <View style={styles.membersContainer}>
          <Text style={styles.memberNumber}>9</Text>
          <Fontawesome style={styles.memberIcon}>{Icons.userO}</Fontawesome>
        </View>
        <View style={styles.archiveIconWrapper}>
          <Fontawesome style={styles.archiveIcon}>{Icons.bookmark}</Fontawesome>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    padding: 10,
    marginTop: 19,
    marginBottom: 1,
    borderRadius: 10
  },
  tripThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  infoWrapper: {
    marginLeft: 10
  },
  tripName: {
    fontFamily: 'roboto',
    fontSize: 16,
    color: 'rgba(0,0,0,1)'
  },
  tripDestination: {
    fontFamily: 'roboto',
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  },
  membersContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    left: 18
  },
  archiveIconWrapper: {
    position: 'relative',
    top: -35, 
    right: 5
  },
  archiveIcon: {
    color: colors.secondaryLight,
    fontSize: 30
  }
})