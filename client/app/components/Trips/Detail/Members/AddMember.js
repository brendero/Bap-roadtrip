import React, { Component } from 'react'
import { Text, TextInput, Modal, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import {colors} from '../../../../config/styles';
import { addRequest } from '../../../../actions/requestActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { API_URL } from '../../../../config/dbconfig';

class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredUsers: []
    }

    this.searchUsers = this.searchUsers.bind(this);
  }
  searchUsers(value) {
    axios.get(`${API_URL}/api/users/search?filter=${value}`)
      .then(res => {
        this.setState({filteredUsers: res.data})
      })
      .catch(err => console.log(err))
  }
  makeNewRequest(id) {
    const { trip } = this.props;

    const tripData = {
      name: trip.name,
      id: trip._id
    }
    const requestData = {
      invitedUser: id,
      trip: tripData
    }
    // TODO: if request is added then put away add button and make it a confirmation
    this.props.addRequest(requestData)
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.searchInput}>
            <TextInput
              value={this.state.filterQuery}
              onChangeText={value => this.searchUsers(value)}
              placeholder="Search for users"
              style={styles.inputText}
            />
            <FontAwesome name="search"/>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            {
              this.state.filteredUsers.length !== 0 ? 
              this.state.filteredUsers.map(user => (
                <View key={user._id} style={styles.userWrapper}>
                    <View>
                      <Image source={{uri: user.avatar}} style={styles.profileImage}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', marginLeft: 5, justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                      <Text style={{fontWeight: 'bold'}}>{user.name}</Text>
                      <Text>{user.email}</Text>
                    </View>
                  <View>
                    <TouchableOpacity style={styles.addBtn} onPress={() => this.makeNewRequest(user._id)}>
                      <FontAwesome name="plus" style={styles.addBtnIcon}/>
                    </TouchableOpacity>
                  </View>
                </View>
                  )) : <Text>No user with that Name or email</Text>
                }
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={this.props.onPress}
            >
              <Text style={{color: 'white', fontWeight: "700"}}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </Modal>
    )
  } 
}

AddMember.propTypes = {
  addRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request,
})

export default connect(mapStateToProps, {addRequest})(AddMember)

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
  },
  searchInput: {
    width: '100%',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  inputText: {
    width: '90%'
  },
  userWrapper: {
    width: '90%',
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 2
  },
  addBtn: {
    backgroundColor: colors.secondaryLight,
    padding: 10,
    borderRadius: 100
  },
  addBtnIcon: {
    color: 'white',
  },
  profileImage: {
    width: 50, 
    height: 50, 
    resizeMode: 'cover', 
    borderRadius: 100
  },
  cancelBtn: {
    backgroundColor: colors.secondaryDark,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})