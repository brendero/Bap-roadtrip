import React, { Component } from 'react'
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import FontAwesome, {Icons } from 'react-native-fontawesome';

export default class MembersView extends Component {
  constructor(props) {
    super(props);

    this.state= {
      users: []
    }
    this.doIt = this.doIt.bind(this);
  }
  componentWillMount() {
    setTimeout(() => {
      this.doIt()
    }, 400);
  }
  getUserInfoById(id) {
    axios.get(`http://10.0.2.2:5000/api/users/${id}`)
    .then(res => {
      this.setState({
        users: [res.data, ...this.state.users]
      })
    })
    .catch(err => console.log(err))
  }
  doIt() {
    const membersArray = this.props.members;
    console.log(membersArray);
    if(membersArray !== undefined) {
      membersArray.forEach(user => {
        this.getUserInfoById(user)
      });
    }
  }
  render() {
    const { users } = this.state;
    console.log(this.state.users)
    return (
      <View style={{marginTop: 20}}>
        <ScrollView
        horizontal={true}>
          {(users || []).map((user, index) => (
            <Image key={index} style={styles.memberImage} source={{uri: user.avatar}}/>
          ))}
          <TouchableOpacity style={styles.addBtn}>
            <FontAwesome style={styles.addBtnIcon}>{Icons.plus}</FontAwesome>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

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