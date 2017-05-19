/**
 * Created by zhuguoqing on 2017/5/17.
 */

module.exports = {
  userInfo:{
    tableName:'user_info',
    columns:{
      id:       'user_id',
      name:     'user_name',
      no:       'user_no',
      password: 'pass_word',
      sex:      'user_sex',
      addTime:  'add_time',
    },
  },
  videoInfo:{
    tableName:'video_info',
    columns:{
      id:       'video_id',
      name:     'video_name',
      logoUrl:  'video_logo_url',
      screenShotUrl:  'video_screen_shot_url',
      score:    'video_score',
      describe: 'video_describe',
      playUrl:  'video_play_url',
      type:     'video_type',
      addTime:  'add_time',
    },
  },
  userHistoryInfo:{
    tableName:'user_history_info',
    columns:{
      id:       'history_id',
      duration: 'history_duration',
      userId:   'user_id',
      videoId:  'video_id',
      addTime:  'add_time',
    },
  }
}