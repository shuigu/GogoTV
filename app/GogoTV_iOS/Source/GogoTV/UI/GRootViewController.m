//
//  GRootViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GRootViewController.h"
#import <Masonry.h>
#import "GBottomTabView.h"
#import "GRCTViewController.h"
#import "GBridgeManager.h"

@interface GRootViewController (){
    
    GBottomTabView * tabView;
    UIView * contentView;
    GRCTViewController * currentViewController;
}

@end

@implementation GRootViewController{
    NSMutableArray<GRCTViewController *> * viewControllers;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self initTabView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
}
- (void)initTabView{
    // contentView 显示内容
    contentView = [[UIView alloc]init];
    [contentView setBackgroundColor:UIColorFromHex(0xf5fcff)];
    [self.view addSubview:contentView];
    // tabView 显示下部tab
    tabView = [[GBottomTabView alloc]init];
    [self.view addSubview:tabView];    
    WS(ws);
    [tabView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.bottom.right.equalTo(ws.view);
        make.width.equalTo(ws.view);
        make.height.equalTo(@55);
    }];    
    
    [contentView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(ws.view);
        make.bottom.equalTo(tabView.mas_top);
    }];
    WS(weakSelf);
    [tabView setTabViewSelectedBlock:^(NSInteger index){
        [weakSelf showViewControllerWithIndex:index];
    }];
    
}
-(void)setTabConfig:(NSDictionary *)tabConfig{

    _tabConfig = tabConfig;
    
    [self removeAllChildViewController];
    NSArray * tabs = [tabConfig valueForKey:@"tabs"];
    if (tabs) {
        NSArray * titles = [tabs mutableArrayValueForKey:@"title"];
        [tabView addTabItemWithTitles:titles];
        for (int i =0; i < tabs.count; i++) {
            NSDictionary * tab = tabs[i];
            NSString * moduleName = [tab valueForKey:@"moduleName"];
            GRCTViewController * rctVC = [[GRCTViewController alloc]initWithBridge:[GBridgeManager shareBridge]                                                                        moduleName:moduleName
                                                                 initialProperties:tab];
            [self addViewController:rctVC];
        }
    }
    NSInteger index = 3;
    [tabView setCheckWithIndex:index];
    [self showViewControllerWithIndex:index];

}
-(void)removeAllChildViewController{
    currentViewController = nil;
    for (GRCTViewController *vc in viewControllers) {
        [vc.view removeFromSuperview];
        [vc removeFromParentViewController];
    }
    
    [viewControllers removeAllObjects];
    [tabView removeAllChileViews];
}
-(void)addViewController:(GRCTViewController *)viewController{
    if (!viewControllers) {
        viewControllers = [NSMutableArray array];
    }
    [viewControllers addObject:viewController];
    
    [viewController.view setFrame:contentView.bounds];
    viewController.view.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
    contentView.autoresizesSubviews = YES;
    
    
    [contentView addSubview:viewController.view];
    
    [self addChildViewController:viewController];
    currentViewController = viewController;
}

-(void)showViewControllerWithIndex:(NSInteger)index{
    if (viewControllers.count < 1) {
        return;
    }
    GRCTViewController * newViewController = [viewControllers objectAtIndex:index];
    if (!newViewController) {
        return;
    }
    if (newViewController == currentViewController) {
        return;
    }
    [self transitionFromViewController:currentViewController
                      toViewController:newViewController
                              duration:0
                               options:0 animations:^{
                                   
                               } completion:^(BOOL finished) {
                                   currentViewController = newViewController;
                               }];
    
}

@end
