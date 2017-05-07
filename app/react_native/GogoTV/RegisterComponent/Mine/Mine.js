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
  ScrollView,
} from 'react-native';
import {
  NavigationBar,
  SctionLineView
} from './../../Component/Common'
import {
  themeStyles,
} from './../../Theme'
import {MineInfoView} from './../../Component/Mine'

class Mine extends  Component {
  login(){
    console.log('login.')
    Navigator.push("login",{a:"a"});
  }
  infoRender(){
    return (
      <MineInfoView/>
    );
  }
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar title={title}/>
        <ScrollView style={themeStyles.scrollView}>
          <SctionLineView height="15" />
          {this.infoRender()}
          <SctionLineView height="20" />
          {this.infoRender()}
        </ScrollView>
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
  sectionLine: {
    height:20,
  }
});
module.exports = Mine;