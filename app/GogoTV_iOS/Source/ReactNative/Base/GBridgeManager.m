//
//  GReactManager.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GBridgeManager.h"
#import "GUtil.h"


static GBridgeManager * bridgeManager;

@implementation GBridgeManager{
    NSMutableDictionary<NSString*,JSReturnValueBlock> * invokeMap;
}
#pragma mark - 静态函数
+(instancetype)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        bridgeManager = [[GBridgeManager alloc]init];
    });
    return bridgeManager;
}
+(RCTBridge*)shareBridge{
    return [GBridgeManager shareInstance].bridge;
}
#pragma mark - 成员函数
-(instancetype)init{
    if (self=[super init]) {
        invokeMap = [[NSMutableDictionary alloc]init];
        [[NSNotificationCenter defaultCenter]addObserver:self
                                                selector:@selector(onGAppInvokeReturnNotification:)
                                                    name:KGInvokeReturnNotification
                                                  object:nil];
        [self createBridge];
    }
    return self;
}
-(void)createBridge{
    _bridge = [[RCTBridge alloc]initWithDelegate:self launchOptions:NULL];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(javaScriptDidLoad:)
                                                 name:RCTJavaScriptDidLoadNotification
                                               object:_bridge];
}
- (void)enqueueJSCall:(NSString *)module
               method:(NSString *)method
                 args:(NSArray *)args{
    [_bridge enqueueJSCall:module method:method args:args completion:nil];
}
- (void)enqueueJSCall:(NSString *)module
               method:(NSString *)method
                 args:(NSArray *)args
           completion:(JSReturnValueBlock) completion{
    
    NSString * uuid = [GUtil uuid];
    invokeMap[uuid] = completion;
    NSMutableArray * newArgs = args?[args mutableCopy]:[NSMutableArray array];
    [newArgs insertObject:uuid atIndex:0];
    
    [_bridge enqueueJSCall:module method:method args:newArgs completion:nil];
}
-(void)onGAppInvokeReturnNotification:(NSNotification *)notification{
    NSString * invokeId = [notification.object valueForKey:@"invokeId"];
    NSDictionary * returnValue = [notification.object valueForKey:@"returnJson"];
    if (invokeId && returnValue) {
        JSReturnValueBlock block = [invokeMap valueForKey:invokeId];
        if (block) {
            block(returnValue);
            [invokeMap removeObjectForKey:invokeId];
        }
    }
}
#pragma mark - RCTBridgeDelegate
-(NSURL *)sourceURLForBridge:(RCTBridge *)bridge{
    return [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
}

#pragma mark - javaScript notification
- (void)javaScriptDidLoad:(NSNotification *)notification{
    if (self.javaScriptDidLoadBlock) {
        self.javaScriptDidLoadBlock();
    }
}

@end
