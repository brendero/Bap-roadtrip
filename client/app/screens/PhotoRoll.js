import React, { Component } from 'react'
import { View, ScrollView, CameraRoll, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { colors } from '../config/styles';
import axios from 'axios';

class PhotoRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: '',
      selectedPhotoId: '',
      photos: {}
    }

    this.avatarChange = this.avatarChange.bind(this);
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
  avatarSelect(uri, id) {
    this.setState({
      selectedPhoto: uri,
      selectedPhotoId: id
    });
        
  }
  
  avatarChange() {
    console.log(this.state.selectedPhoto);
    // Save image on online image hosting service and return URL
    const cloud = 'duzvjytv0 '
    const uploadPreset = 'roadtrip'

    const upload_url = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`

    //put the image in a formData
    let formdata = new FormData();
    formdata.append('file', {uri: this.state.selectedPhoto, type: 'image/png'});
    formdata.append('upload_preset', uploadPreset);

    console.log(formdata);

    axios.post(upload_url, formdata)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    //change this.props.auth.user avatar
    //do Action update avatar to mongoDB
    // navigate to homescreen
    // this.props.navigation.navigate('HomeScreen');
  }
  render() {

    return (
      <View style={{height: '100%'}}>
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-evenly"}}>
        {this.state.photos && JSON.stringify(this.state.photos) != "{}" ? this.state.photos.map((p, i) => {
          return (
              <TouchableOpacity onPress={() => this.avatarSelect(p.node.image.uri, i)} key={i}>
              <Image
                  style={[styles.imageStyle, this.state.selectedPhotoId === i ? styles.imageBorder : '' ]}
                  source={{ uri: p.node.image.uri }}
                  />
              </TouchableOpacity>

          );
        }): null}
      
      </ScrollView>
      {this.state.selectedPhoto ? <TouchableOpacity style={styles.confirmBtn} onPress={this.avatarChange}><FontAwesome style={{fontSize: 20, color: "white"}}>{Icons.paperPlaneO}</FontAwesome></TouchableOpacity> : null}
      </View>
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

const styles = StyleSheet.create({
  confirmBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    backgroundColor: colors.secondaryLight,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  imageBorder: {
    borderColor: '#0900ff',
    borderWidth: 5
  }
});