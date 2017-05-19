//
//  GPlayerViewController.m
//  GogoTV
//
//  Created by 朱国清 on 2017/5/10.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GPlayerViewController.h"
#import <React/RCTRootView.h>
#import <Masonry.h>
#import "GBridgeManager.h"


//  16:9
#define SCALE 1.78

@interface GPlayerViewController ()
@property (nonatomic) UIView *  playerView;                     // 播放View
@property (nonatomic) RCTRootView * rnPlayerDetailView;         // 底部详情View
@property (nonatomic) RCTRootView * rnPlayerControlSmallView;   // 小屏播放器控制View
@property (nonatomic) RCTRootView * rnPlayerControlBigView;     // 大屏播放器控制View

@property (nonatomic) BOOL isFullScreen;                        // 是否全屏

@end

@implementation GPlayerViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    [self initUi];
    [self initConstraints];
    [self initPlayer];
    
}
-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [self addEvent];
    [self.player prepareToPlay];
}
- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self removeEvent];
    [self.player shutdown];
}
-(void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration{
    [super willRotateToInterfaceOrientation:toInterfaceOrientation duration:duration];
    [self resizeViewWithInterfaceOrientation:toInterfaceOrientation];
}


#pragma mark - UI
-(void)initUi{
    
    self.playerView = [[UIView alloc]init];
    [self.playerView setBackgroundColor:[UIColor blackColor]];
    
    self.rnPlayerDetailView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerDetail" initProps:nil];
    self.rnPlayerControlSmallView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerControlSmall" initProps:nil];
    self.rnPlayerControlSmallView.backgroundColor = [UIColor clearColor];
    self.rnPlayerControlBigView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerControlBig" initProps:nil];
    self.rnPlayerControlBigView.backgroundColor = [UIColor clearColor];
    
    
    [self.view addSubview:self.rnPlayerDetailView];
    [self.view addSubview:self.playerView];
    [self.view addSubview:self.rnPlayerControlSmallView];
    [self.view addSubview:self.rnPlayerControlBigView];
    
    self.isFullScreen = NO;
}
-(void)initPlayer{
    [IJKFFMoviePlayerController setLogReport:YES];
    [IJKFFMoviePlayerController setLogLevel:k_IJK_LOG_DEBUG];
    [IJKFFMoviePlayerController checkIfFFmpegVersionMatch:YES];
    IJKFFOptions *options = [IJKFFOptions optionsByDefault];
    
    NSString * url = @"rtmp://live.hkstv.hk.lxdns.com/live/hks";
    
    self.url = [NSURL URLWithString:url];
    self.player = [[IJKFFMoviePlayerController alloc] initWithContentURL:self.url withOptions:options];
    self.player.view.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
    self.player.view.frame = self.playerView.bounds;
    self.player.scalingMode = IJKMPMovieScalingModeAspectFit;
    self.player.shouldAutoplay = YES;
    
    self.playerView.autoresizesSubviews = YES;
    [self.playerView addSubview:self.player.view];
}

-(void)initConstraints{
    WS(weakSelf)
    // PalyerView
    [self.playerView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(weakSelf.view).offset(20);
        make.left.right.equalTo(weakSelf.view);
        make.width.equalTo(weakSelf.view);
        make.height.mas_equalTo(weakSelf.playerView.mas_width).dividedBy(SCALE);
    }];
    // PlayerDetailView
    [self.rnPlayerDetailView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.bottom.right.equalTo(weakSelf.view);
        make.top.equalTo(self.playerView.mas_bottom);
    }];
    // PlayerControlBigView
    [self.rnPlayerControlBigView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.bottom.equalTo(weakSelf.playerView);
        make.width.height.equalTo(weakSelf.playerView);
    }];
    // PlayerControlSmallView
    [self.rnPlayerControlSmallView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.bottom.equalTo(weakSelf.playerView);
        make.width.height.equalTo(weakSelf.playerView);
    }];
}
-(void)resizeViewWithInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation{
    if (UIInterfaceOrientationIsPortrait(interfaceOrientation)) {
        //竖屏
        self.isFullScreen = NO;
    }else{
        // 横屏
        self.isFullScreen = YES;
    }
}
-(void)setIsFullScreen:(BOOL)isFullScreen{
    _isFullScreen = isFullScreen;
    NSInteger space = 0;
    if (_isFullScreen) {
        self.rnPlayerControlBigView.hidden = NO;
        self.rnPlayerControlSmallView.hidden = YES;
        space = 0;
    }else{
        self.rnPlayerControlSmallView.hidden = NO;
        self.rnPlayerControlBigView.hidden = YES;
        space = 20;
        
    }
    WS(weakSelf)
    [self.playerView mas_updateConstraints:^(MASConstraintMaker *make) {
         make.top.equalTo(weakSelf.view).offset(space);
    }];
}

#pragma mark -Event
-(void)addEvent{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onRnDispatchNotification:) name:KGDispatchNotification object:nil];
}
-(void)removeEvent{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
-(void)onRnDispatchNotification:(NSNotification*)notification{
    NSString * action = [notification.object valueForKey:@"action"];
    NSDictionary * paramJson = [notification.object valueForKey:@"paramJson"];
    if ([action isEqualToString:@"player_fullScreen"]) {
        NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeRight];
        [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    }else if([action isEqualToString:@"player_portraitScreen"]){
        NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationPortrait];
        [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
    }
}
@end
