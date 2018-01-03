//
//  XGQBRootWebViewController.m
//  XinguangWallet
//
//  Created by BossKing on 29/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootWebViewController.h"

#import <WebKit/WebKit.h>

@interface XGQBRootWebViewController ()

@property (nonatomic,strong) NSURL *url;

@end

@implementation XGQBRootWebViewController

+(instancetype)webViewControllerWithURL:(NSURL *)url andTitle:(NSString*)title
{
    XGQBRootWebViewController *rootWebViewC = [[XGQBRootWebViewController alloc]init];
    
    rootWebViewC.title = title;
    
    rootWebViewC.url = url?url:[NSURL URLWithString:@"https://www.xinguang.com"];

    return rootWebViewC;
}

-(void)loadView
{
    
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    
    [webView loadRequest:[NSURLRequest requestWithURL:_url]];
    
    self.view = webView;
    
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
