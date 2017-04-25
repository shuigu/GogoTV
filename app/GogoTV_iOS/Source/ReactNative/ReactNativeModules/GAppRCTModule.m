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
/*
 JavaScript 通过这个方法给 native 回调数据
 */
RCT_EXPORT_METHOD(sendData:(NSString *)key  data:(NSDictionary *)data){
    if (key) {
        NSDictionary * info = @{@"key":key,@"data":data};
        [[NSNotificationCenter defaultCenter]postNotificationName:KGInvokeValueNotification object:info];
    }
}
@end
