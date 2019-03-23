import React, {Component} from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import { Provider } from 'react-redux';
import store from './app/config/store';
import PhotoRoll from './app/screens/PhotoRoll';
import FontAwesome,{ Icons } from 'react-native-fontawesome';

// Base Navigator
const avatarNavigator = createStackNavigator({
  PhotoRoll: {
    screen: PhotoRoll,
    navigationOptions: ({navigation}) => ({
        title: 'PhotoRoll',
    })
  }});


const Navigation = createSwitchNavigator(
  {
    LogInScreen: {
        screen: Login
    },
    RegistrationScreen: {
        screen: Register
    },
    HomeScreen: {
      screen: Home
    },
    PhotoRoll: {
      screen: avatarNavigator
    }
  },
  {
    initialRouteName: "LogInScreen",
    navigationOptions: {
      header: null
    },
  }
);
const StartNavigator = createAppContainer(Navigation);

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <Provider store={ store }>
        <StartNavigator/>
      </Provider>
    )
  }
};

export default App;