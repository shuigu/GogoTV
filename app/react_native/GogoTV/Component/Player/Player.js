/**
 * Created by zhuguoqing on 2017/5/10.
 */
import React,{ Component } from 'react';
import {
  StyleSheet,
  requireNativeComponent,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
var GRCTPlayerView = requireNativeComponent('GRCTPlayerView', null);
class Player extends Component {

  render(){
    return (
      <GRCTPlayerView style={this.props.style}>

      </GRCTPlayerView>
    )
  }
}
module.exports = Player
