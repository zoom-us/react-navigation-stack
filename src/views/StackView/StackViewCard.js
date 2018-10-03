import React from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';
import { Screen } from 'react-native-screens';
import createPointerEventsContainer from './createPointerEventsContainer';

const EPS = 1e-5;

function getAccessibilityProps(isActive) {
  if (Platform.OS === 'ios') {
    return {
      accessibilityElementsHidden: !isActive,
    };
  } else if (Platform.OS === 'android') {
    return {
      importantForAccessibility: isActive ? 'yes' : 'no-hide-descendants',
    };
  } else {
    return null;
  }
}

/**
 * Component that renders the scene as card for the <StackView />.
 */
class Card extends React.Component {
  render() {
    const {
      animatedStyle,
      children,
      pointerEvents,
      style,
      position,
      transparent,
      scene: { index, isActive },
    } = this.props;

    const active =
      transparent || isActive
        ? 1
        : position.interpolate({
            inputRange: [index, index + 1 - EPS, index + 1],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          });

    const { shadowOpacity, ...containerAnimatedStyle } = animatedStyle;

    return (
      <Screen
        pointerEvents={pointerEvents}
        onComponentRef={this.props.onComponentRef}
        style={[StyleSheet.absoluteFill, containerAnimatedStyle, style]}
        active={active}
      >
        <Animated.View style={[styles.shadow, { shadowOpacity }]} />
        <Animated.View
          {...getAccessibilityProps(isActive)}
          style={transparent ? styles.transparent : styles.card}
        >
          {children}
        </Animated.View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shadow: {
    top: 0,
    left: 2,
    bottom: 0,
    width: 2,
    position: 'absolute',
    backgroundColor: '#fff',
    shadowOffset: { width: -4, height: 0 },
    shadowRadius: 5,
    shadowColor: '#000',
  },
  transparent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

export default createPointerEventsContainer(Card);
