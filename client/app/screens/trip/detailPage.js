import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BottomCard from '../../components/Trips/Detail/BottomCard';

class DetailPage extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      trip: ''
    }
  }
  componentDidMount() {
    const { trips } = this.props.trip;

    const tripData = trips.find(trip => trip._id == this.props.navigation.state.params.Trip);

    this.setState({
      trip: tripData
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>JWT</Text>
        <BottomCard tripData={this.state.trip}/>
      </View>
    )
  }
}

DetailPage.propTypes = {
  trip: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, {})(DetailPage)

const styles = StyleSheet.create({
})