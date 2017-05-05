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

class History extends  Component {
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar title={title}/>
        <View style={themeStyles.defaultContainer}>
          <Text style={styles.welcome}>
            History page
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
module.exports = History;