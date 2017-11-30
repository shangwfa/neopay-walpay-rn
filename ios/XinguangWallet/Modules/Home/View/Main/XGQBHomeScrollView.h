//
//  XGQBHomeScrollView.h
//  XinguangWallet
//
//  Created by BossKing on 24/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@class XGQBHomeTitleView;
@class XGQBHomeCellView;
@class XGQBHomeTableView;

@interface XGQBHomeScrollView : UIScrollView
@property (nonatomic,weak) XGQBHomeTableView* homeTableView;
//@property (nonatomic,weak) XGQBHomeCellView *homeCellView;
@property (nonatomic,weak) XGQBHomeTitleView *homeTitleView;

-(void)titleViewAnimationWithOffsetY:(CGFloat)offsetY;

@end
