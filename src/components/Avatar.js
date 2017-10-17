import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';


const DEFAULT_COLORS = ['#000', '#333', '#555', '#888', '#aaa', '#ddd'];

const Avatar = props => {
  const {
    component,
    onPress,
    onLongPress,
    containerStyle,
    source,
    small,
    medium,
    large,
    xlarge,
    avatarStyle,
    rounded,
    title,
    titleStyle,
    overlayContainerStyle,
    activeOpacity,
    ...attributes
  } = props;

  let { width, height } = props;

  if (small) {
    width = 34;
    height = 34;
  } else if (medium) {
    width = 50;
    height = 50;
  } else if (large) {
    width = 75;
    height = 75;
  } else if (xlarge) {
    width = 150;
    height = 150;
  } else if (!width && !height) {
    width = 34;
    height = 34;
  } else if (!width) {
    width = height;
  } else if (!height) {
    height = width;
  }

  let titleSize = width / 2;

  let Component = onPress || onLongPress ? TouchableOpacity : View;
  if (component) {
    Component = component;
  }


  const renderContent = () => {
    if (source) {
      return (
        <Image
          style={[
            styles.avatar,
            rounded && { borderRadius: width / 2 },
            avatarStyle && avatarStyle,
          ]}
          source={source}
        />
      );
    } else if (title) {
      return (
        <Text style={[styles.title, titleStyle && titleStyle]}>
          {title}
        </Text>
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: 'transparent',
      width: width,
      height: height,
    },
    avatar: {
      width: width,
      height: height,
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    title: {
      color: '#ffffff',
      fontSize: titleSize,
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DEFAULT_COLORS[4],
      ...Platform.select({
        ios: {
          shadowColor: DEFAULT_COLORS[0],
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 2,
          shadowOpacity: 0.5,
        },
        android: {
          elevation: 1,
        },
      }),
    },
  });

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        rounded && { borderRadius: width / 2 },
        containerStyle && containerStyle,
      ]}
      {...attributes}
    >
      <View
        style={[
          styles.overlayContainer,
          rounded && { borderRadius: width / 2 },
          overlayContainerStyle && overlayContainerStyle,
        ]}
      >
        {renderContent()}
      </View>
    </Component>
  );
};


Avatar.propTypes = {
  component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.any,
  source: Image.propTypes.source,
  avatarStyle: PropTypes.any,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  overlayContainerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
};


export default Avatar;
