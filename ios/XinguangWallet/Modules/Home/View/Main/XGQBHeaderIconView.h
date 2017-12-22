//
//  XGQBHeaderIconView.h
//  XinguangWallet
//
//  Created by BossKing on 27/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
@protocol XGQBHomeHeaderIconBtnDelegata
@required
-(void)homeHeaderIconBtnClicked:(UIButton*)btn;
@end

@interface XGQBHeaderIconView : UIView

@property(nonatomic,weak)id<XGQBHomeHeaderIconBtnDelegata> delegate;
@property (nonatomic,weak) UIButton *headerBtn;
@property (nonatomic,weak) UILabel *userNameLabel;
@end
