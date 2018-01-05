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
@property (nonatomic,strong) UIProgressView *progressView;

@property WebViewJavascriptBridge* bridge;

@end

@implementation XGQBRootWebViewController

+(instancetype)webViewControllerWithURLStr:(NSString *)urlstr andTitle:(NSString *)title
{
    XGQBRootWebViewController *rootWebViewC = [[XGQBRootWebViewController alloc]init];
    
    rootWebViewC.title = title;
    
//
//    rootWebViewC.url = url?url:[NSURL URLWithString:@"https://www.xinguang.com"];
    
//        rootWebViewC.url = [NSURL URLWithString:@"https://www.baidu.com"];
    
    urlstr = @"http://172.16.33.117:8000/system-message?code=664725ec7b6d4bf4b18a3497de426d7e";
    
    NSString *accessToken = [GVUserDefaults standardUserDefaults].accessToken;
    
    NSString *urlStrMixed = [NSString stringWithFormat:@"%@&accessToken=%@",urlstr,accessToken];
    
    rootWebViewC.url = [NSURL URLWithString:urlStrMixed];

    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    
    WKPreferences *preferences = [WKPreferences new];
    preferences.javaScriptCanOpenWindowsAutomatically = YES;
    preferences.minimumFontSize = 40.0;
    config.preferences = preferences;
    
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight) configuration:config];
    
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlStrMixed]]];
    
    [rootWebViewC.view addSubview:webView];
    rootWebViewC.webView = webView;

    //WebViewJavascriptBridge相关
    rootWebViewC.bridge = [WebViewJavascriptBridge bridgeForWebView:webView];
    [rootWebViewC.bridge registerHandler:@"jsCallNativeGetAccessToken" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSString *accessToken = [GVUserDefaults standardUserDefaults].accessToken;
        responseCallback(accessToken);
    }];
    [rootWebViewC.bridge registerHandler:@"jsCallNativeShowMsg" handler:^(id data, WVJBResponseCallback responseCallback) {
        if ([data isKindOfClass:[NSString class]]) {
            [SVProgressHUD showInfoWithStatus:(NSString*)data];
        }else{
            [SVProgressHUD showInfoWithStatus:@"请输出字符串"];
        }
    }];
    
    [rootWebViewC.webView addObserver:rootWebViewC forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:nil];
    
    
    
    UIProgressView *progressView = [[UIProgressView alloc]initWithFrame:CGRectMake(0, [UIApplication sharedApplication].statusBarFrame.size.height+44, kScreenWidth, 2)];
    
    [rootWebViewC.view addSubview:progressView];
    
    progressView.progressViewStyle = UIProgressViewStyleDefault;
//
//    progressView.backgroundColor = kYellowColor;
//    progressView.progressTintColor = kBlueColor;
//    progressView.transform = CGAffineTransformMakeScale(1.0f, 1.5f);
    
    rootWebViewC.progressView = progressView;
    
    return rootWebViewC;
}

-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{

    kWeakSelf(self);
    if ([keyPath isEqualToString:@"estimatedProgress"]) {
        CGFloat newprogress = [[change objectForKey:NSKeyValueChangeNewKey] doubleValue];
        if (newprogress==1) {
            [UIView animateWithDuration:.5f animations:^{
                weakself.progressView.progress=0;
                weakself.progressView.hidden = YES;
            }];
        }else{
            [UIView animateWithDuration:.5f animations:^{
                weakself.progressView.hidden = NO;
                weakself.progressView.progress = self.webView.estimatedProgress;
            }];
        }
    }else{
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
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

- (void)dealloc {
    
    [self.webView removeObserver:self forKeyPath:@"estimatedProgress"];
}


@end
