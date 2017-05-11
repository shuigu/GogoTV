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
#import <React/RCTRootView.h>

typedef void (^JavaScriptDidLoadBlock)();
typedef void (^JSReturnValueBlock)(NSDictionary *returnJson);


@interface GBridgeManager : NSObject<RCTBridgeDelegate>

+ (instancetype)shareInstance;
+ (RCTBridge*)shareBridge;


- (void)enqueueJSCall:(NSString *)module
               method:(NSString *)method
                 args:(NSArray *)args;

- (void)enqueueJSCall:(NSString *)module
               method:(NSString *)method
                 args:(NSArray *)args
           completion:(JSReturnValueBlock) completion;

-(RCTRootView *) genRnViewWithModule:(NSString *)moduleName initProps:(NSDictionary *)initProps;

@property (nonatomic,readonly)  RCTBridge * bridge;
@property (nonatomic,strong)    JavaScriptDidLoadBlock javaScriptDidLoadBlock;

@end
