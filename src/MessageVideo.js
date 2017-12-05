import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Video,
  View,
  ViewPropTypes,
} from 'react-native';
import Lightbox from 'react-native-lightbox';

export default class MessageVideo extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Lightbox
          activeProps={{
            style: styles.videoActive,
          }}
          {...this.props.lightboxProps}
        >
          <Video
            {...this.props.videoProps}
            style={[styles.video, this.props.videoStyle]}
            source={{uri: this.props.currentMessage.video}}
          />
        </Lightbox>
      </View>
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
  videoActive: {
    flex: 1,
    resizeMode: 'contain',
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
  videoStyle: Video.propTypes.style,
  videoProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
