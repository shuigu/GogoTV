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
import {NavigationBar} from './../../Component/Common'
import {
  themeStyles,
} from './../../Theme'



class Mine extends  Component {
  login(){
    console.log('login.')
    Navigator.push("login",{a:"a"});
  }
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar title={title}/>
        <ScrollView style={themeStyles.scrollView}>
            <View style={themeStyles.defaultContainer}>
              <Text style={styles.welcome}>
                Mine page
              </Text>
              <TouchableOpacity onPress={this.login}>
                <Text>登录</Text>
              </TouchableOpacity>
            </View>
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
});
module.exports = Mine;