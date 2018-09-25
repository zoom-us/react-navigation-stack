import React from 'react';
import { Button, WebView, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { StackGestureContext } from 'react-navigation-stack';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';

const IndexScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Go to MapView" onPress={() => navigation.navigate('Map')} />
    <Button title="Go to WebView" onPress={() => navigation.navigate('Web')} />
    <Button title="Return to other examples" onPress={() => navigation.navigate('Home')} />
  </View>
);

IndexScreen.navigationOptions = {
  title: 'Gesture Interactions'
};

class MapScreen extends React.Component {
  render() {
    return (
      <StackGestureContext.Consumer>
        {ref => (
          <NativeViewGestureHandler waitFor={ref}>
            <MapView style={{ flex: 1 }} />
          </NativeViewGestureHandler>
        )}
      </StackGestureContext.Consumer>
    );
  }
}

MapScreen.navigationOptions = {
  title: 'MapView',
};
const WebViewScreen = () => (
  <StackGestureContext.Consumer>
    {ref => (
      <NativeViewGestureHandler waitFor={ref}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: 'https://news.google.com' }}
        />
      </NativeViewGestureHandler>
    )}
  </StackGestureContext.Consumer>
);

WebViewScreen.navigationOptions = {
  title: 'WebView',
};

export default createStackNavigator({
  Index: IndexScreen,
  Map: MapScreen,
  Web: WebViewScreen,
});
