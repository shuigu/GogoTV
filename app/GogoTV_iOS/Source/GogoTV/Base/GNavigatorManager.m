//
//  GNavigatorManager.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/21.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GNavigatorManager.h"
GNavigatorManager * gNavigatorManager;

@implementation GNavigatorManager{
    
}
+(instancetype)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        gNavigatorManager = [[GNavigatorManager alloc]init];
        [gNavigatorManager setup];
    });
    return gNavigatorManager;
}
-(void)setup{
    CGRect screenFrame = [UIScreen mainScreen].bounds;
    _window = [[UIWindow alloc]initWithFrame:screenFrame];
    _window.backgroundColor = [UIColor whiteColor];
    
    _tabViewController = [[GTabViewController alloc]init];
    _window.rootViewController = _tabViewController;
    
    [_window makeKeyAndVisible];
    
}
-(void)setTabConfig:(NSDictionary *)tabConfig{
    _tabConfig = tabConfig;
    dispatch_sync(dispatch_get_main_queue(), ^{
        [_tabViewController setTabConfig:tabConfig];
    });
    
}
@end
