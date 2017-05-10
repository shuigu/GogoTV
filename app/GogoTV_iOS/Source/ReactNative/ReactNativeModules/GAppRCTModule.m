//
//  GGogoTVModule.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//
#import "GAppRCTModule.h"

NSString *const KGInvokeReturnNotification = @"KGInvokeReturnNotification";
NSString *const KGDispatchNotification = @"KGDispatchNotification";

@implementation GAppRCTModule

RCT_EXPORT_MODULE()
/*
 JavaScript 通过这个方法给 native 回调数据
 */
RCT_EXPORT_METHOD(invokeReturn:(NSString *)invokeId  returnJson:(NSDictionary *)returnJson){
    NSDictionary * info = @{@"invokeId":invokeId,@"returnJson":returnJson};
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter]postNotificationName:KGInvokeReturnNotification object:info];
    });    
}
RCT_EXPORT_METHOD(dispatch:(NSString *)action paramJson:(NSDictionary *)paramJson){
    NSDictionary * info = @{@"action":action,@"paramJson":paramJson};
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter]postNotificationName:KGDispatchNotification object:info];
    });
}
@end
