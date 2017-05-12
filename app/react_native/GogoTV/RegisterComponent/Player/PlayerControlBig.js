/**
 * Created by zhuguoqing on 2017/5/11.
 */

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  themeImages,
} from './../../Theme'
import {
  PlayerDispatch
} from './../../Constant/dispatch'

const  BAR_HEIGHT = 44
const  BUTTON_SIZE = 44

var GAppModule = require('NativeModules').GAppRCTModule;

class PlayerControlBig extends Component {

  backRender(){
    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>{
            GAppModule.dispatch(PlayerDispatch.PLAYER_PORTRAIT_SCREEN,{})
          }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={themeImages.commonImages.leftArrow}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  topBarRender(){
    return (
      <View style={styles.topBarView}>
        {this.backRender()}
      </View>
    )
  }
  render(){
    return (
      <View style={styles.rootView}>
        {this.topBarRender()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  rootView:{
    flex:1,
  },
  topBarView:{
    height:BAR_HEIGHT,
  },
  backButtonView:{
    alignItems:'center',
    width:BUTTON_SIZE,
    height:BUTTON_SIZE,
    justifyContent:'center',
  },
  backImageView:{
    width:20,
    height:20,
    tintColor:'#FFFFFF',
  },
});
module.exports = PlayerControlBig