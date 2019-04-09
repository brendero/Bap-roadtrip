import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class OptionsHeader extends React.Component {

  render() {
    return (
      <View style={[styles.roundTop, styles.header]} >
        <View style={styles.drag} />
        <Text style={styles.title}>{this.props.name}</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  roundTop: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  drag: {
    top: 6,
    right: '50%',
    position: 'absolute',
    borderRadius: 2,
    width: 32,
    height: 3,
    backgroundColor: '#DEDEDE'
  },
  title: {
    color: 'black',
    fontWeight: 'bold'
  }
});
