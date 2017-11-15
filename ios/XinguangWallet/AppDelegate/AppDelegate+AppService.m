//
//  AppDelegate+AppService.m
//  MiAiApp
//
//  Created by JK on 2017/5/19.
//  Copyright © 2017年 JK. All rights reserved.
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
    
    //初始化标题栏
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    
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
    [IQKeyboardManager sharedManager].enableAutoToolbar = YES;
    [IQKeyboardManager sharedManager].toolbarManageBehaviour = IQAutoToolbarByPosition;
    [IQKeyboardManager sharedManager].placeholderFont = kSYSTEMFONT(12.0f);
    [IQKeyboardManager sharedManager].keyboardDistanceFromTextField = 20;
    
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
            //没有Token,自动进入登录界面
            kPostNotification(kNotificationLoginStateChange, @NO);
        }else{
            //有token,自动进入主页
            //创建左划视图
            XGQBSideView *sideView = [[XGQBSideView alloc]initWithFrame:CGRectMake(-kScreenWidth*0.33, 0, kScreenWidth*0.66, kScreenHeight)];
            [self.window addSubview:sideView];
            self.sideView = sideView;
            
            //创建tabbarVC
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
        
        XGQBSideView *sideView = [[XGQBSideView alloc]initWithFrame:CGRectMake(-kScreenWidth*0.33, 0, kScreenWidth*0.66, kScreenHeight)];
        [self.window addSubview:sideView];
        self.sideView = sideView;
        
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
        if (self.sideView) {
            [self.sideView removeFromSuperview];
        }
        XGQBRootNavigationController *loginNavi = [[XGQBRootNavigationController alloc]initWithRootViewController:[XGQBLoginViewController new] ];
   
        CATransition *anima = [CATransition animation];
        anima.type = @"fade";//设置动画的类型
        anima.subtype = kCATransitionFromRight; //设置动画的方向
        anima.duration = 0.3f;
        
        self.window.rootViewController = loginNavi;
        
        [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
    }
   
}


@end
