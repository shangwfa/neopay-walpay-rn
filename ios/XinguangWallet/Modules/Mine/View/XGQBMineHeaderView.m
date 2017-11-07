//
//  XGQBMineHeaderView.m
//  XinguangWallet
//
//  Created by BossKing on 16/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineHeaderView.h"

@implementation XGQBMineHeaderView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        //底部背景
        UIImageView *bgView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_beijing2"]];
        
        //头像
        UIImageView *headerView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"test_touxiang"]];
        headerView.size = CGSizeMake(CGRectGetWidth(frame)*0.198, CGRectGetWidth(frame)*0.198);
        kViewRadius(headerView, headerView.size.width/2);
        
        //实名状态标签
        UIImageView *regStatus = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_weishiming"]];
        
        //用户名
        UILabel *namaLebel = [[UILabel alloc]init];
        namaLebel.text = @"胡萝卜";
        namaLebel.textAlignment = NSTextAlignmentCenter;
        namaLebel.font = kSYSTEMFONT(17.0);
        
        //手机图标
        UIImageView *cellphone = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_shouji"]];
        
        //手机号
        UILabel *phoneLebel = [[UILabel alloc]init];
        phoneLebel.textAlignment = NSTextAlignmentCenter;
        phoneLebel.text = @"138****2345";
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
        
        //添加视图
        [self addSubview:bgView];
        [self addSubview:headerView];
        [self addSubview:regStatus];
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
        [regStatus mas_makeConstraints:^(MASConstraintMaker *make) {
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
