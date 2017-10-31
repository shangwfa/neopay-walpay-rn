//
//  XGQBAccountExistAlertViewController.h
//  XinguangWallet
//
//  Created by BossKing on 27/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@class XGQBAccountExistAlertViewDelegate;

@interface XGQBAccountExistAlertViewController : UIViewController 

@property (nonatomic,strong) UIView *backView;
@property (nonatomic,strong) UIView *contentView;

@property (nonatomic,weak) id alertviewDelegate;

@end
