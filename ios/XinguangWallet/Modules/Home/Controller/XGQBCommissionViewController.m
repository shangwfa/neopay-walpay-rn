//
//  XGQBCommissionViewController.m
//  XinguangWallet
//
//  Created by BossKing on 17/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBCommissionViewController.h"
#import "XGQBRNViewController.h"
#import "RCTRootView.h"
#import "RCTDevLoadingView.h"


@interface XGQBCommissionViewController ()
@property (nonatomic,strong)RCTRootView *rctRootV;

@end

@implementation XGQBCommissionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = kViewBgColor;
    self.navigationController.navigationBarHidden = NO;
    
    
    //临时退出登录按钮
    YYLabel *logoutLabel = [YYLabel new];
    logoutLabel.text = @"Logout";
    logoutLabel.textAlignment = NSTextAlignmentCenter;
    logoutLabel.backgroundColor = [UIColor redColor];
    
    logoutLabel.frame = CGRectMake(100, 100, 100, 50);
    [self.view addSubview:logoutLabel];
    
    [logoutLabel setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].accessToken = nil;
        [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
    }];
    
    //临时充值app运行次数按钮
    YYLabel *restRunCount = [YYLabel new];
    restRunCount.text = @"ResetRunCount";
    restRunCount.textAlignment = NSTextAlignmentCenter;
    restRunCount.backgroundColor = [UIColor redColor];
    
    restRunCount.frame = CGRectMake(100, 200, 100, 50);
    [self.view addSubview:restRunCount];
    
    [restRunCount setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].runCount = 0;
    }];
    
    //临时跳转登录页面按钮
    UIButton *button = [[UIButton alloc]initWithFrame:(CGRectMake(100, 300, 100, 50))];
    [button setTitle:@"Login" forState:UIControlStateNormal];
    [self.view addSubview:button];
    button.backgroundColor = [UIColor redColor];
    [button addTarget:self action:@selector(pushToLoginVC) forControlEvents:UIControlEventTouchUpInside];
    
    
    //临时跳转RN页面按钮
    UIButton *jumpToRN = [[UIButton alloc]initWithFrame:(CGRectMake(100, 400, 100, 50))];
    [jumpToRN setTitle:@"jumpToRN" forState:UIControlStateNormal];
    [self.view addSubview:jumpToRN];
    jumpToRN.backgroundColor = [UIColor redColor];
    [jumpToRN addTarget:self action:@selector(jumpToRN) forControlEvents:UIControlEventTouchUpInside];
    
    //监听RN跳转通知
    [kNotificationCenter addObserver:self selector:@selector(jumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    
    //    NSLog(@"%s",__func__);
    
    
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
}

//跳转进入RN界面
-(void)jumpToRN
{
    
    //    NSURL *jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle]pathForResource:@"index.ios" ofType:@"jsbundle"]];
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    
    
    //隐藏顶部loading from 提示
    [RCTDevLoadingView setEnabled:NO];
    
    //RCT初始化方法必须在主线程执行,开子线程报错
    
    [SVProgressHUD show];
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :@{@"params": @{@"page":@"home"}}
                          launchOptions    : nil];

    
    
    [SVProgressHUD dismiss];
    
    //创建XGQBRNTestVC
    XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
    RNVC.view = rootView;
    
    [self.navigationController pushViewController:RNVC animated:YES];
    
}

//从RN跳回原生界面
-(void)jumpBackToNative
{
    [self.navigationController popViewControllerAnimated:YES];
}

-(void)pushToLoginVC
{
    [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
}



@end
