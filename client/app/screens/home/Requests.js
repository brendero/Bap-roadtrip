import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import RequestItem from '../../components/Trips/RequestItem';

export default class Requests extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <RequestItem></RequestItem>
        <RequestItem></RequestItem>
        <RequestItem></RequestItem>
        <RequestItem></RequestItem>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})