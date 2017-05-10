/**
 * Created by zhuguoqing on 2017/5/10.
 */
import React,{ Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  themeStyles,
} from './../../Theme'
import {
  TabBarItem,
} from './../../Component/TabBar'
import {TabConfig} from './../../Config'
var GAppModule = require('NativeModules').GAppRCTModule;

class TabBar extends  Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectIndex:TabConfig.selectedIndex,
    };
  }
  onItemPress(item,index){
    this.setState({
      selectIndex:index
    })

    GAppModule.dispatch('setTabSelectedIndex',{selectedIndex:index})
  }
  itemsRender(){
    let items = [];
    let tabs = TabConfig.tabs;
    for (let i=0;i<tabs.length;i++){
      let tab = tabs[i];
      items.push(
        <TabBarItem
          key={'key'+i}
          index={i}
          label={tab.title}
          check={i==this.state.selectIndex}
          onPress={this.onItemPress.bind(this)}/>
      )
    }
    return items;
  }
  render() {
    return (
      <View style={themeStyles.tabBarView}>
        <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
        <View style={styles.container}>
          {this.itemsRender()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'
  }
});
module.exports = TabBar;