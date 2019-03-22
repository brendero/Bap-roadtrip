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
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import validate from '../components/Forms/ValidateWrapper';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { colors } from '../config/styles';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      confirmedPassword: '',
      errors: {}
    }

    this.onRegister = this.onRegister.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onRegister() {

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2 : this.state.confirmedPassword,
    }
    
    this.props.registerUser(newUser);

  }
  render() {
    const {navigate} = this.props.navigation;

    const {errors} = this.state;

    return (
      // TODO: make errors not push back the register button
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
                <FontAwesome style={styles.inputIcons}>{Icons.envelopeO}</FontAwesome>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.email}
                  placeholder="E-mail"
                  onChangeText={value => {
                    this.setState({
                      email: value.trim()
                    })
                  }}/>
              </View>
              {errors.email ? <Text style={styles.errorMsg}>{errors.email}</Text> : null}
              <View style={styles.formInput}>
                <FontAwesome style={styles.inputIcons}>{Icons.user}</FontAwesome>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.name}
                  placeholder="Full Name"
                  onChangeText={value => {
                    this.setState({
                      name: value
                    })
                  }} />
              </View>
              {errors.name ? <Text style={styles.errorMsg}>{errors.name}</Text> : null}
              <View style={styles.formInput}>
                <FontAwesome style={styles.inputIcons}>{Icons.lock}</FontAwesome>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={value => {
                    this.setState({
                      password: value
                    })
                  }}/>
              </View>
              {errors.password ? <Text style={styles.errorMsg}>{errors.password}</Text> : null}
              <View style={styles.formInput}>
                <FontAwesome style={styles.inputIcons}>{Icons.lock}</FontAwesome>
                <TextInput
                  style={{padding: 0, width: '80%'}}
                  value={this.state.confirmedPassword}
                  secureTextEntry={true}
                  placeholder="Confirm password"
                  onChangeText={value => {
                    this.setState({
                      confirmedPassword: value
                    })
                  }}/>
              </View>
              {errors.password2 ? <Text style={styles.errorMsg}>{errors.password2}</Text> : null}
            </View>
            <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={this.onRegister} style={styles.RegisterBtn}>
                <Text style={{color:'#FFFFFF'}}>Register</Text>
            </TouchableOpacity>   
            <Text 
              style={{color: '#FFFFFF', marginTop: 2}}
              onPress={() => navigate('LogInScreen')}
            >Back to login</Text>          
            </View>
        </KeyboardAvoidingView >
      </ImageBackground>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);

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
    marginTop: 10
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
    marginTop: 20,
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
  RegisterBtn: {
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