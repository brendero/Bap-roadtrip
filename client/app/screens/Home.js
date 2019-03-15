import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';
import FontAwesome, {Icons } from 'react-native-fontawesome';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { colors } from '../config/styles';
import PersonalTrips from './home/PersonalTrips';
import Requests from './home/Requests';
import Archive from './home/Archive';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/authActions';

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
      swipeEnabled: false,
      tabBarOptions: {
        tabStyle: {
          height: 40
        },
        labelStyle: {
          fontFamily: 'roboto',
          fontSize: 12,
          color: '#000000'
        },
        style: {
          backgroundColor: 'transparent',
        },
        indicatorStyle: {
          backgroundColor: colors.main,
          height: 4
        }
      }
    }    
  );
const TripNavigator = createAppContainer(Navigation);
class Home extends Component {
  componentDidMount() {
    console.log(this.props.auth.isAuthenticated);
  }
  Logout() {
    this.props.logoutUser();

  }
  render() {
    const { user } = this.props.auth;

    return (
      <View>
        {/* TODO: add logoutbtn */}
        <View style={styles.profilePicWrapper}>
          <ImageBackground source={require('../assets/fog-foggy-forest-4827.jpg')} style={styles.profileBackground}>
            <FontAwesome style={styles.logoutBtn} onPress={this.Logout}>{Icons.signOut}</FontAwesome>
            <Image source={require('../assets/forest-haze-hd-wallpaper-39811.jpg')} style={styles.profilePic}></Image>
            <Text style={styles.profileName}>{user.name}</Text>
          </ImageBackground>
        </View>
        <View style={{height: '100%'}}>
          <TripNavigator></TripNavigator>
        </View>
      </View>
    )
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Home);

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
  },
  logoutBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 25,
    color: colors.secondaryDark
  }
});