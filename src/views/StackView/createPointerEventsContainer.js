import React from 'react';
import invariant from '../../utils/invariant';
import Animated from 'react-native-reanimated';
const { cond, eq, greaterThan, abs, sub } = Animated;

const MIN_POSITION_OFFSET = 0.01;

/**
 * Create a higher-order component that automatically computes the
 * `pointerEvents` property for a component whenever navigation position
 * changes.
 */
export default function createPointerEventsContainer(Component) {
  class Container extends React.Component {
    constructor(props, context) {
      super(props, context);

      const { position } = props;
      const { index } = props.scene;

      this._pointerEvents = cond(eq(position, index), 'auto', [
        cond(greaterThan(abs(sub(position, index)), MIN_POSITION_OFFSET), [
          'box-none',
          'auto',
        ]),
      ]);
    }

    render() {
      return (
        <Component
          {...this.props}
          pointerEvents={this._pointerEvents}
          onComponentRef={this._onComponentRef}
        />
      );
    }

    _onComponentRef = component => {
      this._component = component;
      if (component) {
        invariant(
          typeof component.setNativeProps === 'function',
          'component must implement method `setNativeProps`'
        );
      }
    };
  }
  return Container;
}