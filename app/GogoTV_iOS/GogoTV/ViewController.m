//
//  ViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/18.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSURL *jsCodeLocation;
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"app"
                                                  initialProperties:nil
                                                      launchOptions:nil];
    [rootView setFrame:self.view.frame];
    
    [self.view addSubview:rootView];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
