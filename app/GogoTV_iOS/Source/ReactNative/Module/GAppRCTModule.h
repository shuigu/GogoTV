//
//  GGogoTVModule.h
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

extern NSString *const KGInvokeValueNotification;


typedef void(^TabConfigCompletedBlock)(NSDictionary * tabConfig);

@interface GAppRCTModule : NSObject<RCTBridgeModule>



@property (nonatomic) NSDictionary * tabConfig;

-(void)getTabConfigWithCompleted:(void(^)(NSDictionary * tabConfig)) completed;
@end
