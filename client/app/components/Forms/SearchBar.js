import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {forwardGeocoding} from '../../utils/LocationService';
import { colors } from '../../config/styles';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: []
    }
  }
  onSubmit() {
    // This works but don't make to many requests 
    forwardGeocoding(this.state.searchQuery)
      .then(res => {
        this.setState({
          searchResults: res.data
        })
      })
      .catch(err => console.log(err))    
  }
  render() {
    const { searchResults } = this.state;

    return (
      <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 20, zIndex: 2}}>
        <View style={styles.SearchBar}>
          <View style={styles.formWrapper}>
            <FontAwesome name="search" style={{paddingHorizontal: 12}}/>
            <TextInput 
              value={this.state.searchQuery}
              style={styles.searchForm}
              placeholder="search for an addres or place"
              onChangeText={value => {
                this.setState({
                  searchQuery: value
                });
              }}
              onSubmitEditing={() => {
                this.onSubmit();
              }}
            >
            </TextInput>
          </View>
          <View style={styles.messageWrapper}>
            <TouchableOpacity onPress={this.props.messageOnPress}>
              <FontAwesome name="comments-o"/>
            </TouchableOpacity>
          </View>
        </View>
      <View style={{width: '90%', height: 200}}>
      <ScrollView >
          {searchResults ?
            searchResults.map(result => {
              const addresArray = result.display_name.split(',');

              return (
              <TouchableOpacity key={result.place_id} onPress={() => {
                this.setState({
                  searchResults: []
                })
                this.props.setDestination(result.display_name.split(','), result.lat, result.lon)
              }}>
                <View style={styles.searchResultsWrapper} >
                <FontAwesome
                  name={  
                    (result.class === "building") ? "home" : 
                    (result.class === "tourism") ? "map-pin": "home"
                  }
                  style={styles.searchResultIcon}>
                  
                </FontAwesome>
                <Text style={styles.searchResultAddres}>{ addresArray[1] } { addresArray[0] } { addresArray[2] }</Text>
                </View>
              </TouchableOpacity>
            )
            }): null
          }
        </ScrollView>
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
  },
  searchResultsWrapper: {
    paddingHorizontal: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    backgroundColor: 'white'
  },
  searchResultIcon: {
    color: colors.secondaryDark, 
    marginRight: 5
  },
  searchResultAddres: {
    borderBottomWidth: 0.5, 
    paddingVertical: 10, 
    width: '80%'
  }
})
