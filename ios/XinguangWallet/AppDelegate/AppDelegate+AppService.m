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
#import "XGQBAPPRootViewController.h"
#import "XGQBRNViewController.h"

@implementation AppDelegate (AppService)

#pragma mark - 初始化服务
-(void)initService{
    //注册登录状态监听
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(loginStateChange:)
                                                 name:kNotificationLoginStateChange
                                               object:nil];
    
    //APN推送消息监听
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveAPNNoti) name:kNotificationAPNReceived object:nil];

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
    [IQKeyboardManager sharedManager].enableAutoToolbar = NO;
    [IQKeyboardManager sharedManager].toolbarManageBehaviour = IQAutoToolbarByPosition;
    [IQKeyboardManager sharedManager].placeholderFont = kSYSTEMFONT(12.0f);
    [IQKeyboardManager sharedManager].keyboardDistanceFromTextField = 20;
    
    //SVProgressHUD设置
    [SVProgressHUD setBackgroundColor:UIColorHex(333333)];
    [SVProgressHUD setForegroundColor:kWhiteColor];
    [SVProgressHUD setMinimumDismissTimeInterval:2];
    [SVProgressHUD setInfoImage:nil];
    [SVProgressHUD setSuccessImage:nil];
    //    [SVProgressHUD setImageViewSize:CGSizeMake(10, 10)];
    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeClear];
}


#pragma mark - 初始化用户系统
-(void)initUserManager{

//    如果是第一次使用APP,显示BootVC
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
            [self setupAndJumpIntoMainInterface];
            
        }
    }
}

-(void)loginStateChange:(NSNotification*)notification
{
    BOOL loginSuccess = [notification.object boolValue];
    
    if (loginSuccess) {
        
        [self setupAndJumpIntoMainInterface];
    }else{

        XGQBLoginViewController *loginVC = [XGQBLoginViewController new];
        XGQBRootNavigationController *loginNavi = [[XGQBRootNavigationController alloc]initWithRootViewController:loginVC];
   
        CATransition *anima = [CATransition animation];
        anima.type = @"fade";//设置动画的类型
        anima.subtype = kCATransitionFromRight; //设置动画的方向
        anima.duration = 0.3f;
        
        if ([GVUserDefaults standardUserDefaults].phone) {
            loginVC.userName=[GVUserDefaults standardUserDefaults].phone;
        };
        
        self.window.rootViewController = loginNavi;
        // 清空用户数据
        [self logoutUserInfo];
        
        [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
    }
   
}

-(void)setupAndJumpIntoMainInterface{
    
    XGQBAPPRootViewController *appRootVC = [XGQBAPPRootViewController setupSideVCAndNavVC];
    self.window.rootViewController = appRootVC;
    
    //自定义转场动画
    CATransition *anima = [CATransition animation];
    anima.type = @"fade";//设置动画的类型
    anima.subtype = kCATransitionFromRight; //设置动画的方向
    anima.duration = 0.3f;
    
    [kAppWindow.layer addAnimation:anima forKey:@"revealAnimation"];
    
    [self didReceiveAPNNoti];

}

-(void)didReceiveAPNNoti
{

    XGQBAPPRootViewController *appRootVC = (XGQBAPPRootViewController*)self.window.rootViewController;
    
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication]delegate];
    
    [appRootVC closeSideView];
    [appRootVC.rootNAV popToRootViewControllerAnimated:YES];
    
    if (appDelegate.notiBody.noticeType==XGQBMsgTypeRedPacket) {
        
        [appRootVC.homeVC checkIDStatus];
        if ([GVUserDefaults standardUserDefaults].authStatus==XGQBUserAuthStatusUnauthorized) {
            //跳转完成后清空msgType
            appDelegate.notiBody=nil;
            return;
        }
        
        //发送领取红包指令
        NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
        [body setObject:appDelegate.notiBody.params.redPacketCode forKey:@"packetCode"];
        [body setObject:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
        [MemberCoreService receiveRedPacket:body andSuccessFn:^(id responseAfter, id responseBefore) {
            XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
            RNVC.pageType = @"rpDetail";
            RNVC.data=[@{@"packetCode":appDelegate.notiBody.params.redPacketCode} mutableCopy];
            [appRootVC.rootNAV pushViewController:RNVC animated:YES];
            //跳转完成后清空msgType
            appDelegate.notiBody=nil;
        } andFailerFn:^(NSError *error) {
            nil;
            //跳转完成后清空msgType
            appDelegate.notiBody=nil;
        }];

        
//        XGQBRNViewController *RNVC = [XGQBRNViewController new];
//        RNVC.pageType=@"redList";
//        [appRootVC.rootNAV pushViewController:RNVC animated:YES];
    }else if (appDelegate.notiBody.noticeType==XGQBMsgTypePayNotice){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType=@"payMessage";
        [appRootVC.rootNAV pushViewController:RNVC animated:YES];
        //跳转完成后清空msgType
        appDelegate.notiBody=nil;
    }else if (appDelegate.notiBody.noticeType==XGQBMsgTypePhoneRechargeSuccess){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType=@"topupMsgList";
        [appRootVC.rootNAV pushViewController:RNVC animated:YES];
        //跳转完成后清空msgType
        appDelegate.notiBody=nil;
    }else if(appDelegate.notiBody.noticeType==XGQBMsgTypePhoneDataRechargeSuccess){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType=@"topupMsgList";
        [appRootVC.rootNAV pushViewController:RNVC animated:YES];
        //跳转完成后清空msgType
        appDelegate.notiBody=nil;
    }
    

}

-(void)logoutUserInfo
{
    //清空公共参数
    [GVUserDefaults standardUserDefaults].name=nil;
    [GVUserDefaults standardUserDefaults].uuid=nil;
    [GVUserDefaults standardUserDefaults].phone=nil;
    [GVUserDefaults standardUserDefaults].userStatus=0;
    [GVUserDefaults standardUserDefaults].nickName=nil;
    [GVUserDefaults standardUserDefaults].authStatus=0;
    [GVUserDefaults standardUserDefaults].avatarUrl=nil;
    [GVUserDefaults standardUserDefaults].accessToken=nil;
}


@end
