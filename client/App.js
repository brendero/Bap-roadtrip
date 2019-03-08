import React, {Component} from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './app/screens/Login';
import Register from './app/screens/Register';

const Navigation = createSwitchNavigator(
  {
    LogInScreen: {
        screen: Login
    },
    RegistrationScreen: {
        screen: Register
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
      <StartNavigator/>
    )
  }
};

export default App;