import React, { Component } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'

export default class MembersView extends Component {
  constructor(props) {
    super(props);

    this.state= {
      users: {}
    }
  }
  // componentDidMount() {
  //   const membersArray = this.props.members;

  //   membersArray.forEach(user => {
      
  //   });
  // }
  render() {
    return (
      <View>
        <ScrollView
          horizontal={true}>
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})