//
//  XGQBCoinViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBCoinViewController.h"
#import "XGQBLoginViewController.h"
#import "RCTRootView.h"

@interface XGQBCoinViewController ()

@end

@implementation XGQBCoinViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor yellowColor];
    
    UIButton *button = [[UIButton alloc]initWithFrame:(CGRectMake(100, 100, 100, 50))];
    [button setTitle:@"Login" forState:UIControlStateNormal];
    [self.view addSubview:button];
    button.backgroundColor = [UIColor redColor];
    [button addTarget:self action:@selector(pushToLoginVC) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *jumpToRN = [[UIButton alloc]initWithFrame:(CGRectMake(100, 200, 100, 50))];
    [jumpToRN setTitle:@"jumpToRN" forState:UIControlStateNormal];
    [self.view addSubview:jumpToRN];
    jumpToRN.backgroundColor = [UIColor redColor];
    [jumpToRN addTarget:self action:@selector(jumpToRN) forControlEvents:UIControlEventTouchUpInside];
    
    
    NSLog(@"%s",__func__);
    
    
}
//跳转进入RN界面
-(void)jumpToRN
{
    NSLog(@"High Score Button Pressed");
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :nil
                          launchOptions    : nil];

    rootView.frame = CGRectMake(10, 300, kScreenWidth-20, kScreenHeight-400);
    [self.view addSubview:rootView];
}

-(void)pushToLoginVC
{
    [kNotificationCenter postNotificationName:KNotificationLoginStateChange object:@NO];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
