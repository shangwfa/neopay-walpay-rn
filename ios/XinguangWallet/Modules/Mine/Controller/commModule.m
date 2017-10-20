//
//  commModule.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "commModule.h"
#import "RCTBridgeModule.h"

#import "XGQBRestPwdViewController.h"

@implementation commModule

RCT_EXPORT_MODULE()

//RN跳转回原生界面
RCT_EXPORT_METHOD(closeRNPage){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [kNotificationCenter postNotificationName:kNotificationRNJumpBackToNative object:nil];
    });
}

//RN弹窗SVProgressHUD方式
RCT_EXPORT_METHOD(toast:(NSString*)msg){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [SVProgressHUD showInfoWithStatus:msg];
     
    });
}

//传递网络参数
RCT_EXPORT_METHOD(netCommParas:(RCTResponseSenderBlock)callback){
    
        NSMutableDictionary *netParas = [NSMutableDictionary dictionary];
        [netParas setObject:[IphoneDevice deviceVersion] forKey:@"deviceType"];
        [netParas setObject:[SystemMethods SystemGetSoftVersion] forKey:@"deviceVersion"];
        [netParas setObject:@"2"forKey:@"loginTerminalType"];
        [netParas setObject:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forKey:@"deviceId"];
        [netParas setObject:@"123" forKey:@"macUrl"];
        [netParas setObject:@"CDMA" forKey:@"operator"];
        
        
//        [netParas setObject:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
//        [netParas setObject:[GVUserDefaults standardUserDefaults].name forKey:@"name"];
//        [netParas setObject:[GVUserDefaults standardUserDefaults].avatarUrl forKey:@"avatarUrl"];
//        [netParas setObject:[GVUserDefaults standardUserDefaults].phone forKey:@"avatarUrl"];
//
        callback(@[[NSNull null],netParas]);
}

//跳转至原生特定页面
RCT_EXPORT_METHOD(jumpToNativePage:(id)type:(id)params){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([params[@"page"] isEqualToString:@"resetLoginPwd"]) {
            [kNotificationCenter postNotificationName:kNotificationRNJumpBackToNativeResetLoginPwd object:@NO];
        }
//        else if ([params[@"page"] isEqualToString:@"resetPayPwd"]) {
//            [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
//
//        }
//
//        NSLog(@"%@ %@",NSStringFromClass([type class]),NSStringFromClass([params class]));
    });
}


//打电话
RCT_EXPORT_METHOD(rnCallNative:(NSString*)phoneNo){

        NSURL *phoneURL = [NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",phoneNo]];
        [[UIApplication sharedApplication]openURL: phoneURL];

}




    
@end
