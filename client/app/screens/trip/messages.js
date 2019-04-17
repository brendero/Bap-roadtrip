import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Messages extends Component {
  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    )
  }
}

Messages.propTypes = {
  
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps, {})(Messages)
