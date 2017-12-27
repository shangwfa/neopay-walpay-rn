///
/// MemberCoreService.m
/// WalPay
///
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:436
///



#import "MemberCoreService.h"

@interface MemberCoreService() {

}

@end

@implementation MemberCoreService

/// 添加分享记录
+(void)addShare:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/add_share" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 添加意见反馈
+(void)addFeedback:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/add_feedback" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 检查应用新版本
+(void)checkAppVersion:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/check_app_version" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 发送重置支付密码验证码
+(void)sendResetPayPasswordCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/send_reset_pay_password_code" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 重置支付密码
+(void)resetPayPassword:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/reset_pay_password" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 判断手机号是否注册
+(void)verifyRegisterPhone:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/verify_register_phone" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 发送注册的短信验证码
+(void)sendRegisterCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/send_register_code" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 注册用户
+(void)registerUser:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/register_user" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 发送重置登录密码短信验证码
+(void)sendResetLoginPasswordCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/send_reset_login_password_code" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 重置登录密码
+(void)resetLoginPassword:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/reset_login_password" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 登录用户
+(void)loginUser:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/login_user" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取用户信息
+(void)getUserInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/get_user_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 修改用户信息
+(void)modifyUserInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/modify_user_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取首页消息列表
+(void)messageOverview:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"message/message_overview" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取图片上传token
+(void)getSecurityToken:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/get_security_token" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 修改用户头像
+(void)modifyUserAvatarURL:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"user/modify_user_avatar_url" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 已注册用户收红包
+(void)receiveRedPacket:(NSMutableDictionary *)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/receive_red_packet" andBody:body andSuccess:successFn andFailer:failerFn];
}

@end

