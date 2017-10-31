//
//  XGQBAccountExistAlertView.m
//  XinguangWallet
//
//  Created by BossKing on 27/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAccountExistAlertView.h"
#import "XGQBRegResetPwdTVController.h"
#import "XGQBAccountExistAlertViewController.h"

@implementation XGQBAccountExistAlertView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, 316/375.0*kScreenWidth, 138)];
    self.backgroundColor = kWhiteColor;
    
    [self setupViewComponents];
    
    return self;
}

-(void)setupViewComponents
{
    //文字提醒
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.numberOfLines = 0;
    titleLabel.textAlignment = NSTextAlignmentCenter;
    titleLabel.font = kSYSTEMFONT(13.0);
    titleLabel.textColor = [UIColor colorWithHexString:@"333333"];
//    titleLabel.backgroundColor = kBlueColor;
    titleLabel.text = @"该手机账号已存在，请直接登录\n若您忘记密码，请通过忘记密码按钮重置登录";
    [self addSubview:titleLabel];
    
    //分割线
    UIView *separator = [[UIView alloc]init];
    separator.backgroundColor = [UIColor colorWithHexString:@"999999"];
    [self addSubview:separator];
    
    //忘记密码按钮
    UIButton *forgetBtn = [UIButton buttonWithType:UIButtonTypeCustom];
//    forgetBtn.backgroundColor = kYellowColor;
    [forgetBtn setTitle:@"忘记密码" forState:UIControlStateNormal];
    [forgetBtn setTitleColor:[UIColor colorWithHexString:@"999999"] forState:UIControlStateNormal];
    forgetBtn.titleLabel.font = kSYSTEMFONT(14.0);
    [forgetBtn addTarget:self action:@selector(btnClicked:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview: forgetBtn];
    
    //去登陆按钮
    UIButton *goLoginBtn = [UIButton buttonWithType:UIButtonTypeCustom];
//    goLoginBtn.backgroundColor = kGreenColor;
    [goLoginBtn setTitle:@"去登陆" forState:UIControlStateNormal];
    [goLoginBtn setTitleColor:[UIColor colorWithHexString:@"F34646"] forState:UIControlStateNormal];
    goLoginBtn.titleLabel.font = kSYSTEMFONT(14.0);
    [goLoginBtn addTarget:self action:@selector(btnClicked:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview: goLoginBtn];
    
    //添加约束
    kWeakSelf(self);
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(285*kScreenWidth/375.0, 40));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(30);
//        make.left.equalTo(weakself).with.offset(16);
//        make.right.equalTo(weakself).with.offset(-16);
    }];
    
    [forgetBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake((weakself.width-2.0)/2.0, 50));
        make.right.equalTo(separator.mas_left);
        make.bottom.equalTo(weakself);
    }];
    
    [goLoginBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake((weakself.width-2.0)/2.0, 50));
        make.left.equalTo(separator.mas_right);
        make.bottom.equalTo(weakself);
    }];
    [separator mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(1, 15));
        make.centerX.equalTo(weakself);
        make.centerY.equalTo(forgetBtn);
    }];
}

-(void)btnClicked:(UIButton*)btn
{
    NSLog(@"%@",self.delegate);
    [self.delegate accountExistAlertView:self btnClicked:btn];
}

@end
