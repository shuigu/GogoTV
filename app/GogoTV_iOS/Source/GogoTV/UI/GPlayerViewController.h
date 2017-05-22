//
//  GPlayerViewController.h
//  GogoTV
//
//  Created by 朱国清 on 2017/5/10.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <IJKMediaFramework/IJKMediaFramework.h>

@interface GPlayerViewController : UIViewController

-(instancetype)initWithPlayUrl:(NSString *)playUrl;
-(instancetype)initWithInitProps:(NSDictionary *)initProps;


@property(atomic, retain) id<IJKMediaPlayback> player;
@property(atomic,strong) NSURL *url;
@property(nonatomic) NSDictionary   *defautlProps;



@end
