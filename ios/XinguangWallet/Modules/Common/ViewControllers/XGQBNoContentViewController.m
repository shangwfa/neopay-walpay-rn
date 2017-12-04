//
//  XGQBNoContentViewController.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBNoContentViewController.h"

@interface XGQBNoContentViewController ()

@end

@implementation XGQBNoContentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.view.backgroundColor = kViewBgColor;
    
    UIImageView *noContentImage = [[UIImageView alloc]initWithImage:kIMAGENAMED(@"kong")];
    [self.view addSubview:noContentImage];
    
    
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"暂时没有内容哦！去其他页面看看~";
    desLabel.font = kSYSTEMFONT(15.0);
    desLabel.textColor = UIColorHex(B5B5B5);
    [self.view addSubview:desLabel];
    
    [noContentImage mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(174, 147));
        make.centerX.equalTo(self.view);
        make.centerY.equalTo(self.view).with.offset(-40);
    }];
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.view);
        make.top.equalTo(noContentImage.mas_bottom).with.offset(40);
    }];
    
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden=NO;
    kApplication.statusBarStyle=UIStatusBarStyleDefault;
    [kNotificationCenter postNotificationName:kNotificationNavPushToSecondLevel object:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
