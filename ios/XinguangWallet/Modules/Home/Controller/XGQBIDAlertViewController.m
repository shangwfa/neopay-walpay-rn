//
//  XGQBIDAlertViewController.m
//  XinguangWallet
//
//  Created by BossKing on 11/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBIDAlertViewController.h"
#import "XGQBIDAlertView.h"

#import "XGQBIDAlertTransiton.h"


@interface XGQBIDAlertViewController () 

@end

@implementation XGQBIDAlertViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    XGQBIDAlertView *alertView = [[XGQBIDAlertView alloc]init];
    self.contentView = alertView;
    
    UIView *backView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    self.backView = backView;
    
    kViewRadius(alertView,5);
    
    [self.view addSubview:backView];
    [self.view addSubview:alertView];
    
    backView.backgroundColor = [UIColor colorWithHexString:@"A1A1A1"];
    self.view.backgroundColor = [UIColor clearColor];
    
    kWeakSelf(self);
    
    [alertView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(0.84*kScreenWidth, 0.585*kScreenHeight));
        make.centerX.equalTo(weakself.view);
        make.centerY.equalTo(weakself.view);
    }];
}






@end
