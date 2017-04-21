//
//  GReactViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/20.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GRCTViewController.h"

@implementation GRCTViewController{
    RCTBridge *     _bridge;
    NSString *      _moduleName;
    NSDictionary *  _initialProperties;
    RCTRootView *   _rootView;
}
- (instancetype)initWithBridge:(RCTBridge *)bridge
                    moduleName:(NSString *)moduleName
             initialProperties:(NSDictionary *)initialProperties{
    if (self = [super init]) {
        _bridge             = bridge;
        _moduleName     	= moduleName;
        _initialProperties  = initialProperties;
    }
    return self;
}
-(void)viewDidLoad{
    _rootView = [[RCTRootView alloc]initWithBridge:_bridge moduleName:_moduleName initialProperties:_initialProperties];
    _rootView.frame = self.view.frame;
    [self.view addSubview:_rootView];
}
@end
