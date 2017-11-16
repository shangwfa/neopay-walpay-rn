//
//  XGQBMineHeaderView.m
//  XinguangWallet
//
//  Created by BossKing on 16/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineHeaderView.h"

@interface XGQBMineHeaderView ()

@property (nonatomic,weak) UIView *headerView;
@property (nonatomic,weak) UIImageView *regStatusIV;
@property (nonatomic,assign) int regStatus;
@property (nonatomic,weak) UILabel *nameLabel;
@property (nonatomic,weak) UILabel *phoneLabel;



@end

@implementation XGQBMineHeaderView

-(void)updateUI
{
    _nameLabel.text = [GVUserDefaults standardUserDefaults].name?[GVUserDefaults standardUserDefaults].name:@"未命名";
    _regStatus = [GVUserDefaults standardUserDefaults].authStatus;
    _phoneLabel.text = [[GVUserDefaults standardUserDefaults].phone secPhoneStr];
    if ([GVUserDefaults standardUserDefaults].authStatus==2) {
        _regStatusIV.hidden = YES;
        _goRegBtn.hidden = YES;
    }else{
        _regStatusIV.hidden = NO;
        _goRegBtn.hidden = NO;
    }
}

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        //底部背景
        UIImageView *bgView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_beijing2"]];
        
        //头像
        NSString *avatarUrl = [GVUserDefaults standardUserDefaults].avatarUrl;
        UIImageView *headerView = [[UIImageView alloc]init];
        _headerView = headerView;
        [headerView sd_setImageWithURL:[NSURL URLWithString:avatarUrl] placeholderImage:[UIImage imageNamed:@"wd_touxiang"]];
        headerView.size = CGSizeMake(CGRectGetWidth(frame)*0.198, CGRectGetWidth(frame)*0.198);
        kViewRadius(headerView, headerView.size.width/2);
        
        //实名状态标签
        UIImageView *regStatusIV = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_weishiming"]];
        _regStatusIV = regStatusIV;
        //判断未实名
        if ([GVUserDefaults standardUserDefaults].authStatus==2) {
            regStatusIV.hidden = YES;
        }
        
        //用户名
        UILabel *namaLebel = [[UILabel alloc]init];
        _nameLabel = namaLebel;
        namaLebel.text = [GVUserDefaults standardUserDefaults].name;
        namaLebel.textAlignment = NSTextAlignmentCenter;
        namaLebel.font = kSYSTEMFONT(17.0);
        
        //手机图标
        UIImageView *cellphone = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_shouji"]];
        
        //手机号
        UILabel *phoneLebel = [[UILabel alloc]init];
        _phoneLabel=phoneLebel;
        phoneLebel.textAlignment = NSTextAlignmentCenter;
//        phoneLebel.text = @"138****2345";
        phoneLebel.text= [[GVUserDefaults standardUserDefaults].phone secPhoneStr];
        phoneLebel.textColor=[UIColor colorWithHexString:@"666666"];
        phoneLebel.font = kSYSTEMFONT(14.0);
        
        //前往实名按钮
        UIButton *goRegBtn = [UIButton buttonWithType:UIButtonTypeCustom];
        _goRegBtn = goRegBtn;
        [goRegBtn setImage:[UIImage imageNamed:@"wd_shouzhi-1"] forState:UIControlStateNormal];
        goRegBtn.titleLabel.backgroundColor = [UIColor colorWithHexString:@"FF7373"];
        [goRegBtn setTitle:@"前往实名" forState:UIControlStateNormal];
        goRegBtn.titleLabel.font = kSYSTEMFONT(11.0);
        goRegBtn.imageEdgeInsets = UIEdgeInsetsMake(0, -10, 0, 10);
        //判断未实名
        if ([GVUserDefaults standardUserDefaults].authStatus==2) {
            goRegBtn.hidden = YES;
        }
        
        //添加视图
        [self addSubview:bgView];
        [self addSubview:headerView];
        [self addSubview:regStatusIV];
        [self addSubview:namaLebel];
        [self addSubview:cellphone];
        [self addSubview:phoneLebel];
        [self addSubview:goRegBtn];
        
        
        //添加约束
        kWeakSelf(self);
        
        CGFloat sizeRatio = kScreenWidth/375.0;
        
        [bgView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(CGRectGetWidth(frame),126/375.0*kScreenWidth));
            make.left.equalTo(weakself);
            make.bottom.equalTo(weakself).with.offset(-8);
        }];

        //头像
        [headerView mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(CGRectGetWidth(frame)*0.198, CGRectGetWidth(frame)*0.198));
            make.centerX.equalTo(weakself);
            make.centerY.equalTo(bgView.mas_top);
        }];
        
        //实名状态
        [regStatusIV mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(36*sizeRatio,12*sizeRatio));
            make.left.equalTo(headerView.mas_centerX);
            make.bottom.equalTo(headerView);
        }];
        
        //用户名
        [namaLebel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(200, 17*sizeRatio));
            make.centerX.equalTo(bgView);
            make.top.equalTo(headerView.mas_bottom).with.offset(13*sizeRatio);
        }];
        
        //手机号
        [phoneLebel mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(100, 11*sizeRatio));
            make.centerX.equalTo(bgView);
            make.top.equalTo(namaLebel.mas_bottom).with.offset(12*sizeRatio);
        }];
        
        //手机图标
        [cellphone mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(9, 12));
            make.centerX.equalTo(bgView).with.offset(-50);
            make.centerY.equalTo(phoneLebel);
        }];
        
        //前往实名按钮
        [goRegBtn mas_makeConstraints:^(MASConstraintMaker *make) {
            make.size.mas_equalTo(CGSizeMake(76*sizeRatio, 20*sizeRatio));
            make.top.equalTo(phoneLebel.mas_bottom).with.offset(7*sizeRatio);
            make.centerX.equalTo(bgView);
        }];
        
    }
    return self;
}



@end
