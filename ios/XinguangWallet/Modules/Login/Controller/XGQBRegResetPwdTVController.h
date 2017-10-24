//
//  XGQBRegResetPwdTVC.h
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, XGQBRegResetPwdTVConType) {
    XGQBRegResetPwdTVConTypeRegister = 0,
    XGQBRegResetPwdTVConTypeResetLoginPwd,
    XGQBRegResetPwdTVConTypeResetPayPwdNoID,
    XGQBRegResetPwdTVConTypeResetPayPwdWithID,
};



@interface XGQBRegResetPwdTVController : UITableViewController

@property (nonatomic,assign) XGQBRegResetPwdTVConType type;
@property (nonatomic,strong) NSString *userName;

+(instancetype)tableVCWithType:(XGQBRegResetPwdTVConType)type;

@end
