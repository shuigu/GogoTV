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

class Login extends  Component {
  back(){
    Navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          login page
        </Text>
        <TouchableOpacity onPress={this.back}>
          <Text>返回</Text>
        </TouchableOpacity>
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
module.exports = Login;