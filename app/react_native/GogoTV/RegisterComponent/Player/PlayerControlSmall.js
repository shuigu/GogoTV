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

var Navigator    = require('NativeModules').GNavigationRCTModule;
var GAppModule = require('NativeModules').GAppRCTModule;

class PlayerControlSmall extends Component {

  backRender(){
    return (
      <View>
        <TouchableOpacity onPress={()=>{
              Navigator.pop();
          }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={themeImages.commonImages.leftArrow}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  fullScreenRender(){
    return(
      <View>
        <TouchableOpacity onPress={()=>{
            GAppModule.dispatch(PlayerDispatch.PLAYER_FULL_SCREEN,{})
            }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={themeImages.playerImages.fullScreenButton}/>
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
  bottomBarRender(){
    return (
      <View style={styles.bottomBarView}>
        {this.fullScreenRender()}
      </View>
    )
  }
  render(){
    return (
      <View style={styles.rootView}>
        {this.topBarRender()}
        <View style={{flex:1}}/>
        {this.bottomBarRender()}
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
  bottomBarView:{
    height:BAR_HEIGHT,
    marginBottom:0,
    flexDirection:'row-reverse'
  },
  backButtonView:{
    alignItems:'center',
    width:BUTTON_SIZE,
    height:BUTTON_SIZE,
    justifyContent:'center',
    backgroundColor:'#000000',
    opacity:0.8,
  },
  backImageView:{
    width:15,
    height:15,
    tintColor:'#FFFFFF',
  },
});

module.exports = PlayerControlSmall