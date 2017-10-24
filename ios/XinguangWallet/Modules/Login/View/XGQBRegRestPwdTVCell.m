//
//  XGQBRegRestPwdTVCell.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRegRestPwdTVCell.h"

#import "XGQBCountTimeBtn.h"

@implementation XGQBRegRestPwdTVCell

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

+(instancetype)cellWithType:(XGQBRegResetPwdTVCellType)type
{
    XGQBRegRestPwdTVCell *cell = [[XGQBRegRestPwdTVCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"regResetPwd"];
    
    XGQBCountTimeBtn *countTimeBtn = [[XGQBCountTimeBtn alloc]init];
    
    UIButton *readPwdBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_yanjing"] forState:UIControlStateNormal];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_zhengyan"] forState:UIControlStateSelected];
    
    [readPwdBtn addTarget:cell action:@selector(readPwdBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    readPwdBtn.selected = NO;
    
    switch (type) {
        case XGQBRegResetPwdTVCellTypeIDNo:
            [cell addsubviewsWithLeftImageNamed:@"dl_yanzhengma" placeHolder:@"请输入实名认证的身份证号" rightBtn:nil];
            cell.textField.type = XGQBTextFieldTypeIDNo;
            break;
        case XGQBRegResetPwdTVCellTypePayPwd:
            [cell addsubviewsWithLeftImageNamed:@"dl_zhifumima1" placeHolder:@"设置支付密码，6位数字" rightBtn:readPwdBtn];
            cell.textField.type = XGQBTextFieldTypePayPassword;
            break;
        case XGQBRegResetPwdTVCellTypePhoneNo:
            [cell addsubviewsWithLeftImageNamed:@"dl_shouji1" placeHolder:@"请输入手机号" rightBtn:nil];
            cell.textField.type = XGQBTextFieldTypePhoneNo;
            break;
        case XGQBRegResetPwdTVCellTypeRegCode:
            [cell addsubviewsWithLeftImageNamed:@"dl_yanzhengma" placeHolder:@"请输入验证码" rightBtn:countTimeBtn];
            cell.textField.type = XGQBTextFieldTypeRegisterCode;
            break;
        case XGQBRegResetPwdTVCellTypeLoginPwd:
            [cell addsubviewsWithLeftImageNamed:@"dl_mima1" placeHolder:@"设置登录密码,6-18位字母加数字" rightBtn:readPwdBtn];
            cell.textField.type = XGQBTextFieldTypeLoginPassword;
            break;
        default:
            break;
            
        return cell;
    }
    
    
    
    return cell;
}

-(void)addsubviewsWithLeftImageNamed:(NSString *)leftImageName placeHolder:(NSString *)placeHolder rightBtn:(UIButton *)rightBtn
{
    
    //左边图标
    UIImageView *leftImageView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:leftImageName]];
    //下划线
    UIView *underlineView = [UIView new];
    underlineView.backgroundColor = kLineColor;
    //输入框
    XGQBTextField *textField = [XGQBTextField new];
    textField.placeholder = placeHolder;
    textField.font = kSYSTEMFONT(14.0);
    
    self.textField = textField;
    self.rightBtn = rightBtn;
    self.leftImgView = leftImageView;
    
    [self.contentView addSubview:underlineView];
    [self.contentView addSubview:leftImageView];
    [self.contentView addSubview:textField];
    [self.contentView addSubview:rightBtn];
    
    //设置全局尺寸
    self.contentView.frame = CGRectMake(0, 0, kScreenWidth*0.9, 40);
    
    //添加约束
    kWeakSelf(self);
    CGFloat sizeRatio = kScreenWidth/375.0;
    [leftImageView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(19, 19));
        make.bottom.equalTo(weakself.contentView).with.offset(-2);
        make.left.equalTo(weakself.contentView).with.offset(30*sizeRatio);
    }];
    if(rightBtn){
            [rightBtn mas_makeConstraints:^(MASConstraintMaker *make) {
                
//            make.size.mas_equalTo(CGSizeMake(19, 19));
            make.bottom.equalTo(weakself.contentView).with.offset(-2);
            make.right.equalTo(weakself.contentView).with.offset(-30*sizeRatio);
        }];
    }
    if(rightBtn){
        [textField mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(weakself.contentView.width-leftImageView.size.width-rightBtn.size.width-15-45, 32));
            make.bottom.equalTo(weakself.contentView);
            make.left.equalTo(leftImageView.mas_right).with.offset(16);
        }];
    }else{
        [textField mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(weakself.contentView.width-leftImageView.size.width-rightBtn.size.width-15,32));
            make.bottom.equalTo(weakself.contentView);
            make.left.equalTo(leftImageView.mas_right).with.offset(16);
        }];
    }
    
    [underlineView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(leftImageView.mas_right).with.offset(6);
        make.height.mas_equalTo(1);
        make.bottom.equalTo(weakself.contentView).with.offset(0);
        make.right.equalTo(weakself.contentView).with.offset(-31*sizeRatio);
    }];
    
    self.selectionStyle = UITableViewCellSelectionStyleNone;

    
}

-(void)readPwdBtnClicked:(UIButton*)btn
{
    btn.selected =!btn.selected;
    self.textField.secureTextEntry = !btn.selected;
}



@end
