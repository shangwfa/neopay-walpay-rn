//
//  XGQBLoginInputView.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBLoginInputView.h"

@implementation XGQBLoginInputView

+(instancetype)viewWithLeftImage:(NSString*)leftImageName placeHolder:(NSString*)placeHolder rightBtn:(UIButton*)rightBtn
{
    XGQBLoginInputView *loginInputV = [[XGQBLoginInputView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth*0.9, 40)];
    
    //左边图标
    UIImageView *leftImageView = [[UIImageView alloc]initWithImage:kIMAGENAMED(leftImageName)];
    //下划线
    UIView *underlineView = [UIView new];
    underlineView.backgroundColor = kLineColor;
    //输入框
    XGQBTextField *textField = [XGQBTextField new];
    textField.placeholder = placeHolder;
    
    loginInputV.textField = textField;
    loginInputV.rightBtn = rightBtn;
    loginInputV.leftImgView = leftImageView;
    
    [loginInputV addSubview:underlineView];
    [loginInputV addSubview:leftImageView];
    [loginInputV addSubview:textField];
    [loginInputV addSubview:rightBtn];
    
    //设置全局尺寸
    loginInputV.frame = CGRectMake(0, 0, kScreenWidth*0.9, 40);
    
    //添加约束
    [leftImageView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(19, 19));
        make.centerY.equalTo(loginInputV);
        make.left.equalTo(loginInputV).with.offset(7);
    }];
    if(rightBtn){
        [rightBtn mas_makeConstraints:^(MASConstraintMaker *make) {
            
            //        make.size.mas_equalTo(CGSizeMake(19, 19));
            make.centerY.equalTo(loginInputV).with.offset(0);
            make.right.equalTo(loginInputV).with.offset(-3);
            
        }];
    }
    if(rightBtn){
        [textField mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(loginInputV.width-leftImageView.size.width-rightBtn.size.width-15-30, leftImageView.height));
            make.centerY.equalTo(loginInputV);
            make.left.equalTo(leftImageView.mas_right).with.offset(10);
        }];
    }else{
        [textField mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(loginInputV.width-leftImageView.size.width-15, leftImageView.height));
            make.centerY.equalTo(loginInputV);
            make.left.equalTo(leftImageView.mas_right).with.offset(10);
    }];
    }
    
    [underlineView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(loginInputV.width-32, 1));
        make.bottom.equalTo(loginInputV).with.offset(-5);
        make.right.equalTo(loginInputV).with.offset(-3);
    }];
    
    return loginInputV;
}


@end
