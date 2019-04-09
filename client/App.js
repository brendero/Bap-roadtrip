import React, {Component} from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import { Provider } from 'react-redux';
import store from './app/config/store';
import DetailPage from './app/screens/trip/DetailPage';

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