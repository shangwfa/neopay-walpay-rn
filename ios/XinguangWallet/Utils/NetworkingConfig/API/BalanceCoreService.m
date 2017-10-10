///
/// BalanceCoreService.m
/// WalPay
///
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:393
///



#import "BalanceCoreService.h"

@interface BalanceCoreService() {

}

@end

@implementation BalanceCoreService

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

/// 获取用户银行卡列表
+(void)getUserBankCardList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/get_user_bank_card_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取上次提现银行卡
+(void)getRecentWithdrawBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/get_recent_withdraw_bank_card" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取上次充值银行卡
+(void)getRecentRechargeBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/get_recent_recharge_bank_card" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 发送绑定银行卡短信验证码
+(void)sendBindBankCardCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/send_bind_bank_card_code" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 绑定银行卡
+(void)bindBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/bind_bank_card" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 解绑银行卡
+(void)unbindBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/unbind_bank_card" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 根据银行卡号获取银行信息
+(void)getBankCardBankInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"bank/get_bank_card_bank_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取红包列表
+(void)queryRecentRedPacketList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_recent_red_packet_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取红包限额
+(void)getRedPacketLimit:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/get_red_packet_limit" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 创建红包
+(void)createRedPacket:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/create_red_packet" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 添加红包领取人
+(void)addRedPacketReceiver:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/add_red_packet_receiver" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询用户未领取的红包列表
+(void)queryUserReceivableRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_user_receivable_red_packet_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 收红包
+(void)receiveRedPacket:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/receive_red_packet" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取红包详细信息
+(void)getRedPacketInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/get_red_packet_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取红包领取信息
+(void)queryRedPacketReceiveList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_red_packet_receive_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取用户红包统计
+(void)getUserRedPacketStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/get_user_red_packet_statis" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 红包交易明细
+(void)queryRedPacketRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_red_packet_record_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户发出的红包分页列表
+(void)queryMerchantRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_merchant_red_packet_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取商户用户红包列表
+(void)queryMerchantUserRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_merchant_user_red_packet_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取红包主题列表
+(void)queryRedPacketThemeList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"packet/query_red_packet_theme_list" andBody:body andSuccess:successFn andFailer:failerFn];
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

/// 创建付款码
+(void)createPayQrcode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/create_pay_qrcode" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 创建支付订单
+(void)createPayOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/create_pay_order" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取上一次付款方式
+(void)getRecentPayType:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/get_recent_pay_type" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询银行卡交易记录
+(void)queryBankCardRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/query_bank_card_record_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询银行卡交易月统计
+(void)queryBankCardStatisList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/query_bank_card_statis_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询账单详情
+(void)getUserOrderDetail:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/get_user_order_detail" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询用户账单记录
+(void)queryUserOrderPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"pay/query_user_order_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取用户余额
+(void)getUserBalance:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/get_user_balance" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取余额交易记录
+(void)queryBalanceRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/query_balance_record_page" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取余额交易月统计
+(void)queryBalanceStatisList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/query_balance_statis_list" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 计算提现手续费
+(void)getWithdrawFee:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/get_withdraw_fee" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 提现
+(void)createWithdrawOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/create_withdraw_order" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 充值
+(void)createRechargeOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/create_recharge_order" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 获取用户当日可充值信息
+(void)getBankCardRechargeableInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/get_bank_card_rechargeable_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

/// 查询我的资产
+(void)getUserAssetInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn
{
    [self AFPOSTNetworkWithUrl:@"balance/get_user_asset_info" andBody:body andSuccess:successFn andFailer:failerFn];
}

@end

