//
//  XGQBIDAlertView.m
//  XinguangWallet
//
//  Created by BossKing on 11/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBIDAlertView.h"
#import "XGQBPureColorBtn.h"

@interface XGQBIDAlertView()


@end

@implementation XGQBIDAlertView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/



-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectMake(frame.origin.x, frame.origin.y, 316/375.0*kScreenWidth, 390/667.0*kScreenHeight)];
    self.backgroundColor = kWhiteColor;

    [self setupViewComponents];
    
    
    return self;
}

-(void)setupViewComponents
{
    //账户实名认证
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.text = @"账户实名认证";
    
    titleLabel.font = kBOLDSYSTEMFONT(15.0);
    titleLabel.textAlignment = NSTextAlignmentCenter;
    [self addSubview:titleLabel];
    
    //描述文字
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"为了您的账户安全，\n实名认证用户才可使用支付转账等功能。\n请添加银行卡完成实名认证";
    desLabel.textAlignment = NSTextAlignmentCenter;
    desLabel.font= kSYSTEMFONT(13.0);
    desLabel.numberOfLines = 0;
    [self addSubview:desLabel];
    //图标
    UIImageView *logoImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_renzheng"]];
    [self addSubview:logoImg];
    
    //立即认证
    XGQBPureColorBtn *confirmBtn =[XGQBPureColorBtn buttonWithText:@"立即认证" andColor:[UIColor colorWithHexString:@"F34646"]];
    [self addSubview:confirmBtn];
    
    //暂不认证
    UIButton *cancelBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [cancelBtn setTitle:@"暂不认证" forState:UIControlStateNormal];
    [cancelBtn setTitleColor:[UIColor colorWithHexString:@"F34646"] forState:UIControlStateNormal];
    cancelBtn.titleLabel.font = kSYSTEMFONT(14.0);
    [cancelBtn addTarget:self action:@selector(dismissVC) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview: cancelBtn];
    
    //添加约束
    kWeakSelf(self);
    [titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(98, 16));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(weakself.height*0.097);
    }];
    
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(300/316.0*weakself.width, 62/390.0*weakself.height));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(weakself.height*0.192);
    }];
    
    [logoImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(264/2/316.0*weakself.width, 264/2/316.0*weakself.width*0.617));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(weakself.height*0.42);
    }];
    
    [confirmBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(239/316.0*weakself.width, 45/390.0*weakself.height));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(weakself.height*0.74);
    }];
    
    [cancelBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(150/316.0*weakself.width, 14/390.0*weakself.height));
        make.centerX.equalTo(weakself);
        make.top.equalTo(weakself).with.offset(weakself.height*0.91);
    }];
    
}

-(void)dismissVC
{
    [self.superview.viewController dismissViewControllerAnimated:YES completion:nil];
}

@end
