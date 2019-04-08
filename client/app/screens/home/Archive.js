import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import ArchiveItem from '../../components/Trips/ArchiveItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Archive extends Component {
  render() {
    const { trips } = this.props.trip;

    return (
      <ScrollView style={{height: '100%'}}>
        {trips && JSON.stringify(trips) != "{}" ? trips.map(({ _id, name, location, collaborators, archived }) => (
            !archived ? null : <ArchiveItem name={name} location={location.addres} membersCount={collaborators.length} id={_id} key={_id}></ArchiveItem>      
          )) : <Text>No archive yet for this user</Text>}
      </ScrollView>
    )
  }
}

Archive.propTypes = {
  trip: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  trip: state.trip
})

export default connect(mapStateToProps, {})(Archive)
