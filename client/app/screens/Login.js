import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView  } from 'react-native';
  import { FontAwesome } from '@expo/vector-icons';
  import validate from '../components/Forms/ValidateWrapper';
import { colors } from '../config/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onLogin = this.onLogin.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.navigation.navigate('HomeScreen');
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }
  onLogin() {
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
  }
  render() {
    const {navigate} = this.props.navigation;

    const { errors } = this.state;

    return (
      <ImageBackground source={require('../assets/forest-haze-hd-wallpaper-39811.jpg')} style={styles.backgroundImage}>
        <KeyboardAvoidingView 
          behavior="position"
          style={styles.container}
          enabled >
            <View style={styles.headerWrapper}>
            <Image source={require('../assets/Logo.png')} style={styles.logoImg}></Image>
            <Text style={styles.logoText}>WAYKING</Text>
            </View>
            
            <View style={styles.formWrapper}>
              <View style={styles.formInput}>
                <FontAwesome name="envelope" style={styles.inputIcons}/>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.email}
                  placeholder="E-mail"
                  onChangeText={value => {
                    this.setState({
                      email: value.trim()
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      emailError: validate('email', this.state.email)
                    })
                  }}
                  error={this.state.emailError}/>
              </View>
              {errors.email ? <Text style={styles.errorMsg}>{errors.email}</Text> : null}
              <View style={styles.formInput}>
                <FontAwesome name="lock" style={styles.inputIcons}/>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={value => {
                    this.setState({
                      password: value
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      passwordError: validate('password', this.state.password)
                    })
                  }}
                  error={this.state.passwordError}/>
              </View>
              {errors.password ? <Text style={styles.errorMsg}>{errors.password}</Text> : null}
            </View>
            <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={this.onLogin} style={styles.loginBtn}>
                <Text style={{color:'#FFFFFF'}}>login</Text>
            </TouchableOpacity>   
            <Text 
              style={{color: '#FFFFFF', marginTop: 2}}
              onPress={() => navigate('RegistrationScreen')}
            >don't have an account yet?</Text>          
            </View>
        </KeyboardAvoidingView >
      </ImageBackground>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  headerWrapper: {
    marginTop: 0
  },
  logoImg: {
    alignSelf:'center', 
    resizeMode:'contain', 
    height: 220,
    width: "50%", 
    marginTop: 23,
    marginBottom: 0,
  },
  logoText: {
    width: '100%',
    padding: 7,
    backgroundColor: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontSize: 33,
    fontFamily: 'roboto',
    marginTop: 3,
    color: 'black',
    fontWeight: 'bold'
  },
  formWrapper: {
    width: '70%',
    alignSelf: 'center',
    marginTop: 50
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 30,
    width:'100%',
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    flexDirection:'row',
    marginLeft: 30,
    marginTop: 40,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputIcons: {
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 50
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: colors.main,
    padding: 11,
    width: '35%',
    borderRadius: 11,
    alignSelf: 'center'
  },
  errorMsg: {
    color: 'red',
    alignSelf: 'center'
  }
});