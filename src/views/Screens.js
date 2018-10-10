import { createScreenComponents } from 'react-native-screens';
import Reanimated from 'react-native-reanimated';

const { Screen, ScreenContainer } = createScreenComponents(Reanimated.createAnimatedComponent);

export {
  Screen,
  ScreenContainer,
};