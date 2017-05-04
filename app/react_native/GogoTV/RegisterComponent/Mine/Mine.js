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

class Mine extends  Component {
  login(){
    console.log('login.')
    Navigator.push("login",{a:"a"});
  }
  render() {
    return (
      <View key="rootView" style={styles.backgroundView}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
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
  backgroundView:{
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#EEEEEE',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flex: 3,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Mine;