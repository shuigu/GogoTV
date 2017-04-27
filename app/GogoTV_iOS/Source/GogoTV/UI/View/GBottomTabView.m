//
//  GBottomTabView.m
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import "GBottomTabView.h"
#import "GBottomTabItemView.h"
#import <Masonry.h>
@implementation GBottomTabView{
    NSMutableArray<GBottomTabItemView *> * itemArray;
}

- (instancetype)init{
    self = [super init];
    if (self) {
        [self initUi];
    }
    return self;
}
-(void)initUi{
    itemArray=[NSMutableArray array];
    [self setBackgroundColor:UIColorFromHex(0x37474f)];
}
-(void)addTabItemWithTitles:(NSArray<NSString*> *)titles{
    [itemArray removeAllObjects];
    WS(weakSelf);
    for (int i=0; i< titles.count; i++) {
        GBottomTabItemView * item = [[GBottomTabItemView alloc]init];
        [self addSubview:item];
        [item setTitle:titles[i]];
        [itemArray addObject:item];
        [item setTapBlock:^{
            [weakSelf setCheckWithIndex:i];
        }];
    }    
    GBottomTabItemView * lastItem = nil;
    for (int i=0; i<itemArray.count; i++) {
        GBottomTabItemView * item = itemArray[i];
        [item mas_makeConstraints:^(MASConstraintMaker *make) {
            make.top.bottom.equalTo(weakSelf);
            if (lastItem) {
                make.left.equalTo(lastItem.mas_right).offset(-1);
                make.width.equalTo(lastItem);
            }else{
                make.left.equalTo(weakSelf);
            }
        }];
        lastItem = item;
    }
    [lastItem mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(weakSelf);
    }];
    
    [self setCheckWithIndex:0];
}
-(void)setCheckWithIndex:(int)index{
    [self clearAllItemCheck];
    GBottomTabItemView * item = [itemArray objectAtIndex:index];
    if (item) {
        [item setCheck:YES];
    }
    if (self.tabViewSelectedBlock) {
        self.tabViewSelectedBlock(index);
    }
}
-(void)clearAllItemCheck{
    for (GBottomTabItemView * item in itemArray) {
        [item setCheck:NO];
    }
}
-(void)removeAllChileViews{
    for (UIView * view in self.subviews) {
        [view removeFromSuperview];
    }
}
@end





