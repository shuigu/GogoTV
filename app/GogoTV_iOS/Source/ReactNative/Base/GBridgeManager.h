//
//  GReactManager.h
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTBridgeDelegate.h>
#import "GAppRCTModule.h"

typedef void (^JavaScriptDidLoadBlock)();
typedef void (^getTabConfigBlock)(NSDictionary *tabConfig);

@interface GBridgeManager : NSObject<RCTBridgeDelegate>

+ (instancetype)shareInstance;
+ (RCTBridge*)shareBridge;


- (void)enqueueJSCall:(NSString *)module
               method:(NSString *)method
                 args:(NSArray *)args;


@property (nonatomic,readonly)  RCTBridge * bridge;
@property (nonatomic,strong)    JavaScriptDidLoadBlock javaScriptDidLoadBlock;
@property (nonatomic,strong)    getTabConfigBlock      getTabConfigBlock;

@end
