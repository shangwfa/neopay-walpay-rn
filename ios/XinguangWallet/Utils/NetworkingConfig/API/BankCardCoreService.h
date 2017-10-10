///
/// BankCardCoreService.h
/// WalPay
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:280
///



@interface BankCardCoreService : ABNetworkManager

/// 获取手机充值产品列表
+(void)queryPhoneRechargeProductList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 创建手机充值订单
+(void)createPhoneRechargeOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取充值记录列表
+(void)queryPhoneRechargePage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 添加分享记录
+(void)addShare:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 添加意见反馈
+(void)addFeedback:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 检查应用新版本
+(void)checkAppVersion:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 签到
+(void)checkIn:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取签到信息
+(void)getCheckInInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取签到列表
+(void)queryCheckInPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户信息
+(void)getMerchantInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取首页banner列表
+(void)queryBannerList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取我的中奖统计
+(void)getUserActivityStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取平台发布活动统计
+(void)getPlatformActivityStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取我参与的活动列表
+(void)queryUserActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户活动banner列表
+(void)queryMerchantBannerList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户会员列表
+(void)queryUserMerchantList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户活动列表
+(void)queryMerchantActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户参与活动信息
+(void)getUserActivityInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取新光币活动列表
+(void)queryNeocoinActivityList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取新光币活动列表
+(void)queryNeocoinActivityPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户银行卡列表
+(void)getUserBankCardList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取上次提现银行卡
+(void)getRecentWithdrawBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取上次充值银行卡
+(void)getRecentRechargeBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 发送绑定银行卡短信验证码
+(void)sendBindBankCardCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 绑定银行卡
+(void)bindBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 解绑银行卡
+(void)unbindBankCard:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 根据银行卡号获取银行信息
+(void)getBankCardBankInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

@end

