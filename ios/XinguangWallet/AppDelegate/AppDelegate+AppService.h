//
//  AppDelegate+AppService.h
//  MiAiApp
//
//  Created by 徐阳 on 2017/5/19.
//  Copyright © 2017年 徐阳. All rights reserved.
//

#import "AppDelegate.h"

//#define ReplaceRootViewController(vc) [[AppDelegate shareAppDelegate] replaceRootViewController:vc]

/**
 包含第三方 和 应用内业务的实现，减轻入口代码压力
 */
@interface AppDelegate (AppService)
//
///初始化通知服务
-(void)initService;
//
///初始化 window
-(void)initWindow;
//
////初始化用户系统
-(void)initUserManager;
//

///初始化第三方控件
-(void)initThirdPartComponents;

//单例
//+ (AppDelegate *)shareAppDelegate;

/**
 当前顶层控制器
 */
//-(UIViewController*) getCurrentVC;
//
//-(UIViewController*) getCurrentUIVC;
@end
