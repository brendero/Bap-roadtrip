import React, { Component } from 'react'
import { StyleSheet, View, TextInput, ScrollView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class SearchLocationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{width: '100%', flexDirection: 'row',justifyContent: 'center', position: 'absolute', top: 30, zIndex: 1}}>
      <View style={styles.SearchBar}>
        <View style={styles.formWrapper}>
          <FontAwesome style={{paddingHorizontal: 12}}>{Icons.search}</FontAwesome>
          <TextInput 
            style={styles.searchForm}
            placeholder="search for an addres or place"
            onSubmitEditing={(event) => {
              this.props.onSubmit(event.nativeEvent.text);
            }}
          >
          </TextInput>
        </View>
        <ScrollView>
          <View>
            {this.props.searchResult ? 
              this.props.searchResult.map(result => (
                <View key={result.place_id}>
                    <Text>{result.display_name}</Text>
                    <Text>{result.lat}</Text>
                    <Text>{result.lon}</Text>
                </View>
              ))
            }   
          </View> 
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
  }
})
