//
//  AppDelegate+AppService.m
//  MiAiApp
//
//  Created by 徐阳 on 2017/5/19.
//  Copyright © 2017年 徐阳. All rights reserved.
//

#import "AppDelegate+AppService.h"
#import "XGQBAPPBootViewController.h"
#import "XGQBLoginViewController.h"
#import "XGQBRootNavigationController.h"


@implementation AppDelegate (AppService)

#pragma mark - 初始化服务
-(void)initService{
    //注册登录状态监听
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(loginStateChange:)
                                                 name:kNotificationLoginStateChange
                                               object:nil];

}

#pragma mark - 初始化window
-(void)initWindow{
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = kWhiteColor;
    [self.window makeKeyAndVisible];
    //appearance用来设置全局外观
//     设置UIbutton的排他性
    [[UIButton appearance] setExclusiveTouch:YES];
    [[UIButton appearance] setShowsTouchWhenHighlighted:YES];
//    [UIActivityIndicatorView appearanceWhenContainedIn:[MBProgressHUD class], nil].color = KWhiteColor;
    

    
}

#pragma mark - 初始化第三方控件
-(void)initThirdPartComponents
{
    //IQKeyboardManager设置
    [IQKeyboardManager sharedManager].enable = YES;
    [IQKeyboardManager sharedManager].shouldResignOnTouchOutside=YES;
    [IQKeyboardManager sharedManager].enableAutoToolbar = NO;
    
    //SVProgressHUD设置
    [SVProgressHUD setBackgroundColor:[UIColor colorWithHexString:@"333333"]];
    [SVProgressHUD setForegroundColor:kWhiteColor];
    [SVProgressHUD setMinimumDismissTimeInterval:2];
//    [SVProgressHUD setInfoImage:nil];
    //    [SVProgressHUD setImageViewSize:CGSizeMake(10, 10)];
    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeClear];
}


#pragma mark - 初始化用户系统
-(void)initUserManager{

    //如果是第一次使用APP,显示BootVC
    if([GVUserDefaults standardUserDefaults].runCount == 0)
    {
        [GVUserDefaults standardUserDefaults].runCount ++ ;
        self.window.rootViewController = [[XGQBAPPBootViewController alloc] init];
    }
    else
    {
        [GVUserDefaults standardUserDefaults].runCount ++ ;
        //判断是否含有登录信息
        if (![GVUserDefaults standardUserDefaults].accessToken) {
            //没有Token,自动进入主界面
            kPostNotification(kNotificationLoginStateChange, @NO);
        }else{
            self.mainTabBarVC = [XGQBMainTabBarViewController new];
            self.window.rootViewController = self.mainTabBarVC;
        }
    }
}
-(void)loginStateChange:(NSNotification*)notification
{
    BOOL loginSuccess = [notification.object boolValue];
    if (loginSuccess) {
        self.mainTabBarVC = [XGQBMainTabBarViewController new];
        
        //自定义转场动画
        CATransition *anima = [CATransition animation];
        anima.type = @"fade";//设置动画的类型
        anima.subtype = kCATransitionFromRight; //设置动画的方向
        anima.duration = 0.3f;
        
        self.window.rootViewController = self.mainTabBarVC;
        [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
        
    }else{
        //加载登录页面
        self.mainTabBarVC = nil;
        
        XGQBRootNavigationController *loginNavi = [[XGQBRootNavigationController alloc]initWithRootViewController:[XGQBLoginViewController new] ];
//        UINavigationController *loginNavi = [[UINavigationController alloc]initWithRootViewController:[XGQBLoginViewController new]];
        
        CATransition *anima = [CATransition animation];
        anima.type = @"fade";//设置动画的类型
        anima.subtype = kCATransitionFromRight; //设置动画的方向
        anima.duration = 0.3f;
        
        self.window.rootViewController = loginNavi;
        
        [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
    }
   
}
//#pragma mark - 登录状态处理 -
//- (void)loginStateChange:(NSNotification *)notification
//{
//    BOOL loginSuccess = [notification.object boolValue];
//
//    if (loginSuccess) {//登陆成功加载主窗口控制器
//
//        //为避免自动登录成功刷新tabbar
//        if (!self.mainTabBar || ![self.window.rootViewController isKindOfClass:[MainTabBarController class]]) {
//            self.mainTabBar = [MainTabBarController new];
//
//            CATransition *anima = [CATransition animation];
//            anima.type = @"cube";//设置动画的类型
//            anima.subtype = kCATransitionFromBottom; //设置动画的方向
//            anima.duration = 0.3f;
//
//            self.window.rootViewController = self.mainTabBar;
//
//            [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
//
//        }
//
//    }else {//登陆失败加载登陆页面控制器
//
//        self.mainTabBar = nil;
//        RootNavigationController *loginNavi =[[RootNavigationController alloc] initWithRootViewController:[LoginViewController new]];
//
//        CATransition *anima = [CATransition animation];
//        anima.type = @"fade";//设置动画的类型
//        anima.subtype = kCATransitionFromBottom; //设置动画的方向
//        anima.duration = 0.3f;
//
//        self.window.rootViewController = loginNavi;
//
//        [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
//
//    }
//    //展示FPS
//    [AppManager showFPS];
//}


//#pragma mark - 网络状态变化 -
//- (void)netWorkStateChange:(NSNotification *)notification
//{
//    BOOL isNetWork = [notification.object boolValue];
//
//    if (isNetWork) {//有网络
//        if ([userManager loadUserInfo] && !isLogin) {//有用户数据 并且 未登录成功 重新来一次自动登录
//            [userManager autoLoginToServer:^(BOOL success, NSString *des) {
//                if (success) {
//                    DLog(@"网络改变后，自动登录成功");
//                    [MBProgressHUD showSuccessMessage:@"网络改变后，自动登录成功"];
//                    kPostNotification(KNotificationAutoLoginSuccess, nil);
//                }else{
//                    [MBProgressHUD showErrorMessage:NSStringFormat(@"自动登录失败：%@",des)];
//                }
//            }];
//        }
//
//    }else {//登陆失败加载登陆页面控制器
//        [MBProgressHUD showTopTipMessage:@"网络状态不佳" isWindow:YES];
//    }
//}


//#pragma mark - 网络状态监听 -
//- (void)monitorNetworkStatus
//{
//    // 网络状态改变一次, networkStatusWithBlock就会响应一次
//    [PPNetworkHelper networkStatusWithBlock:^(PPNetworkStatusType networkStatus) {
//
//        switch (networkStatus) {
//                // 未知网络
//            case PPNetworkStatusUnknown:
//                DLog(@"网络环境：未知网络");
//                // 无网络
//            case PPNetworkStatusNotReachable:
//                DLog(@"网络环境：无网络");
//                kPostNotification(KNotificationNetWorkStateChange, @NO);
//                break;
//                // 手机网络
//            case PPNetworkStatusReachableViaWWAN:
//                DLog(@"网络环境：手机自带网络");
//                // 无线网络
//            case PPNetworkStatusReachableViaWiFi:
//                DLog(@"网络环境：WiFi");
//                kPostNotification(KNotificationNetWorkStateChange, @YES);
//                break;
//        }
//
//    }];
//
//}

//+ (AppDelegate *)shareAppDelegate{
//    return (AppDelegate *)[[UIApplication sharedApplication] delegate];
//}


//-(UIViewController *)getCurrentVC{
//
//    UIViewController *result = nil;
//
//    UIWindow * window = [[UIApplication sharedApplication] keyWindow];
//    if (window.windowLevel != UIWindowLevelNormal)
//    {
//        NSArray *windows = [[UIApplication sharedApplication] windows];
//        for(UIWindow * tmpWin in windows)
//        {
//            if (tmpWin.windowLevel == UIWindowLevelNormal)
//            {
//                window = tmpWin;
//                break;
//            }
//        }
//    }
//
//    UIView *frontView = [[window subviews] objectAtIndex:0];
//    id nextResponder = [frontView nextResponder];
//
//    if ([nextResponder isKindOfClass:[UIViewController class]])
//        result = nextResponder;
//    else
//        result = window.rootViewController;
//
//    return result;
//}
//
//-(UIViewController *)getCurrentUIVC
//{
//    UIViewController  *superVC = [self getCurrentVC];
//
//    if ([superVC isKindOfClass:[UITabBarController class]]) {
//
//        UIViewController  *tabSelectVC = ((UITabBarController*)superVC).selectedViewController;
//
//        if ([tabSelectVC isKindOfClass:[UINavigationController class]]) {
//
//            return ((UINavigationController*)tabSelectVC).viewControllers.lastObject;
//        }
//        return tabSelectVC;
//    }else
//        if ([superVC isKindOfClass:[UINavigationController class]]) {
//
//            return ((UINavigationController*)superVC).viewControllers.lastObject;
//        }
//    return superVC;
//}


@end
