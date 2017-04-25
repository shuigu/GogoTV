//
//  AppDelegate.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/18.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "AppDelegate.h"
#import "GBridgeManager.h"
#import "GNavigatorManager.h"

/*
  几个重要的单例
 GBridgeManager - 管理Bridge的
 GAppRCTModule  - 由RN创建的，
 
 
 */

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // 1.显示初始化UI
    [GNavigatorManager shareInstance];
    // 2. 加载JSBundle ,并监听加完成时间
    [[GBridgeManager shareInstance] setJavaScriptDidLoadBlock:^{
        // 获取tabConfig
        [[GBridgeManager shareInstance]enqueueJSCall:@"AppModule" method:@"getTabConfig" args:nil];
    }];
    // 3. 获取tabConfig成功的回调
    [[GBridgeManager shareInstance]setGetTabConfigBlock:^(NSDictionary * tabConfig){
        [[GNavigatorManager shareInstance]setTabConfig:tabConfig];
    }];
    // 
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
}

- (void)applicationWillTerminate:(UIApplication *)application {
}

@end
