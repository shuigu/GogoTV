/**
 * Created by zhuguoqing on 17/5/7.
 */

import React,{ Component } from 'react';
import {
  View,
} from 'react-native';
class SectionLineView extends Component {
  render(){
    let style = {
      height: this.props.height || 20,
    };
    return (
      <View style={style}/>
    );
  }
}
module.exports = SectionLineView