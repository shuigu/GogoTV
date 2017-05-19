/**
 * Created by zhuguoqing on 2017/5/8.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  ThemeStyles,
  ThemeColors,
} from './../../Theme'

class SectionContainerView extends Component {
  renderLine(){
    return (
      <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
    );
  }
  render(){
    return (
      <View style={styles.rootView}>
          {this.renderLine()}
          {this.props.children}
          {this.renderLine()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView:{
    flex:1,
    justifyContent:'space-between',
    ...ThemeColors.contentViewBkgColor,
  }
});
module.exports = SectionContainerView