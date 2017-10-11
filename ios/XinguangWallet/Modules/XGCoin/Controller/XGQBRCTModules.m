//
//  XGQBRCTModules.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRCTModules.h"
#import "RCTBridgeModule.h"

@implementation XGQBRCTModules

//RN跳转回原生界面
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(JumpBackToLogin:(NSString*)msg){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        NSLog(@"RN传入原生界面的数据为:%@",msg);
        
        [kNotificationCenter postNotificationName:KNotificationLoginStateChange object:@NO];
        
    });
}
    
@end
