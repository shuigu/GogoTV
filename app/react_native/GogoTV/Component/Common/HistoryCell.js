/**
 * Created by zhuguoqing on 2017/5/23.
 */

import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  Grid,
  ThemeImages,
} from '../../Theme'

class HistoryCell extends Component{
  onPress(){
    if(this.props.onPress){
      this.props.onPress(this.props.item);
    }
  }
  render(){
    let item = this.props.item;
    let title = item.videoName?item.videoName:'标题';
    let duration = this.getDurationString(item.duration?item.duration:0);
    return (
      <TouchableHighlight onPress={this.onPress.bind(this)}>
        <View style={styles.root}>
          <View style={styles.leftView}>
            <Image source={ThemeImages.commonImages.bigGridBkgImage} style={styles.imageView}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
            </Image>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  getDurationString(duration){
    let iDuration = parseInt(duration);
    let string = '您已经观看了'
    if (iDuration <=60){
      return string + iDuration + '秒';
    }else if(iDuration > 60 && iDuration <= 3600){
      return string + parseInt(iDuration/60) + '分钟'+iDuration%60+'秒';
    }else{
      return string +parseInt(iDuration/3600) + '小时'+ parseInt(parseInt(iDuration%3600)/60) + '分钟'+iDuration%60+'秒';
    }
  }
}
const CELL_H  = Grid.a * 12;
const IMG_H   = Grid.a * 9;
const IMG_W   = IMG_H * 1.78;

const styles = StyleSheet.create({
  root: {
    height: CELL_H,
    backgroundColor: '#F6F6F6',
    margin:0.5,
    flexDirection:'row',
  },
  leftView:{
    backgroundColor: '#FF0000',
    width:IMG_W,
    height:IMG_H,
    marginLeft:Grid.a * 2,
    alignSelf:'center',
  },
  imageView:{
    width:IMG_W,
    height:IMG_H,
    backgroundColor: 'transparent',
    flexDirection:'column-reverse'
  },
  titleView:{
    backgroundColor: '#000',
    opacity: 0.6,
    height:Grid.a *2.6,
    flexDirection:'row-reverse',
    alignItems:'center',
  },
  titleText:{
    color:'#fff',
    fontSize: Grid.a * 1.5,
    fontWeight: 'bold',
    marginRight:Grid.a * 0.5,
  },
  rightView:{
    flex:1,
    marginLeft:Grid.a * 2,
  },
  durationText:{
    color:'#666666',
    fontSize: Grid.a * 1.5,
    marginTop:Grid.a * 2.0,
  },
});

module.exports = HistoryCell;

