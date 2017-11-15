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
//RN跳转修改登录密码页面
#define kNotificationRNJumpBackToNativeResetLoginPwd @"RNJumpBackToNativeResetLoginPwd"
//RN跳转修改支付密码页面
#define kNotificationRNJumpBackToNativeResetPayPwd @"RNJumpBackToNativeResetPayPwd"
//RN跳转进入二级页面
#define kNotificationRNJumpIntoSecondLevel @"RNJumpIntoSecondLevel"
//RN跳回一级页面
#define kNotificationRNJumpBackToFirstLevel @"RNJumpBackToFirstLevel"

//Test UINavigationController push之后通知tabbar禁用自定义右划手势
#define kNotificationNavPushToSecondLevel @"NavPushToSecondLevel"

//Test UINavigationController push回来之后通知tabbar启用自定义右划手势
#define kNotificationNavPopToFirstLevel @"NavPopToFirstLevel"


//从注册页面跳转至重置密码页面


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
