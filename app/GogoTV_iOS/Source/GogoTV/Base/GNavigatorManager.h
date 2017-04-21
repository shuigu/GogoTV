//
//  GNavigatorManager.h
//  GogoTV
//
//  Created by 朱国清 on 17/4/21.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "GTabViewController.h"

@interface GNavigatorManager : NSObject
+ (instancetype)shareInstance;



@property (nonatomic) NSDictionary * tabConfig;
@property (nonatomic) UIWindow * window;
@property (nonatomic) GTabViewController * tabViewController;

@end
