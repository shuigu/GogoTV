/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

console.log("index.js begin");

import {GogoTV} from './GogoTV'

export default class App1 extends Component {
  // 构造
  constructor(props) {
    super(props);
    console.log("app constructor.");
  }
  componentWillUnmount() {
    console.log("app componentWillUnMount.");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

class App2 extends  Component {
  // 构造
  constructor(props) {
    super(props);
    console.log("app1");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          app2 app2 app2 app2
        </Text>
      </View>
    );
  }
}
class App3 extends  Component {
  // 构造
  constructor(props) {
    super(props);
    console.log("app1");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          app3 app3 app3 app3
        </Text>
      </View>
    );
  }
}
class App4 extends  Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          app3 app3 app3 app3
        </Text>
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

AppRegistry.registerComponent('app1', () => App1);
AppRegistry.registerComponent('app2', () => App2);
AppRegistry.registerComponent('app3', () => App3);
AppRegistry.registerComponent('app4', () => App4);
