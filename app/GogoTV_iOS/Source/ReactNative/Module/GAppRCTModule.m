//
//  GGogoTVModule.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//
#import "GAppRCTModule.h"

NSString *const KGInvokeValueNotification = @"KGInvokeValueNotification";

@implementation GAppRCTModule
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(returnInvoke:(NSString *)invokeId  returnValue:(NSDictionary *)returnValue){
    NSDictionary * info = @{@"invokeId":invokeId,@"returnValue":returnValue};
    [[NSNotificationCenter defaultCenter]postNotificationName:KGInvokeValueNotification object:info];
}

@end
