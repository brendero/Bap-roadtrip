import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { colors, width } from '../../config/styles';
import format from '../../utils/DateTimeService';

export default class MessageItem extends Component {
  render() {
    const { user } = this.props.auth;

    if(this.props.message.user.id === user.id) {
      return (
        <View key={this.props.message._id} style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', flex: 1, width: width}}>
          <Image source={{uri: this.props.message.user.avatar}} style={{marginHorizontal: 10, width: 30, height: 30, borderRadius: 100}}/>
          <View style={{alignItems: 'flex-start', width: '80%'}}>
            <Text style={{marginVertical: 10, color: '#BDBDBD'}}>{this.props.message.user.name}</Text>
            <Text style={{color: 'white', borderRadius: 100, borderBottomLeftRadius: 0, backgroundColor: '#3F51B5', width: '100%', padding: 20, textAlign: 'left'}}>{this.props.message.body}</Text>
            <Text style={{alignSelf: 'flex-end',marginVertical: 10, color: '#BDBDBD'}}>{format(this.props.message.createdAt, 'DD/MM/YY hh:mm')}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View key={this.props.message._id} style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', flex: 1, width: width}}>
          <View style={{alignItems: 'flex-end', width: '80%'}}>
            <Text style={{marginVertical: 10, color: '#BDBDBD'}}>{this.props.message.user.name}</Text>
            <Text style={{color: 'white', borderRadius: 100, borderBottomRightRadius: 0, backgroundColor: colors.secondaryDark, width: '100%', padding: 20, textAlign: 'left'}}>{this.props.message.body}</Text>
            <Text style={{alignSelf: 'flex-start',marginVertical: 10, color: '#BDBDBD'}}>{format(this.props.message.createdAt, 'DD/MM/YY hh:mm')}</Text>
          </View>
          <Image source={{uri: this.props.message.user.avatar}} style={{marginHorizontal: 10, width: 30, height: 30, borderRadius: 100}}/>
        </View>
      )
    }
  }
}
