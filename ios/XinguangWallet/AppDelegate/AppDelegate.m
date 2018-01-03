//
//  AppDelegate.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "AppDelegate.h"

#import "XGQBPushNotiBody.h"

@interface AppDelegate () 

@end


@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    //根据点击不同消息类型跳转不同页面
    NSDictionary *remoteNotification = [launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];
    
    if (remoteNotification) {
        
        NSString *notiStr = remoteNotification[@"extraParam"];
        
        XGQBPushNotiBody *notiBody = [XGQBPushNotiBody modelWithJSON:notiStr];
        
        [self handlePageNaviWithNotiBody:notiBody];
        
    }
    
    // 注册显示应用程序BadgeNumber的通知
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge categories:nil];
    [application registerUserNotificationSettings:settings];
    
    
    ///初始化用户登录通知和网络改变通知
    [self initService];
    
    ///初始化窗口
    [self initWindow];
    
    ///初始化用户管理
    [self initUserManager];
    
    //初始化第三方控件 SVProgressHUD/IQKeyboardManager
    [self initThirdPartComponents];
    
    ///显示广告页
    //[XGQBAppManager appStart];
    
    //初始化Jpush推送服务
    [self initJpushServiceWithOptions:launchOptions];
    [kNotificationCenter addObserver:self selector:@selector(JpushDidLoginPushServiceSuccWithNotification:) name:kJPFNetworkDidLoginNotification object:nil];
    
    /* 打开调试日志 */
    [[UMSocialManager defaultManager] openLog:YES];
    
    /* 设置友盟appkey */
    [[UMSocialManager defaultManager] setUmSocialAppkey:@"e8dc85749082074f7837af13279f7189"];
    
    [self configUSharePlatforms];
    
    [self confitUShareSettings];
    
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    
    [JPUSHService resetBadge];
    [kApplication setApplicationIconBadgeNumber:0];
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}



#pragma mark- JPUSHRegisterDelegate
// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger options))completionHandler NS_AVAILABLE_IOS(10.0){
    // Required
    NSDictionary * userInfo = notification.request.content.userInfo;
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
    }
    completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
    JKLog(@"接收到系统通知");
}
//手动消除以下方法的报警,原因是block参数缺少void
//#pragma clang diagnostic push
//#pragma clang diagnostic ignored "-Wstrict-prototypes"
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler NS_AVAILABLE_IOS(10.0) {
    // Required
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
    }
    completionHandler();  // 系统要求执行这个方法
    JKLog();
    
    if (userInfo) {
        
        NSString *notiStr = userInfo[@"extraParam"];
        
        NSData *stringData = [notiStr dataUsingEncoding:NSUTF8StringEncoding];
        
        NSDictionary *json = [NSJSONSerialization JSONObjectWithData:stringData options:0 error:nil];
        
        NSString *notiDict = json[@"params"];
        
        XGQBPushNotiParams *notiParams = [XGQBPushNotiParams modelWithJSON:notiDict];
        //YYModel嵌套解析失败,不知原因
        XGQBPushNotiBody *notiBody = [XGQBPushNotiBody modelWithJSON:json];
        
        notiBody.params = notiParams;
        
        [self handlePageNaviWithNotiBody:notiBody];
        
    }

    
}

//#pragma clang diagnostic pop

-(void)JpushDidLoginPushServiceSuccWithNotification:(NSNotification*)noti
{
    if([GVUserDefaults standardUserDefaults].accessToken){//如果已登录,上传registrationID
        NSString *registrationID=[JPUSHService registrationID];
        JKLog(@"%@",registrationID);
        
        NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
        [body setObject:registrationID forKey:@"registrationId"];
        [body setObject:@2 forKey:@"terminal"];
        
        [MemberCoreService uploadUserDevice:body andSuccessFn:^(id responseAfter, id responseBefore) {
            JKLog(@"上传registrationID成功");
        } andFailerFn:^(NSError *error) {
            nil;
        }];
    }
    
}

#pragma mark - UShare
- (void)confitUShareSettings
{
    /*
     * 打开图片水印
     */
    //[UMSocialGlobal shareInstance].isUsingWaterMark = YES;
    
    /*
     * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
     <key>NSAppTransportSecurity</key>
     <dict>
     <key>NSAllowsArbitraryLoads</key>
     <true/>
     </dict>
     */
    //[UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
    
}

- (void)configUSharePlatforms
{
    /*
     设置微信的appKey和appSecret
     [微信平台从U-Share 4/5升级说明]http://dev.umeng.com/social/ios/%E8%BF%9B%E9%98%B6%E6%96%87%E6%A1%A3#1_1
     */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wxfe7f59a5684768a7" appSecret:@"e8dc85749082074f7837af13279f7189" redirectURL:nil];
}

// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
    BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
    if (!result) {
        // 其他如支付等SDK的回调
    }
    return result;
}

-(BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
    JKLog(@"接收到跳转指令");
    return YES;
}

#pragma mark - 处理消息跳转
-(void)handlePageNaviWithNotiBody:(XGQBPushNotiBody*)body
{
        if (body) {
            _notiBody= body;
        }
    
    [kNotificationCenter postNotificationName:kNotificationAPNReceived object:nil];
    
}

#pragma mark - 临时增加RN服务器切换
//临时增加RN服务器切换地址
-(NSArray *)jsCodeLocationArr
{
    if (!_jsCodeLocationArr) {
        NSString *str1 = [[NSBundle mainBundle]pathForResource:@"main" ofType:@"jsbundle"];
        
        NSString *str2 = @"http://localhost:8081/index.ios.bundle?platform=ios";
        
        NSString *str3 = @"http://172.16.33.182:8081/index.ios.bundle?platform=ios";
        
        NSString *str4 = @"http://172.16.33.247:8081/index.ios.bundle?platform=ios";
        
        
        _jsCodeLocationArr = [NSArray arrayWithObjects:str1,str2,str3,str4, nil];
    }
    return _jsCodeLocationArr;
}



@end
