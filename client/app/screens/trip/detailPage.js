import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class detailPage extends Component {
  constructor(props) {
    super(props); 
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params.Trip);
  }
  render() {
    return (
      <View>
        <Text> {this.props.navigation.state.params.Trip} </Text>
      </View>
    )
  }
}

detailPage.propTypes = {
  
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {})(detailPage)
