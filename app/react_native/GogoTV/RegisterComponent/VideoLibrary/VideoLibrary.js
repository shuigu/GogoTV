/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {NavigationBar} from './../../Component/Common'
import {
  themeStyles,
} from './../../Theme'


class VideoLibrary extends  Component {
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar title={title}/>
        <View style={themeStyles.defaultContainer}>
          <Text style={styles.welcome}>
            VideoLibrary page
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = VideoLibrary;