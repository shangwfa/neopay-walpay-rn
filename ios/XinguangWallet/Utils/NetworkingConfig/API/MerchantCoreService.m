///
/// MerchantCoreService.m
/// WalPay
///
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:251
///



#import "MerchantCoreService.h"

@interface MerchantCoreService() {

}

@end

@implementation MerchantCoreService

/// 获取手机充值产品列表
+(void)queryPhoneRechargeProductList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pcharge/query_phone_recharge_product_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 创建手机充值订单
+(void)createPhoneRechargeOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pcharge/create_phone_recharge_order" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取充值记录列表
+(void)queryPhoneRechargePage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pcharge/query_phone_recharge_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

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

/// 签到
+(void)checkIn:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/check_in" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取签到信息
+(void)getCheckInInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/get_check_in_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取签到列表
+(void)queryCheckInPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"assist/query_check_in_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户信息
+(void)getMerchantInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/get_merchant_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取首页banner列表
+(void)queryBannerList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_banner_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取我的中奖统计
+(void)getUserActivityStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/get_user_activity_statis" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取平台发布活动统计
+(void)getPlatformActivityStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/get_platform_activity_statis" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取我参与的活动列表
+(void)queryUserActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_user_activity_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户活动banner列表
+(void)queryMerchantBannerList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_merchant_banner_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户会员列表
+(void)queryUserMerchantList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_user_merchant_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户活动列表
+(void)queryMerchantActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_merchant_activity_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取用户参与活动信息
+(void)getUserActivityInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/get_user_activity_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取新光币活动列表
+(void)queryNeocoinActivityList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_neocoin_activity_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取新光币活动列表
+(void)queryNeocoinActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"merchant/query_neocoin_activity_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

@end

