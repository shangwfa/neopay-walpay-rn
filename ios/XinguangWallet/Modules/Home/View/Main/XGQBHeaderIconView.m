//
//  XGQBHeaderIconView.m
//  XinguangWallet
//
//  Created by BossKing on 27/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHeaderIconView.h"

@implementation XGQBHeaderIconView


-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self addSubviews];
        self.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.2];
    }
    return self;
}

-(void)addSubviews
{
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [headerBtn setImage:[UIImage imageNamed:@"sy_touxiang"] forState:UIControlStateNormal];
    headerBtn.imageView.contentMode = UIViewContentModeScaleAspectFit;
    _headerBtn=headerBtn;
    [self addSubview:headerBtn];
    
    //用户名标签
    UILabel *userNameLabel = [[UILabel alloc]init];
    userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].name];
    userNameLabel.font = kSYSTEMFONT(14.0);
    userNameLabel.textColor = kWhiteColor;
    [self addSubview:userNameLabel];
    
    //右侧图标
    UIButton *redPBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [redPBtn setImage:[UIImage imageNamed:@"sy_hongbao7"] forState:UIControlStateNormal];
    redPBtn.tag=10001;
    [self addSubview:redPBtn];
    [redPBtn addTarget:self action:@selector(homeIconBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *phoneBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [phoneBtn setImage:[UIImage imageNamed:@"sy_chongzhi7"] forState:UIControlStateNormal];
    phoneBtn.tag=10002;
    [self addSubview:phoneBtn];
    [phoneBtn addTarget:self action:@selector(homeIconBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    kWeakSelf(self);
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(30, 30));
        make.left.equalTo(weakself).with.offset(13);
        make.top.equalTo(weakself).with.offset(33);
    }];
    
    [userNameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(headerBtn.mas_right).with.offset(10);
        make.centerY.equalTo(headerBtn);
    }];

    [phoneBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(24, 24));
        make.right.equalTo(weakself).with.offset(-13);
        make.top.equalTo(weakself).with.offset(33);
    }];
    [redPBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(24, 24));
        make.right.equalTo(phoneBtn.mas_left).with.offset(-35);
        make.top.equalTo(weakself).with.offset(33);
    }];
    
}

-(void)homeIconBtnClicked:(UIButton*)btn
{
    [self.delegate homeHeaderIconBtnClicked:btn];
}

@end
