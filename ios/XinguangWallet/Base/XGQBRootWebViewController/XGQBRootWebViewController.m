//
//  XGQBRootWebViewController.m
//  XinguangWallet
//
//  Created by BossKing on 29/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootWebViewController.h"
#import "WebViewJavascriptBridge.h"


#import <WebKit/WebKit.h>

@interface XGQBRootWebViewController ()

@property (nonatomic,strong) NSURL *url;
@property (nonatomic,strong) WKWebView *webView;

@property WebViewJavascriptBridge* bridge;

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
    
    self.view = webView;
    _webView = webView;
    
    //WebViewJavascriptBridge相关
    self.bridge = [WebViewJavascriptBridge bridgeForWebView:webView];
    [self.bridge registerHandler:@"jsCallNativeGetAccessToken" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSString *accessToken = [GVUserDefaults standardUserDefaults].accessToken;
        responseCallback(accessToken);
    }];
    [self.bridge registerHandler:@"jsCallNativeShowMsg" handler:^(id data, WVJBResponseCallback responseCallback) {
        if ([data isKindOfClass:[NSString class]]) {
            [SVProgressHUD showInfoWithStatus:(NSString*)data];
        }else{
            [SVProgressHUD showInfoWithStatus:@"请输出字符串"];
        }
    }];
    
}


-(void)viewDidLoad
{
    [super viewDidLoad];

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
