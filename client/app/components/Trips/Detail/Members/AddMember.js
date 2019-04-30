import React, { Component } from 'react'
import { Text, TextInput, Modal, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import axios from 'axios';
import {colors} from '../../../../config/styles';

export default class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberModalVisible: true,
      filteredUsers: []
    }

    this.searchUsers = this.searchUsers.bind(this);
  }
  searchUsers(value) {
    axios.get(`http://10.0.2.2:5000/api/users/search?filter=${value}`)
      .then(res => {
        console.log(res);
        this.setState({filteredUsers: res.data})
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.memberModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            <TextInput
              value={this.state.filterQuery}
              onChangeText={value => this.searchUsers(value)}
            />
          </View>
          <ScrollView>
            <Text>
            {
              this.state.filteredUsers === [] ? 
              this.state.filteredUsers.map((avatar, email, name, _id) => (
                <Text>{avatar}</Text>
                <Text>{email}</Text>
                <Text>{name}</Text>
                <Text>{_id}</Text>
              )) : 'true'
            }
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.setState({memberModalVisible: false})}
            >
            <FontAwesome>{Icons.times} cancel</FontAwesome>
          </TouchableOpacity>
        </View>
      </View> 
    </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  wrapper: {
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    elevation: 3
  }
})