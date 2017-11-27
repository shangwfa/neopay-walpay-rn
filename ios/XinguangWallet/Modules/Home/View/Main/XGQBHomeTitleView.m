//
//  XGQBHomeTitleView.m
//  XinguangWallet
//
//  Created by BossKing on 12/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTitleView.h"
#import "XGQBHomeTitleBtn.h"

@interface XGQBHomeTitleView ()


@end

@implementation XGQBHomeTitleView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    //背景
    UIImageView *backgroundImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_beijing8"]];
    [self addSubview:backgroundImg];
    
    //头像按钮
    UIButton *headerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    NSString *headerBtnTitle = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].name];
    [headerBtn setTitle:headerBtnTitle forState:UIControlStateNormal];
    [headerBtn setImage:[UIImage imageNamed:@"sy_touxiang"] forState:UIControlStateNormal];
    [self addSubview:headerBtn];
    
    //悬空背景
    UIImageView *floatBgImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_beijing9"]];
    [self addSubview:floatBgImg];
    
    //大红包按钮
    XGQBHomeTitleBtn *redPBtn = [[XGQBHomeTitleBtn alloc]init];
    [redPBtn setTitle:@"大红包" forState:UIControlStateNormal];
    [redPBtn setImage:[UIImage imageNamed:@"sy_hongbao9"] forState:UIControlStateNormal];
    [self addSubview:redPBtn];
    _redPacketBtn = redPBtn;
    
    //手机充值按钮
    XGQBHomeTitleBtn *phoneTopUpBtn = [[XGQBHomeTitleBtn alloc]init];
    [phoneTopUpBtn setTitle:@"手机充值" forState:UIControlStateNormal];
    [phoneTopUpBtn setImage:[UIImage imageNamed:@"sy_chonzghi9"] forState:UIControlStateNormal];
    [self addSubview:phoneTopUpBtn];
    _phoneTopUpBtn = phoneTopUpBtn;
    
    
    //添加约束
    kWeakSelf(self);
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.top.right.equalTo(weakself);
        make.bottom.equalTo(weakself).with.offset(-31);
    }];
    
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(150, 50));
        make.left.equalTo(weakself).with.offset(12);
        make.top.equalTo(weakself).with.offset(30);
    }];
    
    [floatBgImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*350/375.0, kScreenWidth*103/375.0));
        make.centerX.equalTo(weakself);
        make.bottom.equalTo(weakself).with.offset(-10);
    }];
    
    [redPBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*50/375.0, kScreenWidth*75/375.0));
        make.centerY.equalTo(floatBgImg);
        make.left.equalTo(floatBgImg).with.offset(63);
    }];
    
    [phoneTopUpBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*50/375.0, kScreenWidth*75/375.0));
        make.centerY.equalTo(floatBgImg);
        make.right.equalTo(floatBgImg).with.offset(-63);
    }];
    
    return self;
    
}

@end
