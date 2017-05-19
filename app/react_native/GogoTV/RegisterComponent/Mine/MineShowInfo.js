/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';
var Navigator    = require('NativeModules').GNavigationRCTModule;
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationBar,
} from './../../Component/Common'
import {
  ThemeStyles,
} from './../../Theme'

class MineShowInfo extends  Component {
  back(){
    Navigator.pop();
  }
  render() {
    let textContent = this.props.content || '请输入内容'
    let title = this.props.title || '标题';
    return (
      <View key="rootView" style={ThemeStyles.rootView}>
        <NavigationBar showBackButton={true} title={title}/>
        <View style={styles.container}>
          <Text>{textContent}</Text>
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
module.exports = MineShowInfo;