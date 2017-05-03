//
//  TestPlayerViewController.h
//  GogoTV
//
//  Created by 朱国清 on 2017/5/3.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <IJKMediaFramework/IJKMediaFramework.h>

@interface TestPlayerViewController : UIViewController
@property(atomic, retain) id<IJKMediaPlayback> player;
@property(atomic,strong) NSURL *url;

@end


