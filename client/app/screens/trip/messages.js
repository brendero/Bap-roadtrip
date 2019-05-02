import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux'
import axios from 'axios';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';
import { height } from '../../config/styles';


export class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messageBody: ''
    }
    this.addMessage = this.addMessage.bind(this);
  }
  componentDidMount() {
    this.getMessages();
  }
  getMessages() {
    console.log(this.props.navigation.state.params.message);
    axios.get(`http://10.0.2.2:5000/api/messages/${this.props.navigation.state.params.message}`)
      .then(res => {
        this.setState({
          messages: res.data.messages
        })
      })
      .catch(err => console.log(err))
  }
  addMessage() {
    const { user } = this.props.auth;

    const userData = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }
    
    const message = {
      user: userData,
      body: this.state.messageBody
    }
    
    let messageData;

    if(this.state.messages !== null) {
      console.log(this.props.navigation.state.params.message);
      messageData = {
        id: this.props.navigation.state.params.message,
        messages: [...this.state.messages, message]
      }
    } else {
      messageData = {
        id: this.props.navigation.state.params.message,
        messages: [message]
      }
    }
    axios.post('http://10.0.2.2:5000/api/messages/', messageData)
      .then(res => {
        console.log(res);
      this.setState({
        messages: res.data.messages,
        messageBody: ''
      })
    })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <View style={{flex: 1}}>
      {/* TODO: see that you can return from messages screen and title is rendered on top */}
      {/* TODO: maybe use Flatlist instead of .map for messageRendering */}
        <View style={{height: (height - 150)}}>
          <ScrollView 
            ref={ref => this.scrollView = ref}
            onContentSizeChange={() => {        
              this.scrollView.scrollToEnd({animated: false});
            }}
            >
          {
            this.state.messages !== [] ?
            this.state.messages.map(message => (
              <MessageItem key={message._id} message={message} auth={this.props.auth}/>
              )) :
              null
            }
          </ScrollView>
        </View>
        <View style={styles.inputWrapper}>
            <View>
              <TextInput
                value={this.state.messageBody}
                style={{padding: 0}}
                onChangeText={value => {
                  this.setState({
                    messageBody: value
                  })
                }
              }
              placeholder="Type your message.."
              />
            </View>
            <View>
              <TouchableOpacity onPress={this.addMessage}>
                <FontAwesome>{Icons.paperPlane}</FontAwesome>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

Messages.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    elevation: 4,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
})

export default connect(mapStateToProps, {})(Messages)
