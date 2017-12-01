//
//  XGQBNetworkFailureViewController.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBNetworkFailureViewController.h"

#import "XGQBPureColorBtn.h"

@interface XGQBNetworkFailureViewController ()

@end

@implementation XGQBNetworkFailureViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.view.backgroundColor = kViewBgColor;
    
    UIImageView *networkFailIV = [[UIImageView alloc]initWithImage:kIMAGENAMED(@"wuwang")];
    [self.view addSubview:networkFailIV];
    
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"网络开了个小差，请检查您的网络~";
    desLabel.font = kSYSTEMFONT(15.0);
    desLabel.textColor = UIColorHex(B5B5B5);
    [self.view addSubview:desLabel];
    
    XGQBPureColorBtn *reloadBtn = [XGQBPureColorBtn buttonWithText:@"刷新" andColor:kButtonColor];
    [self.view addSubview:reloadBtn];
    
    [networkFailIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(331/2.0, 249/2.0));
        make.centerX.equalTo(self.view);
        make.centerY.equalTo(self.view).with.offset(-60);
    }];
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.view);
        make.top.equalTo(networkFailIV.mas_bottom).with.offset(40);
    }];
    [reloadBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(100, 31));
        make.top.equalTo(desLabel.mas_bottom).with.offset(40);
        make.centerX.equalTo(self.view);
    }];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden=NO;
    kApplication.statusBarStyle=UIStatusBarStyleDefault;
    [kNotificationCenter postNotificationName:kNotificationNavPushToSecondLevel object:nil];

}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
