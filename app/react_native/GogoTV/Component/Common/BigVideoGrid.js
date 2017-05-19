/**
 * Created by zhuguoqing on 2017/5/19.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Grid
} from '../../Theme'


class BigVideoGrid extends Component {
  render(){
    return (
      <View style={styles.root}>
        <View style={styles.container}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    margin: Grid.a ,
    width: Grid.a * 25,
    height: Grid.a * 25 * 0.56,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },

  container: {
    flex:1,

    backgroundColor:'#ff0000',

  },
});


module.exports = BigVideoGrid