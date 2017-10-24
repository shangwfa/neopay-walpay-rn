//
//  XGQBRegRestPwdTVCell.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, XGQBRegResetPwdTVCellType) {
    XGQBRegResetPwdTVCellTypePhoneNo = 0,
    XGQBRegResetPwdTVCellTypeRegCode,
    XGQBRegResetPwdTVCellTypeLoginPwd,
    XGQBRegResetPwdTVCellTypePayPwd,
    XGQBRegResetPwdTVCellTypeIDNo,
};



@interface XGQBRegRestPwdTVCell : UITableViewCell

@property(nonatomic,assign)XGQBRegResetPwdTVCellType type;


@property (nonatomic,strong) UIImageView *leftImgView;
@property (nonatomic,strong) XGQBTextField *textField;
@property (nonatomic,strong) UIButton *rightBtn;

+(instancetype)cellWithType:(XGQBRegResetPwdTVCellType)type;



@end
