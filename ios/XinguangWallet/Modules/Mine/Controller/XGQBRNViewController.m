//
//  XGQBRNViewController.m
//  XinguangWallet
//
//  Created by BossKing on 10/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRNViewController.h"

#import "RCTRootView.h"
#import "RCTDevLoadingView.h"

#import "XGQBRegResetPwdTVController.h"


@interface XGQBRNViewController ()

@end

@implementation XGQBRNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetLoginPwd) name:kNotificationRNJumpBackToNativeResetLoginPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetPayPwd) name:knotificationRNJumpBackToNativeResetPayPwd object:nil];

    
    //RN打包ios命令
//    react-native bundle --entry-file index.ios.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
    
    //预先加载RN页面
//        NSURL *jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle]pathForResource:@"index.ios" ofType:@"jsbundle"]];
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://172.16.33.11:8081/index.ios.bundle?platform=ios"];
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://172.16.33.182:8081/index.ios.bundle?platform=ios"];
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    
    
    
    //隐藏顶部loading from 提示
//    [RCTDevLoadingView setEnabled:NO];
    
    //RCT初始化方法必须在主线程执行,开子线程报错
    
    [SVProgressHUD show];
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :@{@"params": @{@"page":_pageType}}
                          launchOptions    : nil];
    
    self.view = rootView;
    
    
    [SVProgressHUD dismiss];
    // Do any additional setup after loading the view.
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
    
}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)RNJumpBackToNative
{
    [self.navigationController popViewControllerAnimated:YES];
}

-(void)RNJumpBackToNativeResetLoginPwd
{
    XGQBRegResetPwdTVController *resetLoginPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetLoginPwd];
    [self.navigationController pushViewController:resetLoginPwdVC animated:YES];
}

-(void)RNJumpBackToNativeResetPayPwd
{
    if (arc4random()%2) {
        XGQBRegResetPwdTVController *resetPayPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetPayPwdNoID];
        [self.navigationController pushViewController:resetPayPwdVC animated:YES];

    }else
    {
        XGQBRegResetPwdTVController *resetPayPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetPayPwdWithID];
        [self.navigationController pushViewController:resetPayPwdVC animated:YES];

    }
    

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
