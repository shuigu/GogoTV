/**
 * Created by zhuguoqing on 17/5/7.
 */

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  SectionContainerView,
  SectionLineView,
} from './../Common'

import {ThemeImages} from './../../Theme'
const CONTENT_HEIGHT = 84
// const CONTENT_HEIGHT = 40
const BORDER_RADIUS= 10

class MineInfoView extends Component {
  renderAvater(){
    return(
      <View style={styles.imageView}>
        <Image style={styles.avatarView} borderRadius={BORDER_RADIUS} source={ThemeImages.mineImages.avatar}/>
        <View style={{marginLeft:12}}>
          <Text style={{
              fontSize: 14,
              fontWeight: 'bold'
              }}>祁厅长</Text>
          <SectionLineView height={10}/>
          <Text>微信号:  qitingzhang</Text>
        </View>
      </View>
    );
  }
  render(){
    return (
      <SectionContainerView>
        <TouchableHighlight activeOpacity={0.5} underlayColor="#FFFFFF" onPress={()=>{
          if(this.props.onClick){
            this.props.onClick({test:'test text'});
          }
        }}>
          <View style={styles.rootView}>
            <View key="left" style={styles.leftView}>
              {this.renderAvater()}
            </View>
            <View key="right" style={styles.rightView}>
              <Image style={styles.rightArrowImage} source={ThemeImages.commonImages.rightArrow}/>
            </View>
          </View>
        </TouchableHighlight>
      </SectionContainerView>
    );
  }
}
const styles = StyleSheet.create({
  rootView: {
    height: CONTENT_HEIGHT,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  leftView: {
    marginLeft:12,
  },
  rightView: {
    marginRight:12,
  },
  imageView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  avatarView:{
    width:60,
    height:60,
  },
  rightArrowImage:{
    width:18,
    height:18,
  }
})
module.exports = MineInfoView;