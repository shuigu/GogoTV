# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: gogo_db
# Generation Time: 2017-05-17 06:02:57 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user_history_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_history_info`;

CREATE TABLE `user_history_info` (
  `history_id` int(10) NOT NULL COMMENT '历史记录id',
  `history_duration` int(10) DEFAULT '0' COMMENT '观看时长',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `video_id` int(10) NOT NULL COMMENT '视频Id',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id\n',
  `user_name` varchar(10) DEFAULT NULL COMMENT '用户名字，可重复、空\n\n',
  `user_no` int(10) NOT NULL,
  `pass_word` varchar(20) NOT NULL COMMENT '用户密码，MD5加密',
  `user_age` int(3) DEFAULT '18' COMMENT '年龄',
  `user_sex` int(1) DEFAULT '1' COMMENT '性别 1:男 2:女',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_no_UNIQUE` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table video_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_info`;

CREATE TABLE `video_info` (
  `video_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '视频id',
  `video_name` varchar(20) NOT NULL COMMENT '视频名字',
  `video_logo_url` varchar(100) DEFAULT '' COMMENT '视频logo地址',
  `video_screen_shot_url` varchar(100) DEFAULT '' COMMENT '视频截屏地址',
  `video_score` varchar(3) DEFAULT '0.0' COMMENT '评分10分制如： 9.3',
  `video_describe` varchar(256) DEFAULT '' COMMENT '描述',
  `video_play_url` varchar(100) DEFAULT '' COMMENT '播放链接',
  `video_type` int(3) DEFAULT '0' COMMENT '视频类型，暂时不用',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  UNIQUE KEY `video_name_UNIQUE` (`video_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
