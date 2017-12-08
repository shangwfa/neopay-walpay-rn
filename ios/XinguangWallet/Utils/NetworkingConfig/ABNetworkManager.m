//
//  ABNetworkManager.m
//  ABroad
//
//  Created by gaojun on 16/8/17.
//  Copyright © 2016年 jesus. All rights reserved.
//

#import "ABNetworkManager.h"
#import "AFNetworking.h"
//#import "JSONKit.h"
#import "ABNetworkCofing.h"

#define Network_data_flag @"data"                               //数据标志
#define Network_data_info @"message"                            //数据信息
#define Network_error_flag @"code"                              //错误标识
#define Network_success_flag @"1"                               //当错误标志为该值时，通讯成功
#define Network_error_message_flag @"message"                   //服务器错误提示
#define Network_error_network @"网络错误，请检查网络情况"           //网络通信错误提示语 ErrorCode = 400
#define Network_error_notknow @"网络通信错误，数据异常"             //未知错误（数据格式异常） ErrorCode = 401
#define Network_error_AFError @"网络通讯异常，请检查网络情况"        //AF通讯异常 ErrorCode = 404

#pragma mark - Default Value

#define Network_Default_From @"app"


@implementation ABNetworkManager{
    AFHTTPSessionManager *manager;
}

+(ABNetworkManager *)share{
    
    static ABNetworkManager *obj = nil;
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        obj = [[ABNetworkManager alloc] init];
    });
    
    return obj;
}

-(id)init{
    self = [super init];
    if (self != nil) {
        manager = [[AFHTTPSessionManager manager] initWithBaseURL:[NSURL URLWithString:Host_Url]];
        CGRect rectScreen = [[UIScreen mainScreen]bounds];
        CGSize sizeScreen = rectScreen.size;
        CGFloat scaleScreen = [UIScreen mainScreen].scale;
        CGFloat width = sizeScreen.width*scaleScreen;
        CGFloat height = sizeScreen.height*scaleScreen;
        
        //请求类型默认为二进制 可以修改为JSON和plist
//        manager.requestSerializer = [AFHTTPRequestSerializer serializer];
        manager.requestSerializer = [AFJSONRequestSerializer serializer];
        //返回类型默认为二进制，可以修改为JSON
        manager.responseSerializer = [AFHTTPResponseSerializer serializer];
        
//        [manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
        //设置超时
        //        manager.requestSerializer= 45;
        
        // Header放入文件
        [manager.requestSerializer setValue:[IphoneDevice deviceVersion] forHTTPHeaderField:@"deviceType"];
        [manager.requestSerializer setValue:[SystemMethods SystemGetSoftVersion] forHTTPHeaderField:@"deviceVersion"];
        [manager.requestSerializer setValue:@"2" forHTTPHeaderField:@"loginTerminalType"];
        [manager.requestSerializer setValue:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forHTTPHeaderField:@"deviceId"];
        [manager.requestSerializer setValue:@"" forHTTPHeaderField:@"macUrl"];
        [manager.requestSerializer setValue:@"" forHTTPHeaderField:@"operator"];
        [manager.requestSerializer setValue:[NSString stringWithFormat:@"%.0f X %.0f",height,width] forHTTPHeaderField:@"resolution"];
    
        //        [manager.requestSerializer setValue:Network_Default_From forHTTPHeaderField:@"from"];
        //        [manager.requestSerializer setValue:appDelegate.userHasLogin.token forHTTPHeaderField:@"token"];
    }
    return self;
}

+(void)LogSuccessResponse:(id)responseObject
         successFn:(serverSuccessFn)successFn
{
    successFn([responseObject objectForKey:@"data"],responseObject);
}

+(void)LogFailerResponse:(NSError*)error
                failerFn:(serverFailureFn)failerFn
{
    if(error.code == -1001)
    {
        [SVProgressHUD showInfoWithStatus:@"网络不给力"];
    }else if (error.code == -1000 || error.code == -1003 || error.code == -1004)
    {
        [SVProgressHUD showInfoWithStatus:@"系统忙，请稍候再试"];
    }else if (error.code == -1009)
    {
        [SVProgressHUD showInfoWithStatus:@"似乎已断开与互联网连接，请检查网络设置"];
    }else
    {
        [SVProgressHUD showInfoWithStatus:@"网络不给力"];
    }
    failerFn(error);
}

+(void)AFGETNetworkWithUrl:(NSString *)url andBody:(NSDictionary *)body andSuccess:(serverSuccessFn)successFn andFailer:(serverFailureFn)failerFn
{
    AFHTTPSessionManager* manager = [[AFHTTPSessionManager manager] initWithBaseURL:[NSURL URLWithString:Host_Url]];
    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",@"text/json", @"text/plain", @"text/html",@"application/x-www-form-urlencoded",nil];
    manager.responseSerializer.stringEncoding = kCFStringEncodingUTF8;
    manager.requestSerializer = [AFJSONRequestSerializer serializer];
    //返回类型默认为二进制，可以修改为JSON
//    manager.responseSerializer = [AFHTTPResponseSerializer serializer];
//    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObject:@"text/html"];
    
//    CGRect rectScreen = [[UIScreen mainScreen]bounds];
//    CGSize sizeScreen = rectScreen.size;
//    CGFloat scaleScreen = [UIScreen mainScreen].scale;
    
    url = [url stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet characterSetWithCharactersInString:@"`#%^{}\"[]|\\<> "].invertedSet];
    
    [manager GET:url parameters:body progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
//        [self parseResponse:responseObject successFn:successFn failureFn:failerFn];
//        JKLog(@"res is %@",responseObject);
        [self LogSuccessResponse:responseObject successFn:successFn];
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
//        [self parseResponse:error successFn:successFn failureFn:failerFn];
//        JKLog(@"error is %@",error);
        [self LogFailerResponse:error failerFn:failerFn];
    }];
}

+(void)AFPOSTNetworkWithUrl:(NSString *)url andBody:(NSMutableDictionary *)body andSuccess:(serverSuccessFn)successFn andFailer:(serverFailureFn)failerFn
{
    AFHTTPSessionManager* manager = [[AFHTTPSessionManager manager] initWithBaseURL:[NSURL URLWithString:Host_Url]];
    
    //设置manager参数
    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",@"text/json", @"text/plain", @"text/html",@"application/x-www-form-urlencoded",nil];
    manager.responseSerializer.stringEncoding = kCFStringEncodingUTF8;
    manager.requestSerializer = [AFHTTPRequestSerializer serializer];
    manager.requestSerializer.timeoutInterval = 10.f;

    [manager.requestSerializer
     setValue:@"application/x-www-form-urlencoded;charset=utf-8"
     forHTTPHeaderField:@"Content-Type"];
    
    [manager.requestSerializer setValue:[IphoneDevice deviceVersion] forHTTPHeaderField:@"deviceType"];
    [manager.requestSerializer setValue:[SystemMethods SystemGetSoftVersion] forHTTPHeaderField:@"deviceVersion"];
    [manager.requestSerializer setValue:@"2" forHTTPHeaderField:@"loginTerminalType"];
    [manager.requestSerializer setValue:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forHTTPHeaderField:@"deviceId"];
    [manager.requestSerializer setValue:@"123" forHTTPHeaderField:@"macUrl"];
    [manager.requestSerializer setValue:@"CDMA" forHTTPHeaderField:@"operator"];
    
    [body setObject:[IphoneDevice deviceVersion] forKey:@"deviceType"];
    [body setObject:[SystemMethods SystemGetSoftVersion] forKey:@"deviceVersion"];
    [body setObject:@"2"forKey:@"loginTerminalType"];
    [body setObject:[[[UIDevice currentDevice] identifierForVendor] UUIDString] forKey:@"deviceId"];
    [body setObject:@"123" forKey:@"macUrl"];
    [body setObject:@"CDMA" forKey:@"operator"];
    
    //返回类型默认为二进制，可以修改为JSON
    //    manager.responseSerializer = [AFHTTPResponseSerializer serializer];
    //    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObject:@"text/html"];
    
    url = [url stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet characterSetWithCharactersInString:@"`#%^{}\"[]|\\<> "].invertedSet];
    [manager POST:url parameters:body progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        //        [self parseResponse:responseObject successFn:successFn failureFn:failerFn];

        //执行代码段
        if([[responseObject objectForKey:@"retCode"] intValue] == 1)
        {
            [self LogSuccessResponse:responseObject successFn:successFn];
        }else if([[responseObject objectForKey:@"retCode"] intValue] == 1226)
        {
            [self LogSuccessResponse:responseObject successFn:successFn];
        }else if([[responseObject objectForKey:@"retCode"] intValue] == 1113)
        {
            [self LogSuccessResponse:responseObject successFn:successFn];
        }else if([[responseObject objectForKey:@"retCode"] intValue] == 1124)
        {
            [self LogSuccessResponse:responseObject successFn:successFn];
        }else
        {
            [self LogSuccessResponse:responseObject successFn:successFn];
            [SVProgressHUD showInfoWithStatus:[responseObject objectForKey:@"retMsg"]];
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        //        [self parseResponse:error successFn:successFn failureFn:failerFn];
        [SVProgressHUD dismiss];
        [self LogFailerResponse:error failerFn:failerFn];
    }];
}

@end
