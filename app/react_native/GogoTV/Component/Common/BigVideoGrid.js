/**
 * Created by zhuguoqing on 2017/5/19.
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


class BigVideoGrid extends Component {

  onClick(){
    let item = this.props.item;
    if (this.props.onPress){
      this.props.onPress(item)
    }
  }
  render(){
    let score = this.props.item.score?this.props.item.score:'0.0';
    let name = this.props.item.videoName?this.props.item.videoName:'名称';

    return (
      <View style={styles.root}>
        <TouchableHighlight onPress={this.onClick.bind(this)}>
          <Image source={ThemeImages.commonImages.bigGridBkgImage} style={styles.image}>
            <View style={styles.topView}>
              <View style={styles.scoreView}>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            </View>
            <View style={{flex:1}}/>
            <View style={styles.bottomView}>
              <Text style={styles.title}>{name}</Text>
            </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
}

const GRID_W = Grid.a * 23;
const GRID_H = GRID_W * 0.56;
const GRID_MARGIN = GRID_W * 0.1;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: GRID_W,
    height: GRID_H,
    margin: GRID_MARGIN,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  image:{
    width: GRID_W,
    height: GRID_H,
    backgroundColor: 'transparent'
  },
  topView:{
    height:Grid.a *4.0,
    flexDirection:'row-reverse',
  },
  scoreView:{
    opacity: 0.6,
    width:Grid.a * 3.5,
    height:Grid.a * 3.5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',

  },
  scoreText:{
    color:'#fff',
    fontSize: Grid.a * 1.7,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  bottomView: {
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.6,
    height:Grid.a *3.2,
  },
  title:{
    color:'#fff',
    fontSize: Grid.a * 1.8,
    fontWeight: 'bold',
    marginLeft:Grid.a,
  }
});


module.exports = BigVideoGrid