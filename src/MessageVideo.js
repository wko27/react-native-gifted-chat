import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import VideoPlayer from 'react-native-native-video-player';

export default class MessageVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  onVideoClick() {
    VideoPlayer.showVideoPlayer(this.props.currentMessage.video);
  }
  
  render() {
    return (
      <TouchableOpacity
        onPress={this.onVideoClick.bind(this)}
        style={[styles.container, this.props.containerStyle]}
      >
        <Image
          {...this.props.videoProps}
          style={[styles.video, this.props.videoStyle]}
          source={{uri: this.props.currentMessage.video}}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  video: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
});

MessageVideo.defaultProps = {
  currentMessage: {
    video: null,
  },
  containerStyle: {},
  videoStyle: {},
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  videoStyle: Image.propTypes.style,
  videoProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
