///
/// AssistCoreService.m
/// WalPay
///
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:224
///



#import "AssistCoreService.h"

@interface AssistCoreService() {

}

@end

@implementation AssistCoreService

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

@end

