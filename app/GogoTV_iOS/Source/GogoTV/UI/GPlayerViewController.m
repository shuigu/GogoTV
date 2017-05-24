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


@property (nonatomic) NSDate * startPlayDate;                   // 开始播放时间

@end

@implementation GPlayerViewController
-(instancetype)initWithPlayUrl:(NSString *)playUrl{
    if (self=[super init]) {
        _url = [NSURL URLWithString:playUrl];
    }
    return self;
}
-(instancetype)initWithInitProps:(NSDictionary *)initProps{
    if (self=[super init]) {
        _defautlProps = initProps;
        _url = [NSURL URLWithString:[initProps valueForKey:@"playUrl"]];
    }
    return self;
}
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
    [self installMovieNotificationObservers];
}
- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self removeEvent];
    [self.player shutdown];
    
    [self removeMovieNotificationObservers];
}
-(void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration{
    [super willRotateToInterfaceOrientation:toInterfaceOrientation duration:duration];
    [self resizeViewWithInterfaceOrientation:toInterfaceOrientation];
}

-(void)viewWillPop{
    [super viewWillPop];
    
    NSDate * currentData = [NSDate dateWithTimeIntervalSinceNow:0];
    NSInteger duration = currentData.timeIntervalSinceNow - self.startPlayDate.timeIntervalSinceNow;
    
    NSMutableDictionary * playItem = [_defautlProps mutableCopy];
    [playItem setObject:[NSNumber numberWithInteger:duration] forKey:@"duration"];
    [[GBridgeManager shareInstance]enqueueJSCall:@"PlayerModule" method:@"onPlayFinish" args:@[playItem]];
}

#pragma mark - UI
-(void)initUi{
    
    [self.view setBackgroundColor:UIColorFromHex(0x303035)];
    
    self.playerView = [[UIView alloc]init];
    [self.playerView setBackgroundColor:[UIColor blackColor]];
    
    self.rnPlayerDetailView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerDetail" initProps:_defautlProps];
    self.rnPlayerControlSmallView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerControlSmall" initProps:_defautlProps];
    self.rnPlayerControlSmallView.backgroundColor = [UIColor clearColor];
    self.rnPlayerControlBigView = [[GBridgeManager shareInstance]genRnViewWithModule:@"PlayerControlBig" initProps:_defautlProps];
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
    
    self.player = [[IJKFFMoviePlayerController alloc] initWithContentURL:self.url withOptions:options];
    self.player.view.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
    self.player.view.frame = self.playerView.bounds;
    self.player.scalingMode = IJKMPMovieScalingModeAspectFit;
    self.player.shouldAutoplay = YES;
    
    self.playerView.autoresizesSubviews = YES;
    [self.playerView addSubview:self.player.view];
    
    
    self.startPlayDate = [NSDate dateWithTimeIntervalSinceNow:0];
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



#pragma mark Install Movie Notifications

/* Register observers for the various movie object notifications. */
-(void)installMovieNotificationObservers
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(loadStateDidChange:)
                                                 name:IJKMPMoviePlayerLoadStateDidChangeNotification
                                               object:_player];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(moviePlayBackDidFinish:)
                                                 name:IJKMPMoviePlayerPlaybackDidFinishNotification
                                               object:_player];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(mediaIsPreparedToPlayDidChange:)
                                                 name:IJKMPMediaPlaybackIsPreparedToPlayDidChangeNotification
                                               object:_player];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(moviePlayBackStateDidChange:)
                                                 name:IJKMPMoviePlayerPlaybackStateDidChangeNotification
                                               object:_player];
}

#pragma mark Remove Movie Notification Handlers

/* Remove the movie notification observers from the movie object. */
-(void)removeMovieNotificationObservers
{
    [[NSNotificationCenter defaultCenter]removeObserver:self name:IJKMPMoviePlayerLoadStateDidChangeNotification object:_player];
    [[NSNotificationCenter defaultCenter]removeObserver:self name:IJKMPMoviePlayerPlaybackDidFinishNotification object:_player];
    [[NSNotificationCenter defaultCenter]removeObserver:self name:IJKMPMediaPlaybackIsPreparedToPlayDidChangeNotification object:_player];
    [[NSNotificationCenter defaultCenter]removeObserver:self name:IJKMPMoviePlayerPlaybackStateDidChangeNotification object:_player];
}


- (void)loadStateDidChange:(NSNotification*)notification
{
    //    MPMovieLoadStateUnknown        = 0,
    //    MPMovieLoadStatePlayable       = 1 << 0,
    //    MPMovieLoadStatePlaythroughOK  = 1 << 1, // Playback will be automatically started in this state when shouldAutoplay is YES
    //    MPMovieLoadStateStalled        = 1 << 2, // Playback will be automatically paused in this state, if started
    
    IJKMPMovieLoadState loadState = _player.loadState;
    
    if ((loadState & IJKMPMovieLoadStatePlaythroughOK) != 0) {
        NSLog(@"loadStateDidChange: IJKMPMovieLoadStatePlaythroughOK: %d\n", (int)loadState);
    } else if ((loadState & IJKMPMovieLoadStateStalled) != 0) {
        NSLog(@"loadStateDidChange: IJKMPMovieLoadStateStalled: %d\n", (int)loadState);
    } else {
        NSLog(@"loadStateDidChange: ???: %d\n", (int)loadState);
    }
}

- (void)moviePlayBackDidFinish:(NSNotification*)notification
{
    //    MPMovieFinishReasonPlaybackEnded,
    //    MPMovieFinishReasonPlaybackError,
    //    MPMovieFinishReasonUserExited
    int reason = [[[notification userInfo] valueForKey:IJKMPMoviePlayerPlaybackDidFinishReasonUserInfoKey] intValue];
    
    switch (reason)
    {
        case IJKMPMovieFinishReasonPlaybackEnded:
            NSLog(@"playbackStateDidChange: IJKMPMovieFinishReasonPlaybackEnded: %d\n", reason);
            break;
            
        case IJKMPMovieFinishReasonUserExited:
            NSLog(@"playbackStateDidChange: IJKMPMovieFinishReasonUserExited: %d\n", reason);
            break;
            
        case IJKMPMovieFinishReasonPlaybackError:
            NSLog(@"playbackStateDidChange: IJKMPMovieFinishReasonPlaybackError: %d\n", reason);
            break;
            
        default:
            NSLog(@"playbackPlayBackDidFinish: ???: %d\n", reason);
            break;
    }
}

- (void)mediaIsPreparedToPlayDidChange:(NSNotification*)notification
{
    NSLog(@"mediaIsPreparedToPlayDidChange\n");
}

- (void)moviePlayBackStateDidChange:(NSNotification*)notification
{
    //    MPMoviePlaybackStateStopped,
    //    MPMoviePlaybackStatePlaying,
    //    MPMoviePlaybackStatePaused,
    //    MPMoviePlaybackStateInterrupted,
    //    MPMoviePlaybackStateSeekingForward,
    //    MPMoviePlaybackStateSeekingBackward
    
    switch (_player.playbackState)
    {
        case IJKMPMoviePlaybackStateStopped: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: stoped", (int)_player.playbackState);
            break;
        }
        case IJKMPMoviePlaybackStatePlaying: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: playing", (int)_player.playbackState);
            break;
        }
        case IJKMPMoviePlaybackStatePaused: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: paused", (int)_player.playbackState);
            break;
        }
        case IJKMPMoviePlaybackStateInterrupted: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: interrupted", (int)_player.playbackState);
            break;
        }
        case IJKMPMoviePlaybackStateSeekingForward:
        case IJKMPMoviePlaybackStateSeekingBackward: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: seeking", (int)_player.playbackState);
            break;
        }
        default: {
            NSLog(@"IJKMPMoviePlayBackStateDidChange %d: unknown", (int)_player.playbackState);
            break;
        }
    }
}


@end
