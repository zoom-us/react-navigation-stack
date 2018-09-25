import React from 'react';
import { Button, WebView, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { GestureContext } from 'react-navigation-stack';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';

const IndexScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Go to MapView" onPress={() => navigation.navigate('Map')} />
    <Button title="Go to WebView" onPress={() => navigation.navigate('Web')} />
  </View>
);

class MapScreen extends React.Component {
  render() {
    return (
      <GestureContext.Consumer>
        {ref => (
          <NativeViewGestureHandler waitFor={ref}>
            <MapView style={{ flex: 1 }} />
          </NativeViewGestureHandler>
        )}
      </GestureContext.Consumer>
    );
  }
}

MapScreen.navigationOptions = {
  title: 'MapView',
};
const WebViewScreen = () => (
  <NativeViewGestureHandler>
    <WebView style={{ flex: 1 }} source={{ uri: 'https://news.google.com' }} />
  </NativeViewGestureHandler>
);

WebViewScreen.navigationOptions = {
  title: 'WebView',
};

const DrawerExample = createStackNavigator(
  {
    Index: IndexScreen,
    Map: MapScreen,
    Web: WebViewScreen,
  },
  {
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default DrawerExample;
