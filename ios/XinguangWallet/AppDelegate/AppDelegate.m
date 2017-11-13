//
//  AppDelegate.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate () 

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
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
    
}
//手动消除以下方法的报警,原因是block参数缺少void
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wstrict-prototypes"
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler NS_AVAILABLE_IOS(10.0) {
    // Required
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [JPUSHService handleRemoteNotification:userInfo];
    }
    completionHandler();  // 系统要求执行这个方法
}

#pragma clang diagnostic pop

-(NSArray *)jsCodeLocationArr
{
    if (!_jsCodeLocationArr) {
        NSString *str1 = @"http://localhost:8081/index.ios.bundle?platform=ios";
        
        NSString *str2 = @"http://172.16.33.182:8081/index.ios.bundle?platform=ios";
        
        NSString *str3 = @"http://172.16.33.11:8081/index.ios.bundle?platform=ios";
        
        NSString *str4 = [[NSBundle mainBundle]pathForResource:@"main" ofType:@"jsbundle"];

        _jsCodeLocationArr = [NSArray arrayWithObjects:str1,str2,str3,str4, nil];
    }
    return _jsCodeLocationArr;
}




@end
