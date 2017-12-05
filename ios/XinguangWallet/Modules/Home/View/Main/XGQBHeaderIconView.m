//
//  XGQBHeaderIconView.m
//  XinguangWallet
//
//  Created by BossKing on 27/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHeaderIconView.h"

@interface XGQBHeaderIconView()


@end

@implementation XGQBHeaderIconView


-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self addSubviews];
    }
    return self;
}

-(void)addSubviews
{
    //背景图
    UIImageView *bgImg =[[UIImageView alloc]initWithImage:[UIImage imageNamed: (kiPhoneX?@"sy_beijing7_x":@"sy_beijing7")]];
    [self addSubview:bgImg];
    
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [headerBtn sd_setImageWithURL:[NSURL URLWithString:[GVUserDefaults standardUserDefaults].avatarUrl] forState:UIControlStateNormal placeholderImage:kIMAGENAMED(@"sy_touxiang")];
//    kViewRadius(headerBtn.imageView, 15);
    kViewRadius(headerBtn, 15);
    _headerBtn=headerBtn;
    [self addSubview:headerBtn];
    
    //用户名标签
    UILabel *userNameLabel = [[UILabel alloc]init];
    userNameLabel.text = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].nickName];
    userNameLabel.font = kSYSTEMFONT(14.0);
    userNameLabel.textColor = kWhiteColor;
    [self addSubview:userNameLabel];
    
    //右侧图标
    UIButton *redPBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [redPBtn setImage:kIMAGENAMED(@"sy_hongbao7") forState:UIControlStateNormal];
    redPBtn.tag=10001;
    [self addSubview:redPBtn];
    [redPBtn addTarget:self action:@selector(homeIconBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *phoneBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [phoneBtn setImage:kIMAGENAMED(@"sy_chongzhi7") forState:UIControlStateNormal];
    phoneBtn.tag=10002;
    [self addSubview:phoneBtn];
    [phoneBtn addTarget:self action:@selector(homeIconBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    kWeakSelf(self);
    [bgImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.edges.equalTo(weakself);
    }];
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(30, 30));
        make.left.equalTo(weakself).with.offset(13);
        make.top.equalTo(weakself).with.offset(33+(kiPhoneX?24:0));
    }];
    
    [userNameLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(headerBtn.mas_right).with.offset(10);
        make.centerY.equalTo(headerBtn);
    }];

    [phoneBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(24, 24));
        make.right.equalTo(weakself).with.offset(-13);
        make.top.equalTo(weakself).with.offset(33+(kiPhoneX?24:0));
    }];
    [redPBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(24, 24));
        make.right.equalTo(phoneBtn.mas_left).with.offset(-35);
        make.top.equalTo(weakself).with.offset(33+(kiPhoneX?24:0));
    }];
}

-(void)homeIconBtnClicked:(UIButton*)btn
{
    [self.delegate homeHeaderIconBtnClicked:btn];
}

@end
