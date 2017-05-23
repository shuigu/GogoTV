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
  RefreshControl,
} from 'react-native';
import {
  NavigationBar,
  BigVideoGrid,
} from './../../Component/Common'
import {
  Grid,
  ThemeStyles,
  ThemeColors,
  StyleCombine,
} from './../../Theme'

import {RecomList,NetworkStatic} from './../../Network'

var GNavigator = require('NativeModules').GNavigationRCTModule;

class Recommend extends  Component {
  // 构造
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(r1, r2) => r1 !== r2,
      getSectionData:this.getSectionData,
    });
    this.state = {
      loading:true,
      isRefreshing:false,
      dataSource: [],
    };
  }
  componentDidMount() {
    this.fetchRecomList();
  }
  componentWillUnmount() {
    this.ds = null;
  }
  fetchRecomList(callback) {
    RecomList().then((res)=>{
      console.log('res',res)
      this.updateDataSource(res.datas);
      callback&&callback();
    }).catch((error)=>{
      console.log('error:',error);
      if (error){
        // 启用本地数据
        let res = NetworkStatic.videoList;
        console.log('error res :',res);
        this.updateDataSource(res.datas);
      }
      callback&&callback();
    })
  }
  updateDataSource(newDataSource){
    let count = 8;
    let datas = {
      sectionId1:newDataSource.slice(0,count),
      sectionId2:newDataSource.slice(count,newDataSource.length),
    }
    if(this.ds){
      this.setState({
        loading:false,
        dataSource:this.ds.cloneWithRowsAndSections(datas)
      })
    }
  }
  onRefresh(){
    this.fetchRecomList(function () {
      this.setState({isRefreshing: false});
    }.bind(this));
    this.setState({isRefreshing: true});
  }
  getRowData(datas,sectionId,rowId){
    return datas[sectionId][rowId];
  }
  onItemClick(rowData){
    console.log('onItemClick',rowData)
    let params = {
      ...rowData,
      isPlayer:true
    }
    GNavigator.push('noUserModuleName',params)
  }
  rowRender(rowData){
    return (
      <BigVideoGrid item={rowData} onPress={this.onItemClick.bind(this)}/>
    );
  }
  loadingRender(){
    return (
      <View>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  renderSectionHeader(sectionDatas,sectionId){
    let titles = {sectionId1:'为您推荐:',sectionId2:'经典在线:'};
    let title = titles[sectionId];
    return (
      <View style={styles.sectionHeaderView}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )
  }
  listRender(){
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={ this.rowRender.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            tintColor="#666666"
            title="Loading..."
            titleColor="#666666"
          />
        }
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sectionHeaderView:{
    height:Grid.a * 5,
    width:Grid.a * 25 *2 + Grid.a * 1.5 * 4,
    justifyContent: 'center',
    ...ThemeStyles.scrollView
  },
  sectionHeaderText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'#666666'
  }

});

module.exports = Recommend;