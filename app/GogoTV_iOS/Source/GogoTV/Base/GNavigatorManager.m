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
    
    _rootViewController = [[GRootViewController alloc]init];
    _rootNavigationViewController = [[GNavigationViewController alloc]initWithRootViewController:_rootViewController];
    _window.rootViewController = _rootNavigationViewController;
    
    [_window makeKeyAndVisible];
    
}
@end
