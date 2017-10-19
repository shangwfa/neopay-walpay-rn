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


@interface XGQBRNViewController ()

@end

@implementation XGQBRNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    
    //预先加载RN页面
    //    NSURL *jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle]pathForResource:@"index.ios" ofType:@"jsbundle"]];
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
