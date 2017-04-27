//
//  GBottomTabItemView.h
//  GogoTV
//
//  Created by 朱国清 on 17/4/27.
//  Copyright © 2017年 朱国清. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void(^TapBlock)();

@interface GBottomTabItemView : UIView
-(void)setTitle:(NSString *)title;
-(void)setCheck:(BOOL)check;
-(void)setTapBlock:(TapBlock)block;

@property (nonatomic,strong)TapBlock tapBlock;
@end
