import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    }
  }
  render() {
    return (
      <View style={{width: '100%', flexDirection: 'row',justifyContent: 'center', position: 'absolute', top: 20, zIndex: 1}}>
        <View style={styles.SearchBar}>
          <View style={styles.formWrapper}>
            <FontAwesome style={{paddingHorizontal: 12}}>{Icons.search}</FontAwesome>
            <TextInput 
              value={this.state.searchQuery}
              style={styles.searchForm}
              placeholder="search for an addres or place"
              onChangeText={value => {
                this.setState({
                  searchQuery: value
                });
              }}
              >
            </TextInput>
          </View>
          <View style={styles.messageWrapper}>
            <TouchableOpacity onPress={this.props.messageOnPress}>
              <FontAwesome>{Icons.commentsO}</FontAwesome>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    width: '90%',
    borderRadius: 100,
    margin: 0,
    padding: 0
  },
  formWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  searchForm: {
    padding: 0,
    margin:0,
    width: '70%'
  },
  messageWrapper: {
    justifyContent: 'center',
    borderLeftColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 1,
    borderLeftWidth: 1,
    paddingVertical: 13,
    paddingLeft: 8,
    paddingRight: 20
  }
})
