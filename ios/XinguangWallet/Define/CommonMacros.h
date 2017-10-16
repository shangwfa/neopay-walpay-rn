//
//  CommonMacros.h
//  MiAiApp
//
//  Created by JK on 2017/5/31.
//  Copyright © 2017年 JK. All rights reserved.
//

//全局标记字符串，用于 通知 存储

#ifndef CommonMacros_h
#define CommonMacros_h

#pragma mark - ——————— 用户相关 ————————
//登录状态改变通知
#define kNotificationLoginStateChange @"loginStateChange"

//RN跳回原生界面通知
#define kNotificationRNJumpBackToNative @"RNJumpBackToNative"

//进行实名认证通知
#define kNotificationRegisterIDAction @"KNotificationRegisterIDAction"

//被踢下线
//#define KNotificationOnKick @"KNotificationOnKick"

//用户信息缓存 名称
//#define KUserCacheName @"KUserCacheName"

//用户model缓存
//#define KUserModelCache @"KUserModelCache"



#pragma mark - ——————— 网络状态相关 ————————

//网络状态变化
//#define KNotificationNetWorkStateChange @"KNotificationNetWorkStateChange"

#endif /* CommonMacros_h */
