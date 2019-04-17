import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import detailPage from './trip/DetailPage';
import { connect } from 'react-redux';
import { logoutUser, updateUserAvatar } from '../actions/authActions';
import PersonalTrips from './home/PersonalTrips';
import Requests from './home/Requests';
import Archive from './home/Archive';
import Messages from './trip/Messages';
import FontAwesome, {Icons } from 'react-native-fontawesome';
import { colors } from '../config/styles';
import PropTypes from 'prop-types';
import { PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import cloudinaryUpload from '../utils/cloudinary';

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
        screen: Messages
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

const TripNavigator = createAppContainer(detailNavigator);
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      headerVisible: true
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
  checkPermission() {
    const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
    granted.then( 
      res => {
        if(res === PermissionsAndroid.RESULTS.GRANTED) {
          const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
          ImagePicker.showImagePicker(options, (response) => {          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = `data:image/jpeg;base64,${response.data}`;

              cloudinaryUpload(source)
              .then(res => {
                // use res.data.secure_url to update avatar
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
              <TouchableHighlight style={styles.logoutBtn} onPress={this.Logout}><FontAwesome style={styles.logoutIcon}>{Icons.signOut}</FontAwesome></TouchableHighlight>
              <View>
                <TouchableOpacity onPress={this.checkPermission}>
                <Image source={{uri: user.avatar}} style={styles.profilePic}/>
                <FontAwesome style={{fontSize:20, color: 'white', backgroundColor: colors.secondaryLight, padding: 10, borderRadius: 100, position: 'absolute', bottom: 0, right: 0}}>{Icons.pencil}</FontAwesome>
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>{user.name}</Text>
            </ImageBackground>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={modal.container}>
              <View style={modal.wrapper}>
                <View style={modal.titleWrapper}>
                  <Text style={modal.title}>Your new trip</Text>
                  <Image source={require('../assets/Logo.png')} style={{width: 50, height: 50}}></Image>
                </View>
                <View style={{margin: 10}}>
                  <Text>Name</Text>
                  <TextInput
                  style={modal.nameInput}
                  value={this.state.tripName}
                  maxLength={40}
                  onChangeText={value => {
                    this.setState({
                      tripName: value
                    })
                  }}
                  />
                </View>
                <View>
                  <Text style={{marginLeft: 10}}>Destination</Text>
                  {/* Add Map */}
                </View>
                <TouchableHighlight onPress={this.toggleModal}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>        
        </View>
        : null}
        <View style={[this.state.headerVisible ? styles.navigationContainer : styles.navigationContainer2]}>
          <TripNavigator 
            onNavigationStateChange={(prevState, newState) => {
              this.toggleHeader(newState)
            }}></TripNavigator>

          {this.state.headerVisible ? <TouchableOpacity style={styles.addBtn} onPress={this.toggleModal}>
            <FontAwesome style={styles.addBtnIcon}>{Icons.plus}</FontAwesome>
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

const modal = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  wrapper: {
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    elevation: 3
  },
  titleWrapper: {
    backgroundColor: colors.secondaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    fontSize: 20
  },
  nameInput: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: 0,
    marginTop: 3
  }
})