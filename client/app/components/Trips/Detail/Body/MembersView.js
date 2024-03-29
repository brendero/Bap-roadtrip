import React, { Component } from 'react'
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import AddMember from '../Members/AddMember';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { API_URL } from '../../../../config/dbconfig';

const memberNavigation = createStackNavigator({
  addMemberScreen: {
    screen: AddMember
  }
})
class MembersView extends Component {
  constructor(props) {
    super(props);

    this.state= {
      users: [],
      modalVisible: false
    }
    this.doIt = this.doIt.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    setTimeout(() => {
      this.doIt()
    }, 400);
  }
  getUserInfoById(id) {
    axios.get(`${API_URL}/api/users/detail/${id}`)
    .then(res => {
      this.setState({
        users: [res.data, ...this.state.users]
      })
    })
    .catch(err => console.log(err))
  }
  doIt() {
    const membersArray = this.props.members;

    if(membersArray !== undefined) {
      membersArray.forEach(user => {
        this.getUserInfoById(user)
      });
    }
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }
  render() {
    const { users } = this.state;
    return (
      <View style={{marginTop: 20}}>
        <ScrollView
        horizontal={true}>
          {(users || []).map((user, index) => (
            <Image key={index} style={styles.memberImage} source={{uri: user.avatar}}/>
          ))}
          <TouchableOpacity onPress={this.toggleModal} style={styles.addBtn}>
            <FontAwesome name="plus" style={styles.addBtnIcon}/>
          </TouchableOpacity>
        </ScrollView>
        <AddMember trip={this.props.trip} modalVisible={this.state.modalVisible} onPress={this.toggleModal}/>
      </View>
    )
  }
}

MembersView.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth
})

export default connect(mapStateToProps, {})(MembersView)

const styles = StyleSheet.create({
  memberImage: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'lightgrey' ,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtnIcon: {
    color: 'white'
  }
})