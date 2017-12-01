//
//  XGQBHomeTitleView.h
//  XinguangWallet
//
//  Created by BossKing on 12/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>


@class XGQBHomeTitleBtn;

@protocol XGQBHomeTitleViewBtnDelegate <NSObject>
@required
-(void)homeTitleBtnClicked:(XGQBHomeTitleBtn*)btn;
@end


@interface XGQBHomeTitleView : UIView

@property(nonatomic,weak) XGQBHomeTitleBtn *redPacketBtn;
@property (nonatomic,weak) XGQBHomeTitleBtn *phoneTopUpBtn;
@property (nonatomic,weak) id <XGQBHomeTitleViewBtnDelegate> delegate;

@end
