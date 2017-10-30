//
//  XGQBHomeTitleView.m
//  XinguangWallet
//
//  Created by BossKing on 12/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTitleView.h"
#import "XGQBHomeTitleBtn.h"

#import "sys/utsname.h"
@interface XGQBHomeTitleView ()


@end

@implementation XGQBHomeTitleView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    //首页背景
    UIImageView *backgroundImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_beijing"]];
    [self addSubview:backgroundImg];
    
    //左上方logo
    UIImageView *leftTopLogoImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sy_logo"]];
    [self addSubview:leftTopLogoImg];
    
    //右上方日历图标
    UIButton *calenderBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [calenderBtn setBackgroundImage:[UIImage imageNamed:@"sy_qiandao"] forState:UIControlStateNormal];
    [self addSubview:calenderBtn];
    _calenderBtn = calenderBtn;
    
    //添加头部功能按键
    //扫一扫
    XGQBHomeTitleBtn *scanBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    XGQBHomeTitleBtn *payCodeBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    XGQBHomeTitleBtn *accountBtn = [XGQBHomeTitleBtn buttonWithType:UIButtonTypeCustom];
    
    [scanBtn setImage:[UIImage imageNamed:@"sy_saoyisao"] forState:UIControlStateNormal];
    [payCodeBtn setImage:[UIImage imageNamed:@"sy_fuqianma"] forState:UIControlStateNormal];
    [accountBtn setImage:[UIImage imageNamed:@"sy_yue"] forState:UIControlStateNormal];
    
    [scanBtn setTitle:@"扫一扫" forState:UIControlStateNormal];
    [payCodeBtn setTitle:@"二维码" forState:UIControlStateNormal];
    [accountBtn setTitle:@"余额" forState:UIControlStateNormal];
    
    _scanBtn = scanBtn;
    _codeBtn = payCodeBtn;
    _accountBtn = accountBtn;
    
    [self addSubview:scanBtn];
    [self addSubview:payCodeBtn];
    [self addSubview:accountBtn];
    
    //添加约束
//    struct utsname systemInfo;
//    uname(&systemInfo);
//    NSString *deviceStr = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
//    NSLog(@"deviceStris:%@",deviceStr);

    
    CGFloat statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    kWeakSelf(self);
    [backgroundImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth/2));
        make.left.equalTo(weakself);
        make.top.equalTo(weakself);
    }];
    //新光钱包logo
    [leftTopLogoImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(181/2.0/375.0*kScreenWidth, 47/2.0/375.0*kScreenWidth));
        make.left.equalTo(weakself).with.offset(12/375.0*kScreenWidth);
        //临时添加iPhoneX的适配
        if (statusBarHeight>20) {
            make.top.equalTo(weakself).with.offset(statusBarHeight);
        }else
        {
            make.top.equalTo(weakself).with.offset(30);
        }
        
    }];
    //右上方签到图标
    [calenderBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(20/375.0*kScreenWidth, 20/375.0*kScreenWidth));
        make.right.equalTo(weakself).with.offset(-12/375.0*kScreenWidth);
        make.centerY.equalTo(leftTopLogoImg);
    }];
    //扫一扫
    [scanBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(45/375.0*kScreenWidth, 75/375.0*kScreenWidth));
        make.bottom.equalTo(backgroundImg).with.offset(-25/375.0*kScreenWidth);
        make.left.equalTo(backgroundImg).with.offset(57/375.0*kScreenWidth);
    }];
    //二维码
    [payCodeBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(scanBtn);
        make.centerX.equalTo(backgroundImg);
        make.bottom.equalTo(scanBtn);
    }];
    //余额
    [accountBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(scanBtn);
        make.right.equalTo(backgroundImg).with.offset(-57/375.0*kScreenWidth);
        make.bottom.equalTo(scanBtn);
    }];
    return self;
    
}

@end
