import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import detailPage from './trip/DetailPage';
import { connect } from 'react-redux';
import { logoutUser, updateUserAvatar } from '../actions/authActions';
import { addTrip } from '../actions/tripActions';
import PersonalTrips from './home/PersonalTrips';
import Requests from './home/Requests';
import Archive from './home/Archive';
import Messages from './trip/Messages';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../config/styles';
import PropTypes from 'prop-types';
import { Permissions, ImagePicker } from 'expo'
import cloudinaryUpload from '../utils/cloudinary';
import AddTripModal from '../components/Trips/AddTripModal';

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
    }
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

  const messageNavigator = createStackNavigator(
    {
      MessageScreen: {
        screen: Messages,
      }
    }
  )
  const detailNavigator = createStackNavigator(
    {
      DetailPage: {
        screen: detailPage
      },
      messageScreen: {
        screen: messageNavigator
      },
      barNavigator: {
        screen: Navigation
      }
    },
    {
      initialRouteName: 'barNavigator',
      headerMode: 'none'
    }
  );

const columbusCircleCoordinates = {
  latitude: 4.137480,
  longitude: 51.098190,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const TripNavigator = createAppContainer(detailNavigator);
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      headerVisible: true,
      userLocation: columbusCircleCoordinates
    }
    this.Logout = this.Logout.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.navigation.navigate('LogInScreen');
    }
  }
  Logout() {
    this.props.logoutUser();
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }
  toggleHeader(navState) {
    if(navState.index == 1) {
      this.setState({
        headerVisible: false
      })
    } if(navState.index == 0) {
      this.setState({
        headerVisible: true
      })
    }
  }
  componentDidMount() {
    this.getGeoLocation();
  }
  getGeoLocation() {
    const granted = Permissions.askAsync(Permissions.CAMERA_ROLL)

    granted.then(res => {
      if(res.status === 'granted') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
    
            this.setState({
              userLocation: userCoords
            })
          },
          (err) => console.log(err),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
      else {
        alert(`can't get your location`)
      }
    }
    )
    .catch(err => console.log(err))
  }
  checkPermission() {
    const granted = Permissions.askAsync(Permissions.LOCATION)

    granted.then( 
      res => {
        if(res.status === "granted") {
          const options = {
            mediaTypes: "Images",
            allowsEditing: false,
            base64: true
          };
          
          ImagePicker.launchImageLibraryAsync(options).then((response) => {  
            if (response.cancelled) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = `data:image/jpeg;base64,${response.base64}`;

              cloudinaryUpload(source)
              .then(res => {
                const newUserData = {
                  avatar: res.data.secure_url
                }
                this.props.updateUserAvatar(newUserData)
              })
              .catch(err => console.log(err))
            }
          });
          
        }
        else {
          console.log("Photos permission denied")
        }
      }
    ).catch(
      err => console.log(err)
    )
  }
  render() {
    const { user } = this.props.auth;

    return (
      <View>
        {this.state.headerVisible ? 
        <View>
          <View style={styles.profilePicWrapper}>
            <ImageBackground source={require('../assets/fog-foggy-forest-4827.jpg')} style={styles.profileBackground}>
              <TouchableHighlight style={styles.logoutBtn} onPress={this.Logout}><FontAwesome name="sign-out" style={styles.logoutIcon}/></TouchableHighlight>
              <View>
                <TouchableOpacity onPress={this.checkPermission}>
                <Image source={{uri: user.avatar}} style={styles.profilePic}/>
                <FontAwesome name="pencil" style={{fontSize:20, color: 'white', backgroundColor: colors.secondaryLight, padding: 10, borderRadius: 100, position: 'absolute', bottom: 0, right: 0}}/>
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>{user.name}</Text>
            </ImageBackground>
          </View>
          <AddTripModal userLocation={this.state.userLocation} modalVisible={this.state.modalVisible} onPress={this.toggleModal}/>
        </View>
        : null}
        <View style={[this.state.headerVisible ? styles.navigationContainer : styles.navigationContainer2]}>
          <TripNavigator 
            onNavigationStateChange={(prevState, newState) => {
              this.toggleHeader(newState)
            }}></TripNavigator>

          {this.state.headerVisible ? <TouchableOpacity style={styles.addBtn} onPress={this.toggleModal}>
            <FontAwesome name="plus" style={styles.addBtnIcon}/>
          </TouchableOpacity> : null}
        </View>
      </View>
    )
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateUserAvatar: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser, updateUserAvatar})(Home);

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
  },
  logoutIcon: {
    fontSize: 25,
    color: colors.secondaryDark,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999
  },
  addBtnIcon: {
    color: 'white',
    fontSize: 20    
  },
  navigationContainer: {
    height: 447
  },
  navigationContainer2: {
    height: '100%'
  }
});