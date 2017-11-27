//
//  XGQBSideHeaderView.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideHeaderView.h"

@implementation XGQBSideHeaderView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    [self setupViewComponentsWithFrame:frame];
    
    return self;
}

-(void)setupViewComponentsWithFrame:(CGRect)frame
{
    //头像
    UIImageView *headerIcon = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_touxiang"]];
    [self addSubview:headerIcon];
    
    //未认证标签
    UIImageView *regIcon = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_weishiming"]];
    [self addSubview:regIcon];
    
    //用户名标签
    UILabel *nameLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 50, 20)];
    nameLabel.text = [GVUserDefaults standardUserDefaults].name;
    nameLabel.font = kSYSTEMFONT(17.0);
    [self addSubview:nameLabel];
    
    //手机号标签
    UILabel *phoneNoLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, 75, 20)];
    phoneNoLabel.text = [GVUserDefaults standardUserDefaults].phone;
    phoneNoLabel.font=kSYSTEMFONT(12.0);
    [self addSubview:phoneNoLabel];
    
    //认证按钮
    UIButton *regBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [regBtn setImage:[UIImage imageNamed:@"wd_renzhneg"] forState:UIControlStateNormal];
    [self addSubview:regBtn];
    _regBtn=regBtn;
    
    kWeakSelf(self);
    //添加约束
    [headerIcon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(frame.size.width*0.281, frame.size.width*0.281));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(0.28*frame.size.height);
    }];
    
    [regIcon mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(frame.size.width*0.118, frame.size.width*0.039));
        make.bottom.equalTo(headerIcon);
        make.right.equalTo(headerIcon);
    }];
    [nameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(55, 20));
        make.top.equalTo(headerIcon.mas_bottom).with.offset(13);
        make.left.equalTo(weakself).with.offset(0.282*frame.size.width);
    }];
    [phoneNoLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(75, 20));
        make.centerY.equalTo(nameLabel);
        make.left.mas_equalTo(nameLabel.mas_right).with.offset(0.049*frame.size.width);
    }];
    [regBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(0.236*frame.size.width, 0.0754*frame.size.width));
        make.top.equalTo(nameLabel.mas_bottom).with.offset(13);
        make.centerX.equalTo(weakself);
    }];
}

@end
