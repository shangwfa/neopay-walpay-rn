//
//  XGQBRootWebViewController.m
//  XinguangWallet
//
//  Created by BossKing on 29/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootWebViewController.h"

#import <WebKit/WebKit.h>

@interface XGQBRootWebViewController ()<WKScriptMessageHandler>

@property (nonatomic,strong) NSURL *url;
@property (nonatomic,strong) WKWebView *webView;

@end

@implementation XGQBRootWebViewController

+(instancetype)webViewControllerWithURL:(NSURL *)url andTitle:(NSString*)title
{
    XGQBRootWebViewController *rootWebViewC = [[XGQBRootWebViewController alloc]init];
    
    rootWebViewC.title = title;
    
//    rootWebViewC.url = url?url:[NSURL URLWithString:@"https://www.xinguang.com"];
    rootWebViewC.url = [NSURL URLWithString:@"http://172.16.33.117:8000/system-message?code=664725ec7b6d4bf4b18a3497de426d7e"];

    return rootWebViewC;
}

-(void)loadView
{
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    
    WKPreferences *preferences = [WKPreferences new];
    preferences.javaScriptCanOpenWindowsAutomatically = YES;
    preferences.minimumFontSize = 40.0;
    config.preferences = preferences;
    
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight) configuration:config];
    
    [webView loadRequest:[NSURLRequest requestWithURL:_url]];
    
    [webView.configuration.userContentController addScriptMessageHandler:self name:@"jsCallNativeGetAccessToken"];
    [webView.configuration.userContentController addScriptMessageHandler:self name:@"jsCallNativeShowMsg"];

    
    self.view = webView;
    _webView = webView;
    
}


-(void)viewDidLoad
{
    [super viewDidLoad];

}

-(void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    if ([message.name isEqualToString:@"jsCallNativeGetAccessToken"]) {
        [self sendAccessToken];
    } else if ([message.name isEqualToString:@"jsCallNativeShowMsg"]) {
        [SVProgressHUD showInfoWithStatus:[NSString stringWithFormat:@"%@",message.body]];
    }
}

-(void)sendAccessToken
{
    NSString *jsStr = [NSString stringWithFormat:@"getAccessToken('%@')",[GVUserDefaults standardUserDefaults].accessToken];
    [self.webView evaluateJavaScript:jsStr completionHandler:^(id _Nullable result, NSError * _Nullable error) {
        NSLog(@"%@----%@",result, error);
    }];
    
    
}

-(void)viewWillAppear:(BOOL)animated
{
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
    self.navigationController.navigationBarHidden = NO;
    
    [super viewWillAppear:animated];
    
    [kNotificationCenter postNotificationName:kNotificationNavPushToSecondLevel object:nil];

}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
}

@end
