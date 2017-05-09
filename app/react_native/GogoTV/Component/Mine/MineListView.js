/**
 * Created by zhuguoqing on 17/5/7.
 */

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  SectionContainerView,
} from './../Common'

import {themeImages} from './../../Theme'
const CONTENT_HEIGHT = 40

class MineListView extends Component {
  renderLine(){
    return (
      <View>
        <View style={{marginLeft:18,height:1,backgroundColor:'#dddddd'}}/>
      </View>
    );
  }
  renderSection(icon,title){
    return (
      <TouchableOpacity activeOpacity={0.5} underlayColor="#FFFFFF" onPress={()=>{
        if(this.props.onClick){
            this.props.onClick({title});
          }
      }}>
        <View style={styles.rootView}>
          <View key="left" style={styles.leftView}>
            <Image style={styles.iconView} source={themeImages.commonImages.noImage}/>
            <Text style={styles.titleView}>{title}</Text>
          </View>
          <View key="right" style={styles.rightView}>
            <Image style={styles.rightArrowImage} source={themeImages.commonImages.rightArrow}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  render(){
    return (
      <SectionContainerView>
        {this.renderSection('aa','相册')}
        {this.renderLine()}
        {this.renderSection('aa','收藏')}
        {this.renderLine()}
        {this.renderSection('aa','钱包')}
        {this.renderLine()}
        {this.renderSection('aa','卡包')}
        {this.renderLine()}
        {this.renderSection('aa','表情')}
        {this.renderLine()}
        {this.renderSection('aa','设置')}
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
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  rightView: {
    marginRight:12,
  },
  iconView:{
    width:18,
    height:18,
  },
  titleView:{
    marginLeft:10,
  },
  rightArrowImage:{
    width:18,
    height:18,
  }
})
module.exports = MineListView;