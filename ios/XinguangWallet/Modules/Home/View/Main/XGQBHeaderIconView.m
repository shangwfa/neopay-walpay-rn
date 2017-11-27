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
    NSString *headerBtnTitle = [NSString stringWithFormat:@"Hi，%@",[GVUserDefaults standardUserDefaults].name];
    [headerBtn setTitle:headerBtnTitle forState:UIControlStateNormal];
    [headerBtn setImage:[UIImage imageNamed:@"sy_touxiang"] forState:UIControlStateNormal];
    headerBtn.titleLabel.font = kSYSTEMFONT(14.0);
    headerBtn.imageView.contentMode = UIViewContentModeScaleAspectFit;
    headerBtn.imageEdgeInsets= UIEdgeInsetsMake(0, 0, 0, 10);
    [self addSubview:headerBtn];
    
    //右侧图标
    UIButton *redPBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [redPBtn setImage:[UIImage imageNamed:@"sy_hongbao7"] forState:UIControlStateNormal];
    [self addSubview:redPBtn];
    
    UIButton *phoneBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [phoneBtn setImage:[UIImage imageNamed:@"sy_chongzhi7"] forState:UIControlStateNormal];
    [self addSubview:phoneBtn];
    
    kWeakSelf(self);
    [headerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(150, 30));
        make.left.equalTo(weakself).with.offset(13);
        make.top.equalTo(weakself).with.offset(33);
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

@end
