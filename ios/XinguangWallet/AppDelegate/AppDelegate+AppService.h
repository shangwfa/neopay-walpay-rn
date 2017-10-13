//
//  AppDelegate+AppService.h
//  MiAiApp
//
//  Created by JK on 2017/5/19.
//  Copyright © 2017年 JK. All rights reserved.
//

#import "AppDelegate.h"

//#define ReplaceRootViewController(vc) [[AppDelegate shareAppDelegate] replaceRootViewController:vc]

/**
 包含第三方 和 应用内业务的实现，减轻入口代码压力
 */
@interface AppDelegate (AppService)

///初始化通知服务
-(void)initService;

///初始化 window
-(void)initWindow;

////初始化用户系统
-(void)initUserManager;


///初始化第三方控件
-(void)initThirdPartComponents;


@end
