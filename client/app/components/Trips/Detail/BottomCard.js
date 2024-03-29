import React, { Component } from 'react'
import { View, TouchableHighlight, Animated, StyleSheet } from 'react-native'
import { height } from '../../../config/styles'
import GestureRecognizer from "react-native-swipe-gestures"
import OptionsHeader from './Header'
import OptionsBody from './Body';

export default class BottomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 200,
      offset: height - 150,
      bottom: new Animated.Value(-(height - 150))
    };
  }
  openOptions() {
    this.setState({ open: true });
    Animated.timing(this.state.bottom, {
      toValue: -20,
      duration: this.state.duration
    }).start();
  }

  closeOptions() {
    this.setState({ open: false });
    Animated.timing(this.state.bottom, {
      toValue: -this.state.offset,
      duration: this.state.duration
    }).start();
  }

  toggleOpen() {
    if (this.state.open) {
      this.closeOptions();
    } else {
      this.openOptions();
    }
  }
  render() {
    const { tripData, locationFunction } = this.props;

    return (
      <Animated.View style={[styles.container, { bottom: this.state.bottom }]}>
        <View style={[styles.options, styles.roundTop]}>
          <TouchableHighlight style={styles.roundTop} onPress={this.toggleOpen.bind(this)}>
            <GestureRecognizer onSwipeUp={() => this.openOptions()} onSwipeDown={() => this.closeOptions()}>
              <OptionsHeader name={tripData.name}/>
            </GestureRecognizer>
          </TouchableHighlight>
          
          <OptionsBody locationFunction={locationFunction} trip={tripData} style={{ paddingBottom: 200 }} />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: "100%",
    elevation: 3,
    zIndex: 999,
    paddingHorizontal: 10,
  },
  options: {
    backgroundColor: 'white',
    height: height - 100,
    flex: 1,
    paddingHorizontal: 10
  },
  roundTop: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8
  }

})