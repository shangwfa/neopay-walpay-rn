//
//  AppDelegate+PushService.h
//  MiAiApp
//
//  Created by JK on 2017/5/25.
//  Copyright © 2017年 JK. All rights reserved.
//

#import "AppDelegate.h"

/**
 推送相关在这里处理
 */
@interface AppDelegate (PushService) 

-(void)initJpushServiceWithOptions:(NSDictionary *)launchOptions;

@end
