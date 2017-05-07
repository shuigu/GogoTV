//
//  GBottomTabItemView.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GBottomTabItemView.h"
#import <Masonry.h>

@implementation GBottomTabItemView{
    NSString * _title;
    UILabel  * _titleLabel;
    BOOL       _check;
}
-(void)didMoveToSuperview{
    [super didMoveToSuperview];
    [self initUi];
    [self initEvent];
}
-(void) initUi{
    _titleLabel = [[UILabel alloc]init];
    [self addSubview:_titleLabel];
    WS(ws)
    [_titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(ws);
        make.top.equalTo(ws);
        make.right.equalTo(ws);
        make.bottom.equalTo(ws);
    }];
    [_titleLabel setTextAlignment:NSTextAlignmentCenter];
    
    _check = NO;
    [self updateUi];
}
-(void)setTitle:(NSString *)title{
    _title = title;
    [_titleLabel setText:title];
}
-(void)setCheck:(BOOL)check{
    _check = check;
    [self updateUi];
}
-(void)updateUi{
    if (_check) {
        [_titleLabel setTextColor:UIColorFromHex(0x1AA318)];
    }else{
        [_titleLabel setTextColor:UIColorFromHex(0x9d9da1)];
    }
}
-(void)initEvent{
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(onTap:)];
    [self addGestureRecognizer:tap];
}
-(void)onTap:(UITapGestureRecognizer *)gestureRecognizer{
    if (self.tapBlock) {
        self.tapBlock();
    }
}

@end
