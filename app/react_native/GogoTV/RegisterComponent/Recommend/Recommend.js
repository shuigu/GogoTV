/**
 * Created by zhuguoqing on 17/4/27.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
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

import {Post,NetworkConst,NetworkStatic} from './../../Network'

class Recommend extends  Component {
  // 构造
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading:true,
      dataSource: [],
    };
  }
  componentDidMount() {
    Post(NetworkConst.API_RECOM_LIST()).then((res)=>{
      console.log('res',res)
      this.updateDataSource(res.datas);
    }).catch((error)=>{
      console.log('error:',error);
      if (error){
        // 启用本地数据
        let res = NetworkStatic.videoList;
        console.log('error res :',res);
        this.updateDataSource(res.datas);
      }
    })
  }
  componentWillUnmount() {
    this.ds = null;
  }
  updateDataSource(newDataSource){
    this.setState({
      loading:false,
      dataSource:this.ds.cloneWithRows(newDataSource)
    })
  }


  onItemClick(rowData){
    console.log('onItemClick',rowData)

  }
  rowRender(rowData){
    return (
      <BigVideoGrid item={rowData} onPress={this.onItemClick.bind(this)}/>
    );
  }
  loadingRender(){
    return (
      <View>
        <Text>loading...</Text>
      </View>
    )
  }
  listRender(){
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={ this.rowRender.bind(this)}
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
    marginTop:Grid.a,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'

  },
});

module.exports = Recommend;