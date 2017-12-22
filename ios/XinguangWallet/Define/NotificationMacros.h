//
//  NotificationMacros.h
//  MiAiApp
//
//  Created by JK on 2017/5/31.
//  Copyright © 2017年 JK. All rights reserved.
//

//全局标记字符串，用于 通知 存储

#ifndef NotificationMacros_h
#define NotificationMacros_h

#pragma mark - ——————— 通知相关 ————————
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
//RN通知打开系统通讯录
#define kNotificationRNModalContactList @"RNModalContactList"
//原生获得通讯录手机号
#define kNotificationGetContactPhoneNoToRN @"GetContactPhoneNoToRN"
//Test UINavigationController push之后通知tabbar禁用自定义右划手势
#define kNotificationNavPushToSecondLevel @"NavPushToSecondLevel"
//Test UINavigationController push回来之后通知tabbar启用自定义右划手势
#define kNotificationNavPopToFirstLevel @"NavPopToFirstLevel"
//进行实名认证通知
#define kNotificationRegisterIDAction @"KNotificationRegisterIDAction"
//侧边栏更新头像和用户名
#define kNotificationSideViewUpdateAvatar @"kNotificationSideViewUpdateAvatar"
//RN请求原生图片,更换头像
#define kNotificationRNModalPicSelActSheet @"kNotificationRNModalPicSelActSheet"
//原生上传完成头像后,给RN发送URL通知
#define kNotificationNativeSendAvatarURLToRN @"kNotificationNativeSendAvatarURLToRN"
//RN页面分享红包
#define kNotificaitonRNCallNativeCallShare @"kNotificaitonRNCallNativeCallShare"

#pragma mark - ——————— 网络状态相关 ————————

//网络状态变化
//#define KNotificationNetWorkStateChange @"KNotificationNetWorkStateChange"

#endif /* NotificationMacros_h */
