/**
 * Created by zhuguoqing on 2017/5/4.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  themeImages,
  themeColors,
} from './../../Theme'
var Navigator    = require('NativeModules').GNavigationRCTModule;

let IS_IOS      = Platform.OS === 'ios';
let BAR_HEIGHT  = 40;
let STATUS_BAR_HEIGHT = 22;


class NavigationBar extends Component{

  statusRender(){
    if(IS_IOS){
      return (
        <View style={styles.statusView}/>
      );
    }
  }
  rightRender(){
    if (!this.props.showBackButton){
      return ;
    }
    return (
      <View style={{flex:1}}/>
    )
  }
  backButtonRender(){
    if (!this.props.showBackButton){
      return ;
    }
    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>{
          if(this.props.backClick){
            this.props.backClick();
          }else{
            Navigator.pop();
          }
        }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={themeImages.commonImages.leftArrow}/>
            <Text style={styles.backText}>{"返回"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render(){
    let title = this.props.title || "";
    return (
      <View style={styles.rootView}>
        {this.statusRender()}
        <View style={styles.contentView}>
          {this.backButtonRender()}
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {this.rightRender()}
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
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  backButtonView:{
    position: 'relative',
    top:0,
    left:0,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:8,
  },
  backImageView:{
    width:15,
    height:15,
    tintColor:'#FFFFFF',
  },
  backText:{
    fontSize: 12,
    marginLeft:5,
    fontWeight: 'bold',
    color:'#FFFFFF'
  },
  titleView:{
    flex:1,
    alignItems:'center',
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'#FFFFFF'
  }
});

module.exports = NavigationBar;

