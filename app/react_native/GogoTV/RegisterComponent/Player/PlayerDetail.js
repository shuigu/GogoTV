/**
 * Created by zhuguoqing on 2017/5/11.
 */

import React,{ Component } from 'react';
import {
  StyleSheet,
  requireNativeComponent,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ThemeStyles,
} from './../../Theme'

class PlayerDetail extends Component {
  render(){
    return (
      <ScrollView style={ThemeStyles.scrollView}>
        <View>
          <Text>{'视频名:'+this.props.videoName}</Text>
          <Text>{'评分:'+this.props.score}</Text>
          <Text>{'地址:'+this.props.playUrl}</Text>
        </View>
    </ScrollView>
    )
  }
}
module.exports = PlayerDetail