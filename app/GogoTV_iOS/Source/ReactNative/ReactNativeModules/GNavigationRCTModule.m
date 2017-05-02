//
//  GNavigationRCTModule.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GNavigationRCTModule.h"
#import "GNavigatorManager.h"
#import "GRCTViewController.h"
#import "GBridgeManager.h"
@implementation GNavigationRCTModule
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(push:(NSString *)moduleName initProps:(NSDictionary *)initProps){
    dispatch_async(dispatch_get_main_queue(), ^{
        GRCTViewController * vc = [[GRCTViewController alloc]initWithBridge:[GBridgeManager shareInstance].bridge
                                                                 moduleName:moduleName
                                                          initialProperties:initProps];
        [[GNavigatorManager shareInstance].rootNavigationViewController pushViewController:vc animated:YES];
    });

}
RCT_EXPORT_METHOD(pop){
    dispatch_async(dispatch_get_main_queue(), ^{
        [[GNavigatorManager shareInstance].rootNavigationViewController popViewControllerAnimated:YES];
    });
}
@end
