//
//  commModule.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "commModule.h"
#import "RCTBridgeModule.h"


#import "RCTBridge.h"
#import "RCTEventDispatcher.h"


//#import "XGQBRestPwdViewController.h"

@implementation commModule

@synthesize bridge=_bridge;

-(instancetype)init
{
   self = [super init];
    [kNotificationCenter addObserver:self selector:@selector(sendContactNumber:) name:kNotificationGetContactPhoneNoToRN object:nil];
    return self;
}


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

//RN显示网络加载
RCT_EXPORT_METHOD(showLoadingDialog){
    dispatch_async(dispatch_get_main_queue(), ^{
        [SVProgressHUD show];
    });
//    //临时:2s后取消网络加载框
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//        [SVProgressHUD dismiss];
//    });
}

//RN取消显示网络加载
RCT_EXPORT_METHOD(hideLoadingDialog){
    dispatch_async(dispatch_get_main_queue(), ^{
        [SVProgressHUD dismiss];
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
    
        [netParas setObject:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
    
    
    //将字典转换成JSON字符串
    NSData *netPaData = [NSJSONSerialization dataWithJSONObject:netParas options:NSJSONWritingPrettyPrinted error:nil];
    
    NSString *netPaStr = [[NSString alloc]initWithData:netPaData encoding:NSUTF8StringEncoding];
    NSMutableString *netPaStrAfter = [netPaStr mutableCopy];

    [netPaStrAfter replaceOccurrencesOfString:@" " withString:@"" options:(NSLiteralSearch) range:NSMakeRange(0, netPaStr.length)];

    [netPaStrAfter replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:NSMakeRange(0, netPaStrAfter.length)];
    
        callback(@[netPaStrAfter]);
}

//跳转至原生特定页面
RCT_EXPORT_METHOD(jumpToNativePage:(id)type:(id)params){

    //序列化
    NSData *jsonData = [params dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:nil];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([dict[@"page"] isEqualToString:@"resetLoginPwd"]) {
            [kNotificationCenter postNotificationName:kNotificationRNJumpBackToNativeResetLoginPwd object:@NO];
        }
        else if ([dict[@"page"]  isEqualToString:@"resetPayPwd"]) {
            [kNotificationCenter postNotificationName:kNotificationRNJumpBackToNativeResetPayPwd object:@NO];
        }
    });

}

//RN端点击退出登录按钮
RCT_EXPORT_METHOD(logoutFromRN){
    dispatch_async(dispatch_get_main_queue(), ^{
    [kNotificationCenter postNotificationName:kNotificationLoginStateChange object:@NO];
    });
}


//打电话
RCT_EXPORT_METHOD(rnCallNative:(NSString*)phoneNo){
     NSURL *phoneURL = [NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",phoneNo]];
    [[UIApplication sharedApplication]openURL: phoneURL];

}

//RN进入二级页面,禁用系统右划手势
RCT_EXPORT_METHOD(rnJumpIntoSecondLevel){
    
        [kNotificationCenter postNotificationName:kNotificationRNJumpIntoSecondLevel object:nil];
}


//RN进入一级页面,开启系统优化手势
RCT_EXPORT_METHOD(rnJumpBackToFirstLevel){

        [kNotificationCenter postNotificationName:kNotificationRNJumpBackToFirstLevel object:nil];
}

//RN页面设置标题栏默认黑色
RCT_EXPORT_METHOD(statusBarDefault){
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
    });
}

//RN页面设置标题栏白色
RCT_EXPORT_METHOD(statusBarLight){
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    });
}

//RN页面跳转系统通讯录
RCT_EXPORT_METHOD(rnModalContactList){
    [kNotificationCenter postNotificationName:kNotificationRNModalContactList object:nil];
}

//传递手机充值页面手机号
RCT_EXPORT_METHOD(contactCommNumber:(RCTResponseSenderBlock)callback){
    NSString *phoneNo = [GVUserDefaults standardUserDefaults].phone;
    callback(@[phoneNo]);
}

//发送手机号至JS
- (void)sendContactNumber:(NSNotification *)notification
{
    //显示方法过期,但为了与Android那边保持一致的代码,还是使用eventDispatcher发送事件
    [self.bridge.eventDispatcher sendAppEventWithName:@"ContactSelected"
                                                 body:notification.userInfo[@"PhoneNo"]];
}
    
@end
