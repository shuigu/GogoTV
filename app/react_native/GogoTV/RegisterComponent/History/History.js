/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationBar,
  HistoryCell,
} from './../../Component/Common'
import {
  Grid,
  ThemeStyles,
  ThemeColors,
  StyleCombine,
} from './../../Theme'
import {HistoryList,NetworkStatic} from './../../Network'
var GNavigator = require('NativeModules').GNavigationRCTModule;

class History extends  Component {
  // 构造
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    // 初始状态
    this.state = {
      loading:true,
      dataSource: [],
    };
  }
  componentDidMount() {
    HistoryList().then((results)=>{
      console.log('results:',results);
      this.updateDataSource(res.datas);
    }).catch((error)=>{
      console.log('error:',error);
      if (error){
        // 启用本地数据
        let res = NetworkStatic.historyList;
        console.log('error res :',res);
        this.updateDataSource(res.datas);
      }
    });
  }
  componentWillUnmount() {
    this.ds = null;
  }
  updateDataSource(newDataSource){
    if(this.ds){
      this.setState({
        loading:false,
        dataSource:this.ds.cloneWithRows(newDataSource),
      })
    }
  }
  onItemPress(rowData){
    console.log('onItemPress',rowData)
    let params = {
      ...rowData,
      isPlayer:true
    }
    GNavigator.push('noUserModuleName',params)
  }
  rowRender(rowData){
    return (
     <HistoryCell onPress={this.onItemPress.bind(this)} item={rowData}/>
    );
  }
  loadingRender(){
    return (
      <View>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  listRender(){
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={ this.rowRender.bind(this)}
        showsVerticalScrollIndicator={false}
      />
    )
  }
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={ThemeStyles.rootView}>
        <NavigationBar title={title}/>
        <View style={ StyleCombine(ThemeStyles.defaultContainer,ThemeStyles.scrollView)}>
          {
            this.state.loading?this.loadingRender():this.listRender()
          }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  list: {
    marginTop:Grid.a*1,
    flexWrap:'wrap',
    width:Grid.a * Grid.aMax,

  },
});
module.exports = History;