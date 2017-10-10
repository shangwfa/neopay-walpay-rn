///
/// BalanceCoreService.h
/// WalPay
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:393
///



@interface BalanceCoreService : ABNetworkManager

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

/// 获取红包列表
+(void)queryRecentRedPacketList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取红包限额
+(void)getRedPacketLimit:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 创建红包
+(void)createRedPacket:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 添加红包领取人
+(void)addRedPacketReceiver:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询用户未领取的红包列表
+(void)queryUserReceivableRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 收红包
+(void)receiveRedPacket:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取红包详细信息
+(void)getRedPacketInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取红包领取信息
+(void)queryRedPacketReceiveList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户红包统计
+(void)getUserRedPacketStatis:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 红包交易明细
+(void)queryRedPacketRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户发出的红包分页列表
+(void)queryMerchantRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取商户用户红包列表
+(void)queryMerchantUserRedPacketPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取红包主题列表
+(void)queryRedPacketThemeList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 发送重置支付密码验证码
+(void)sendResetPayPasswordCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 重置支付密码
+(void)resetPayPassword:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 创建付款码
+(void)createPayQrcode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 创建支付订单
+(void)createPayOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取上一次付款方式
+(void)getRecentPayType:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询银行卡交易记录
+(void)queryBankCardRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询银行卡交易月统计
+(void)queryBankCardStatisList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询账单详情
+(void)getUserOrderDetail:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询用户账单记录
+(void)queryUserOrderPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户余额
+(void)getUserBalance:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取余额交易记录
+(void)queryBalanceRecordPage:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取余额交易月统计
+(void)queryBalanceStatisList:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 计算提现手续费
+(void)getWithdrawFee:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 提现
+(void)createWithdrawOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 充值
+(void)createRechargeOrder:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户当日可充值信息
+(void)getBankCardRechargeableInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 查询我的资产
+(void)getUserAssetInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

@end

