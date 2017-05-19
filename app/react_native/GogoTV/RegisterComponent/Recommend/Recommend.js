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

import {Post,NetworkConst} from './../../Network'

class Recommend extends  Component {

  // 构造
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2']),
    };
  }
  componentDidMount() {
    console.log('Post:',Post);
    console.log('Post:',NetworkConst.API_RECOM_LIST());
    Post(NetworkConst.API_RECOM_LIST()).then((res)=>{
      console.log('res:',res);
    }).catch((error)=>{
      console.log('error:',error);
    })
  }
  rowRender(rowData){
    return (
      <BigVideoGrid item={rowData}/>
    );
  }
  render() {
    let title = this.props.title;
    return (
      <View key="rootView" style={ThemeStyles.rootView}>
        <NavigationBar title={title}/>
        <View style={ StyleCombine(ThemeStyles.defaultContainer,ThemeStyles.scrollView)}>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={ this.rowRender.bind(this)}
          />
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