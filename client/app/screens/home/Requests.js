import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import RequestItem from '../../components/Trips/RequestItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequests } from '../../actions/requestActions';

class Requests extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRequests();
  }
  render() {
    const { requests } = this.props.request;

    return (
      <ScrollView style={styles.container}>
        {requests && JSON.stringify(requests) != "{}" ? requests.map(({ _id, requestingUserId, tripId }) => (
          <RequestItem id={_id} key={_id} requesterId={requestingUserId} trip={tripId}></RequestItem>          
        )) : <Text>No requests yet for this user</Text>}
      </ScrollView>
    )
  }
}

Requests.propTypes = {
  request: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  request: state.request
})

export default connect(mapStateToProps, {getRequests})(Requests)

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})