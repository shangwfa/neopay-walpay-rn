//
//  XGQBAccountExistAlertView.h
//  XinguangWallet
//
//  Created by BossKing on 27/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>



#pragma mark --协议

@class XGQBAccountExistAlertView;
@protocol XGQBAccountExistAlertViewDelegate <NSObject>

-(void)accountExistAlertView:(XGQBAccountExistAlertView*)alertView btnClicked:(UIButton*)btn;

@end

@interface XGQBAccountExistAlertView : UIView

@property (nonatomic,weak) id <XGQBAccountExistAlertViewDelegate> delegate;

@end
