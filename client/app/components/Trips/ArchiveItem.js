import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../config/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTrip, updateTrip } from '../../actions/tripActions';
import GestureRecognizer from 'react-native-swipe-gestures';

class ArchiveItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnToggle: false
    }

    this.onDelete = this.onDelete.bind(this);
    this.onRestore = this.onRestore.bind(this);
  }
  openButtons() {
    this.setState({
      btnToggle: true
    })
  }
  closeButtons() {
    this.setState({
      btnToggle: false
    })
  }
  onRestore() {
    const restorableTrip = {
      id: this.props.id,
      archived: false
    }

    this.props.updateTrip(restorableTrip);
  }
  onDelete() {
    this.props.deleteTrip(this.props.id);
  }
  render() {
    return (
      <View style={[styles.mainWrapper, this.state.btnToggle ? styles.btnShow : '']}>

      <GestureRecognizer onSwipeLeft={() => this.openButtons()} onSwipeRight={() => this.closeButtons()}>
      {/* Add onPress event to View */}
      <Animated.View style={styles.container} >
          <View style={styles.infoWrapper}>
              <Text style={styles.tripName}>{this.props.name}</Text>
              <Text style={styles.tripDestination}>{this.props.location}</Text>
          </View>
          <View style={styles.membersContainer}>
            <Text style={styles.memberNumber}>{this.props.membersCount}</Text>
            <FontAwesome name="user-o" style={styles.memberIcon}/>
          </View>
          <View style={styles.bookmarkIcon}>
            <FontAwesome name="bookmark" style={{fontSize: 30, color: colors.secondaryDark}}/>
          </View>

      </Animated.View>
      </GestureRecognizer>
      <Animated.View style={[styles.btnWrapper, this.state.btnToggle ? styles.openBtn : styles.closedBtn]}>
        <TouchableOpacity style={styles.restoreBtn} onPress={this.onRestore}>
          <FontAwesome name="undo" style={styles.btnIcon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={this.onDelete}>
          <FontAwesome name="times" style={styles.btnIcon}/>
        </TouchableOpacity>
      </Animated.View>
      </View>
    )
  }
}
ArchiveItem.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  updateTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { deleteTrip, updateTrip })(ArchiveItem)

const styles = StyleSheet.create({
  mainWrapper: {
    width: '90%',
    alignSelf:'center',
    justifyContent: 'flex-end'
  },
  btnShow: {
    flexDirection:'row'
  },
  container: {
    width: '100%',
    height: 110,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    padding: 10,
    marginTop: 19,
    borderRadius: 10
  },
  tripThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  infoWrapper: {
    marginLeft: 10
  },
  tripName: {
    fontFamily: 'roboto',
    fontSize: 16,
    color: 'rgba(0,0,0,1)'
  },
  tripDestination: {
    fontFamily: 'roboto',
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  },
  membersContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  memberNumber: {
    marginRight: 4
  },
  btnWrapper: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginLeft: 10,
  },  
  closedBtn: {
    display: 'none'
  },
  openBtn: {
    display: 'flex'
  },
  deleteBtn: {
    backgroundColor: '#E40606',
    height: 110,
    width: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  restoreBtn: {
    backgroundColor: colors.secondaryDark,
    height: 110,
    width: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  btnIcon: {
    color: 'white',
    fontSize: 25
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 0,
    left: 315
  }
})