/**
 * Created by zhuguoqing on 2017/5/10.
 */
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {ThemeImages} from './../../Theme'

const CHECK_COLOR    = "#26Ab68"
const UN_CHECK_COLOR = "#9d9da1"
const CHECK_TINT_COLOR    = "#26Ab68"
const UN_CHECK_TINT_COLOR = "#7a7e83"



class TabBarItem extends Component{
// 构造
  onPress(){
    if (this.props.onPress){
      this.props.onPress(this,this.props.index)
    }
  }
  render(){
    let label = this.props.label || 'label'
    let icon  = this.props.icon  || ThemeImages.commonImages.noImage
    let iconStyle = this.props.check
      ? {...objStyles.iconView,tintColor:CHECK_TINT_COLOR}
      :{...objStyles.iconView,tintColor:UN_CHECK_TINT_COLOR}
    let labelStyle = this.props.check
      ?{...objStyles.labelView,color:CHECK_COLOR}
      :{...objStyles.labelView,color:UN_CHECK_COLOR}
    return (
      <View style={styles.rootView}>
        <TouchableOpacity activeOpacity={1}style={styles.rootView} onPress={this.onPress.bind(this)}>
          <View style={styles.containerView}>
            <Image ef="icon" style={iconStyle} source={icon}/>
            <Text  ref="label" style={labelStyle}>{label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rootView:{
    flex:1,
  },
  containerView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
})

const objStyles={
  iconView:{
    marginTop:5,
    width:24,
    height:24,
  },
  labelView:{
    fontSize:10,
    marginTop:8,
  }
}

module.exports = TabBarItem