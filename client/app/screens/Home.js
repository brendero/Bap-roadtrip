import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text
} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { colors } from '../config/styles';
import PersonalTrips from './home/PersonalTrips';
import Requests from './home/Requests';
import Archive from './home/Archive';

const Navigation = createMaterialTopTabNavigator(
  {
    YourTrips: {
        screen: PersonalTrips,
        navigationOptions :{
          title: 'Your trips'
        }
    },
    TripRequests: {
        screen: Requests,
        navigationOptions: {
          title: 'Trip requests'
        }
    },
    Archive: {
      screen: Archive,
      navigationOptions: {
        title: 'archive'
      }
    },
  },
  {
      initialRouteName: 'YourTrips',
      swipeEnabled: true,
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
          color: '#000000'
        },
        style: {
          backgroundColor: 'transparent',
        },
        indicatorStyle: {
          backgroundColor: colors.main,
        }
      }
    }    
  );

const TripNavigator = createAppContainer(Navigation);
export class Home extends Component {
  render() {
    return (
      <View>
        <View style={styles.profilePicWrapper}>
          <ImageBackground source={require('../assets/fog-foggy-forest-4827.jpg')} style={styles.profileBackground}>
            <Image source={require('../assets/forest-haze-hd-wallpaper-39811.jpg')} style={styles.profilePic}></Image>
            <Text style={styles.profileName}>Stephanie Krekel</Text>
          </ImageBackground>
        </View>
        <View style={{height: '100%'}}>
          <TripNavigator></TripNavigator>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  profilePicWrapper : {
    height: 210,
    width: '100%',
  },
  profileBackground: {
    resizeMode: 'cover',
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-evenly', 
    alignItems: 'center'
  },
  profilePic: {
    width: 135,
    height: 135,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  profileName: {
    fontFamily: 'roboto',
    fontWeight: '500',
    fontSize: 19,
    color: '#FFFFFF'
  }
})
export default Home;