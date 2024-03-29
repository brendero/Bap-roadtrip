import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { colors } from '../../config/styles';
import { connect } from 'react-redux';
import { deleteTrip, updateTrip } from '../../actions/tripActions';
import PropTypes from 'prop-types';

class TripItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnToggle: false
    }

    this.onArchive = this.onArchive.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
  onArchive() {
    const archivableTrip = {
      id: this.props.id,
      archived: true
    }
    this.props.updateTrip(archivableTrip);
  }
  onDelete() {
    this.props.deleteTrip(this.props.id);
  }
  render() {    
    return (
      <View style={[styles.mainWrapper, this.state.btnToggle ? styles.btnShow : '']}>
      <GestureRecognizer onSwipeLeft={() => this.openButtons()} onSwipeRight={() => this.closeButtons()}>
      <TouchableOpacity onPress={this.props.onPress}>
      <Animated.View style={styles.container}>
          <View style={styles.infoWrapper}>
              <Text style={styles.tripName}>{this.props.name}</Text>
              <Text style={styles.tripDestination}>{this.props.location}</Text>
          </View>
          <View style={styles.membersContainer}>
            <Text style={styles.memberNumber}>{this.props.membersCount}</Text>
            <FontAwesome name="user-o" style={styles.memberIcon}/>
          </View>
      </Animated.View>
      </TouchableOpacity>
      </GestureRecognizer>
      <Animated.View style={[styles.btnWrapper, this.state.btnToggle ? styles.openBtn : styles.closedBtn]}>
        <TouchableOpacity style={styles.archiveBtn} onPress={this.onArchive}>
          <FontAwesome name="bookmark" style={styles.btnIcon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={this.onDelete}>
          <FontAwesome name="times" style={styles.btnIcon}/>
        </TouchableOpacity>
      </Animated.View>
      </View>
    )
  }
}

TripItem.propTypes = {
  deleteTrip: PropTypes.func.isRequired,
  updateTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, { deleteTrip, updateTrip })(TripItem)

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
  archiveBtn: {
    backgroundColor: colors.secondaryLight,
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
  }
})