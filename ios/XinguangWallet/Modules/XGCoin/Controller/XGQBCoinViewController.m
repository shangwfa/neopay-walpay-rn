//
//  XGQBCoinViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBCoinViewController.h"
#import "XGQBLoginViewController.h"
#import "XGQBRNTestViewController.h"
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
    
    //监听RN跳转通知
    [kNotificationCenter addObserver:self selector:@selector(jumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    
    NSLog(@"%s",__func__);
    
    
}
//跳转进入RN界面
-(void)jumpToRN
{

    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :@{@"params": @{@"page":@"home",@"time":@"2017-10-11"}}
                          launchOptions    : nil];
    
    
    //创建XGQBRNTestVC
    XGQBRNTestViewController *RNVC = [[XGQBRNTestViewController alloc]init];
    RNVC.view = rootView;
    
//    rootView.appProperties = @{@"params_updated": @{@"page":@"home",@"time":@"2017-10-11"}};
    
    [self.navigationController pushViewController:RNVC animated:YES];
    
}

//从RN跳回原生界面
-(void)jumpBackToNative
{
    [self.navigationController popViewControllerAnimated:YES];
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
