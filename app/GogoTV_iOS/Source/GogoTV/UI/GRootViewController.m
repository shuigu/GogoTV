//
//  GRootViewController.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GRootViewController.h"
#import <Masonry.h>
#import "GRCTViewController.h"
#import "GBridgeManager.h"
#import <React/RCTRootView.h>

@implementation GRootViewController{

    UIView * contentView;
    GRCTViewController * currentViewController;
    NSMutableArray<GRCTViewController *> * viewControllers;
    RCTRootView * rnTabBarView;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    [self initView];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onRNDispatchNotification:) name:KGDispatchNotification object:nil];
}
-(UIInterfaceOrientationMask)supportedInterfaceOrientations{
    return UIInterfaceOrientationMaskPortrait;
}
-(void)initView{
    // 显示内容的view
    contentView = [[UIView alloc]init];
    [self.view addSubview:contentView];
    
    // tabView 显示下部tab
    rnTabBarView = [[RCTRootView alloc]initWithBridge:[GBridgeManager shareBridge] moduleName:@"tabBar" initialProperties:nil];
    [self.view addSubview:rnTabBarView];
    
    // 约束
    WS(ws);
    [rnTabBarView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.bottom.right.equalTo(ws.view);
        make.width.equalTo(ws.view);
        make.height.equalTo(@55);
    }];
    
    [contentView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(ws.view);
        make.bottom.equalTo(rnTabBarView.mas_top);
    }];   

}

-(void)setTabConfig:(NSDictionary *)tabConfig{
    _tabConfig = tabConfig;
    [self removeAllChildViewController];
    NSArray * tabs = [tabConfig valueForKey:@"tabs"];
    if (tabs) {
        for (int i =0; i < tabs.count; i++) {
            NSDictionary * tab = tabs[i];
            NSString * moduleName = [tab valueForKey:@"moduleName"];
            GRCTViewController * rctVC = [[GRCTViewController alloc]initWithBridge:[GBridgeManager shareBridge]                                                                        moduleName:moduleName
                                                                 initialProperties:tab];
            [self addViewController:rctVC];
        }
    }
    NSInteger index = [[tabConfig valueForKey:@"selectedIndex"]integerValue];
    [self setSelectIndex:index];

}
-(void)setSelectIndex:(NSInteger)selectIndex{
    _selectIndex = selectIndex;
    [self showViewControllerWithIndex:selectIndex];
}
-(void)onRNDispatchNotification:(NSNotification *)notification{
    NSString * action = [notification.object valueForKey:@"action"];
    NSDictionary * paramJson = [notification.object valueForKey:@"paramJson"];
    if ([action isEqual:@"setTabSelectedIndex"]) {
        
        NSInteger selected = [[paramJson valueForKey:@"selectedIndex"]integerValue];
        [self setSelectIndex:selected];
    }
}

#pragma mark - ChildViewController
-(void)removeAllChildViewController{
    currentViewController = nil;
    for (GRCTViewController *vc in viewControllers) {
        [vc.view removeFromSuperview];
        [vc removeFromParentViewController];
    }
    
    [viewControllers removeAllObjects];
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
