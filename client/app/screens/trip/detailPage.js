import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class detailPage extends Component {
  componentDidMount() {
    console.log(this.props.navigation.state.params.Trip);
  }
  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    )
  }
}

detailPage.propTypes = {
  prop: PropTypes
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {})(detailPage)
