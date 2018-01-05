///
/// MemberCoreService.h
/// WalPay
/// Created by iosCodeGenerator on 2017-09-28 18:23:07:436
///



@interface MemberCoreService : ABNetworkManager

/// 添加分享记录
+(void)addShare:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 添加意见反馈
+(void)addFeedback:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 检查应用新版本
+(void)checkAppVersion:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 发送重置支付密码验证码
+(void)sendResetPayPasswordCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 重置支付密码
+(void)resetPayPassword:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 判断手机号是否注册
+(void)verifyRegisterPhone:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 发送注册的短信验证码
+(void)sendRegisterCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 注册用户
+(void)registerUser:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 发送重置登录密码短信验证码
+(void)sendResetLoginPasswordCode:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 重置登录密码
+(void)resetLoginPassword:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 登录用户
+(void)loginUser:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取用户信息
+(void)getUserInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 修改用户信息
+(void)modifyUserInfo:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取首页消息列表
+(void)messageOverview:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 获取图片上传Token
+(void)getSecurityToken:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 修改用户头像
+(void)modifyUserAvatarURL:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 已注册用户收红包
+(void)receiveRedPacket:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 上传极光推送registrationID
+(void)uploadUserDevice:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

/// 更新消息已读状态
+(void)updateReadStatusMsg:(NSMutableDictionary*)body andSuccessFn:(serverSuccessFn)successFn andFailerFn:(serverFailureFn)failerFn;

@end

