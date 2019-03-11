import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import ArchiveItem from '../../components/Trips/ArchiveItem';

export default class Archive extends Component {
  render() {
    return (
      <ScrollView style={{height: '100%'}}>
        <ArchiveItem></ArchiveItem>
        <ArchiveItem></ArchiveItem>
        <ArchiveItem></ArchiveItem>
      </ScrollView>
    )
  }
}
