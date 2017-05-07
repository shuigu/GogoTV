/**
 * Created by zhuguoqing on 2017/5/4.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  themeStyles,
  themeColors,
  styleCombine
} from './../../Theme'


let IS_IOS      = Platform.OS === 'ios';
let BAR_HEIGHT  = 34;
let STATUS_BAR_HEIGHT = 22;


class NavigationBar extends Component{

  statusRender(){
    if(IS_IOS){
      return (
        <View style={styles.statusView}/>
      );
    }
  }
  render(){
    let title = this.props.title || "";
    return (
      <View style={styles.rootView}>
        {this.statusRender()}
        <View style={styles.contentView}>
          <Text style={styles.titleView}>{title}</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  rootView:{
    ...themeColors.statusBkgColor,
  },
  statusView:{
    height:STATUS_BAR_HEIGHT,
  },
  contentView:{
    height:BAR_HEIGHT,
    justifyContent:'center',
    alignItems:'center'
  },
  titleView:{
    color:'#FFFFFF'
  }
});

module.exports = NavigationBar;

