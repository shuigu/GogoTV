//
//  GBottomTabView.h
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void(^TabViewSelectedBlock)(NSInteger index);
@interface GBottomTabView : UIView
-(void)addTabItemWithTitles:(NSArray<NSString*> *)titles;
-(void)removeAllChileViews;
-(void)setCheckWithIndex:(NSInteger)index;
@property (nonatomic,strong) TabViewSelectedBlock tabViewSelectedBlock;
@end
