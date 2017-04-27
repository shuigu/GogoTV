/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class Mine extends  Component {
  login(){
    console.log('login.')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Mine page
        </Text>
        <TouchableOpacity onPress={this.login}>
          <Text>登录</Text>
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
module.exports = Mine;