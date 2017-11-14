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
    
    //RN页面禁用IQKeyboardManager
    [IQKeyboardManager sharedManager].enable = NO;
    
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNative) name:kNotificationRNJumpBackToNative object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetLoginPwd) name:kNotificationRNJumpBackToNativeResetLoginPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToNativeResetPayPwd) name:kNotificationRNJumpBackToNativeResetPayPwd object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpIntoSecondLevel) name:kNotificationRNJumpIntoSecondLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(RNJumpBackToFirstLevel) name:kNotificationRNJumpBackToFirstLevel object:nil];

    
    //RN打包ios命令
//    react-native bundle --entry-file index.ios.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
    
    //预先加载RN页面
    
    AppDelegate *appDelegate=(AppDelegate*)[[UIApplication sharedApplication] delegate];

    
    NSString *jsCodeLocationStr = appDelegate.jsCodeLocationArr[[GVUserDefaults standardUserDefaults].RNRouter]?appDelegate.jsCodeLocationArr[[GVUserDefaults standardUserDefaults].RNRouter]:@"http://localhost:8081/index.ios.bundle?platform=ios";

    NSURL *jsCodeLocation = [NSURL URLWithString:jsCodeLocationStr];
    
    //隐藏顶部loading from 提示
    [RCTDevLoadingView setEnabled:NO];
    
    //RCT初始化方法必须在主线程执行,开子线程报错
    
    //获取导航栏高度
    CGFloat statusBarHeight=[UIApplication sharedApplication].statusBarFrame.size.height;
    NSString *statusBarHeiStr = [NSString stringWithFormat:@"%.0f",statusBarHeight];
    
    //获取iPhone型号
    NSString *iphoneDevice = [IphoneDevice deviceVersion];
    
    [SVProgressHUD show];
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"neopay_walpay"
                         initialProperties :@{@"params": @{@"page":_pageType,
                                                           @"statusBarHeight":statusBarHeiStr,
                                                           @"iphoneDevice":iphoneDevice}}
                          launchOptions    : nil];
    
    self.view = rootView;
    
    
    [SVProgressHUD dismiss];
    // Do any additional setup after loading the view.
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;

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
-(void)RNJumpIntoSecondLevel
{
    self.navigationController.interactivePopGestureRecognizer.enabled = NO;
}
-(void)RNJumpBackToFirstLevel
{
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
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
