import React, { Component } from 'react'
import { ScrollView, CameraRoll, Image, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class PhotoRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: {}
    }

    // this.avatarChange = this.avatarChange.bind(this);
  }
  componentDidMount() {
    this.getPhotos();
  }
  getPhotos() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  avatarChange(uri) {
    console.log(uri);
    // Save image on online image hosting service and return URL
    //change this.props.auth.user avatar
    //do Action update avatar to mongoDB
    // navigate to homescreen
    // this.props.navigation.navigate('HomeScreen');
  }
  render() {

    return (
      <ScrollView>
        {this.state.photos && JSON.stringify(this.state.photos) != "{}" ? this.state.photos.map((p, i) => {
        return (
          <TouchableOpacity onPress={() => this.avatarChange(p.node.image.uri)} key={i}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "cover"
              }}
              source={{ uri: p.node.image.uri }}
              />
          </TouchableOpacity>
          );
        }): null}
      </ScrollView>
    )
  }
}

PhotoRoll.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth 
})

export default connect(mapStateToProps, {})(PhotoRoll)
