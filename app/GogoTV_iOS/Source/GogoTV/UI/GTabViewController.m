//
//  GTabViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/21.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GTabViewController.h"
#import "GRCTViewController.h"
#import "GBridgeManager.h"
@interface GTabViewController ()

@end

@implementation GTabViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)setTabConfig:(NSDictionary *)tabConfig{
    _tabConfig = tabConfig;
    self.viewControllers = nil;
    NSMutableArray * vcs = [NSMutableArray array];
    NSArray * tabs = [tabConfig valueForKey:@"tabs"];
    if (tabs) {
        for (int i =0; i < tabs.count; i++) {
            NSDictionary * tab = tabs[i];
            NSString * title = [tab valueForKey:@"title"];
            NSString * moduleName = [tab valueForKey:@"moduleName"];
            GRCTViewController * rctVC = [[GRCTViewController alloc]initWithBridge:[GBridgeManager shareBridge]
                                                                        moduleName:moduleName
                                                                 initialProperties:nil];
            GNavigationViewController * nav = [[GNavigationViewController alloc]initWithRootViewController:rctVC];
            nav.tabBarItem.title = title;
            [vcs addObject:nav];
        }
    }
    if (vcs) {
        self.viewControllers = vcs;
    }
}

@end
