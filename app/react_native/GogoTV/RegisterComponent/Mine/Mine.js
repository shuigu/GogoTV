/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';
var Navigator    = require('NativeModules').GNavigationRCTModule;
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  NavigationBar,
  SectionLineView,
} from './../../Component/Common'
import {
  themeStyles,
} from './../../Theme'
import {
  MineInfoView,
  MineListView
} from './../../Component/Mine'


class Mine extends  Component {
  onMineInfoClick(data){
    Navigator.push('mineShowInfo',{content:'用户信息',title:'用户信息'})
  }
  onMineListItemClick(data){
    let {itemTitle} = data;
    Navigator.push('mineShowInfo',{content:itemTitle,title:itemTitle})
  }
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={themeStyles.rootView}>
        <NavigationBar title={title}/>
        <ScrollView style={themeStyles.scrollView}>
          <SectionLineView height={15} />
          <MineInfoView onClick={this.onMineInfoClick}/>
          <SectionLineView height={20} />
          <MineListView onClick={this.onMineListItemClick}/>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sectionLine: {
    height:20,
  }
});
module.exports = Mine;