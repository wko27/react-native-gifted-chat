import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import Video from 'react-native-video';

export default class MessageVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  onVideoClick() {
    console.log("Playing in full screen")
    console.log(this.player);
    this.setState({isPlaying: !this.state.isPlaying});
    this.player.presentFullscreenPlayer();
  }
  
  render() {
    return (
      <TouchableOpacity
        onPress={this.onVideoClick.bind(this)}
        style={[styles.container, this.props.containerStyle]}
      >
        <Lightbox
          activeProps={{
            style: styles.videoActive,
          }}
          {...this.props.lightboxProps}
        >
          <Image
            {...this.props.videoProps}
            style={[styles.video, this.props.videoStyle]}
            source={{uri: this.props.currentMessage.video}}
          />
        </Lightbox>
        <Video
          source={{uri: this.props.currentMessage.video}}
          ref={(ref) => {this.player = ref}}       // Store reference
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={false}                           // Mutes the audio entirely.
          paused={!this.state.isPlaying}                          // Pauses playback entirely.
          resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
          repeat={false}                           // Repeat forever.
          playInBackground={false}                // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          ignoreSilentSwitch={"obey"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          onLoadStart={this.loadStart}            // Callback when video starts to load
          onLoad={this.setDuration}               // Callback when video loads
          onProgress={this.setTime}               // Callback every ~250ms with currentTime
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.videoError}               // Callback when video cannot be loaded
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
          style={this.state.isPlaying ? styles.hiddenVideo : styles.backgroundVideo}
        />
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
  hiddenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
