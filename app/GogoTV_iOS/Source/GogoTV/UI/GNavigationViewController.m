//
//  GNavigationViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/21.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GNavigationViewController.h"

@interface GNavigationViewController ()

@end

@implementation GNavigationViewController

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    self.navigationBarHidden = YES;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
