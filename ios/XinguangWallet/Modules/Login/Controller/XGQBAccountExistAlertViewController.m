//
//  XGQBAccountExistAlertViewController.m
//  XinguangWallet
//
//  Created by BossKing on 27/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAccountExistAlertViewController.h"
#import "XGQBAccountExistAlertView.h"


@interface XGQBAccountExistAlertViewController ()

@end

@implementation XGQBAccountExistAlertViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    XGQBAccountExistAlertView *alertView = [[XGQBAccountExistAlertView alloc]init];
    self.contentView = alertView;
    alertView.delegate = _alertviewDelegate;
    
    UIView *backView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    self.backView = backView;
    
    kViewRadius(alertView,5);
    
    [self.view addSubview:backView];
    [self.view addSubview:alertView];
    
    backView.backgroundColor = UIColorHex(A1A1A1);
    self.view.backgroundColor = [UIColor clearColor];
    
    kWeakSelf(self);
    
    [alertView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(0.84*kScreenWidth, 138));
        make.centerX.equalTo(weakself.view);
        make.centerY.equalTo(weakself.view);
    }];
}





@end
