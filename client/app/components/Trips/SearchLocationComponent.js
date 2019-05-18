import React, { Component } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {colors} from '../../config/styles';

export default class SearchLocationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{width: '100%', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 30, zIndex: 1}}>
      <View style={styles.SearchBar}>
        <View style={styles.formWrapper}>
          <FontAwesome name="search" style={{paddingHorizontal: 12}}/>
          <TextInput
            style={styles.searchForm}
            placeholder="search for an addres or place"
            onSubmitEditing={(event) => {
              this.props.onSubmit(event.nativeEvent.text);
            }}
          >
          </TextInput>
        </View>
      </View>
        <View style={{width: '90%', height: 200}}>
        <ScrollView >
            {this.props.searchResults ?
              this.props.searchResults.map(result => {
                const addresArray = result.display_name.split(',');

                return (
                <TouchableOpacity key={result.place_id} onPress={() => this.props.setDestination(result.display_name.split(','), result.lat, result.lon)}>
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
    margin: 0,
    height: 40,
    padding: 5
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
    width: '90%'
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
    width: '90%'
  }
})
