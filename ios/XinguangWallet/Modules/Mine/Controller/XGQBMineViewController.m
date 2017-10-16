//
//  XGQBMineViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineViewController.h"

#import "XGQBRNTestViewController.h"
#import "RCTRootView.h"
#import "RCTDevLoadingView.h"


@interface XGQBMineViewController ()

@property (nonatomic,strong)RCTRootView *rctRootV;

@end

@implementation XGQBMineViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor greenColor];
    
    //预先加载RN页面
    NSURL *jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle]pathForResource:@"index.ios" ofType:@"jsbundle"]];
    
    //隐藏顶部loading from 提示
    [RCTDevLoadingView setEnabled:NO];
    
    //RCT初始化方法必须在主线程执行,开子线程报错
    
    [SVProgressHUD show];

        RCTRootView *rootView =
        [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                             moduleName        : @"neopay_walpay"
                             initialProperties :@{@"params": @{@"page":@"home",@"time":@"2017-10-11"}}
                              launchOptions    : nil];
        
        self.rctRootV = rootView;
    
 
    [SVProgressHUD dismiss];

    
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
    
    self.view.backgroundColor = [UIColor yellowColor];
    
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
//跳转进入RN界面
-(void)jumpToRN
{
    
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    
   
    //创建XGQBRNTestVC
    XGQBRNTestViewController *RNVC = [[XGQBRNTestViewController alloc]init];
    RNVC.view = self.rctRootV;
    
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
    [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
}

@end
