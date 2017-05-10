/**
 * Created by zhuguoqing on 2017/5/10.
 */
import React,{ Component } from 'react';
var Navigator    = require('NativeModules').GNavigationRCTModule;

import {
  StyleSheet,
  requireNativeComponent,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationBar,
} from './../../Component/Common'
import {
  themeStyles,
} from './../../Theme'
import {Player} from './../../Component/Player'


class TestPlayer extends  Component {
  back(){
    Navigator.pop();
  }
  render() {
    let textContent = this.props.content || '请输入内容'
    let title = this.props.title || '标题';
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar showBackButton={true} title={title}/>
        <View style={styles.container}>
          {
            // <Player style={styles.playerView}/>
          }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerView:{
    backgroundColor: '#000000',
    width:320,
    height:180,
  }

});
module.exports = TestPlayer;