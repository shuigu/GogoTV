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
  ThemeImages,
} from './../../Theme'
import {Player} from './../../JSModule'


const  BAR_HEIGHT = 44
const  BUTTON_SIZE = 44

var Navigator    = require('NativeModules').GNavigationRCTModule;

class PlayerControlSmall extends Component {

  backRender(){
    return (
      <View>
        <TouchableOpacity onPress={()=>{
              Navigator.pop();
          }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={ThemeImages.commonImages.leftArrow}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  fullScreenRender(){
    return(
      <View>
        <TouchableOpacity onPress={()=>{
            Player.dispatchFullScreen();
            }}>
          <View style={styles.backButtonView}>
            <Image style={styles.backImageView} source={ThemeImages.playerImages.fullScreenButton}/>
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
  },
  backImageView:{
    width:20,
    height:20,
    tintColor:'#FFFFFF',
  },
});

module.exports = PlayerControlSmall