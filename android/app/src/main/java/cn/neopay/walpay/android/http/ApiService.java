package cn.neopay.walpay.android.http;

import java.util.List;
import java.util.Map;

import cn.neopay.walpay.android.module.response.AppVersionResponseBean;
import cn.neopay.walpay.android.module.response.BalanceRecordResponseBean;
import cn.neopay.walpay.android.module.response.BalanceStatisResponseBean;
import cn.neopay.walpay.android.module.response.BankCardRechargeableInfoResponseBean;
import cn.neopay.walpay.android.module.response.BankCardRecordResponseBean;
import cn.neopay.walpay.android.module.response.BankCardResponseBean;
import cn.neopay.walpay.android.module.response.BannerResponseBean;
import cn.neopay.walpay.android.module.response.BaseResponse;
import cn.neopay.walpay.android.module.response.CheckInInfoResponseBean;
import cn.neopay.walpay.android.module.response.CheckInResponseBean;
import cn.neopay.walpay.android.module.response.GetNewsResponseBean;
import cn.neopay.walpay.android.module.response.LoginResponseBean;
import cn.neopay.walpay.android.module.response.MerchantActivityResponseBean;
import cn.neopay.walpay.android.module.response.MerchantBannerResponseBean;
import cn.neopay.walpay.android.module.response.MerchantInfoResponseBean;
import cn.neopay.walpay.android.module.response.NeocoinActivityResponseBean;
import cn.neopay.walpay.android.module.response.PayOrderResponseBean;
import cn.neopay.walpay.android.module.response.PayQrcodeResponseBean;
import cn.neopay.walpay.android.module.response.PhoneRechargeOrderResponseBean;
import cn.neopay.walpay.android.module.response.PhoneRechargeProductResponseBean;
import cn.neopay.walpay.android.module.response.PlatformActivityStatisResponseBean;
import cn.neopay.walpay.android.module.response.RecentPayTypeResponseBean;
import cn.neopay.walpay.android.module.response.RecentRedPacketResponseBean;
import cn.neopay.walpay.android.module.response.RechargeOrderResponseBean;
import cn.neopay.walpay.android.module.response.RedPacketLimitResponseBean;
import cn.neopay.walpay.android.module.response.RedPacketReceiveResponseBean;
import cn.neopay.walpay.android.module.response.RedPacketRecordResponseBean;
import cn.neopay.walpay.android.module.response.RedPacketResponseBean;
import cn.neopay.walpay.android.module.response.RedPacketThemeResponseBean;
import cn.neopay.walpay.android.module.response.RegisterUserResponseBean;
import cn.neopay.walpay.android.module.response.SecurityTokenResponseBean;
import cn.neopay.walpay.android.module.response.UserActivityInfoResponseBean;
import cn.neopay.walpay.android.module.response.UserActivityResponseBean;
import cn.neopay.walpay.android.module.response.UserActivityStatisResponseBean;
import cn.neopay.walpay.android.module.response.UserAssetInfoResponseBean;
import cn.neopay.walpay.android.module.response.UserBalanceResponseBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.response.UserMerchantResponseBean;
import cn.neopay.walpay.android.module.response.UserOrderDetailResponseBean;
import cn.neopay.walpay.android.module.response.UserOrderResponseBean;
import cn.neopay.walpay.android.module.response.UserRedPacketStatisResponseBean;
import cn.neopay.walpay.android.module.response.VerifyRegisterPhoneResponseBean;
import cn.neopay.walpay.android.module.response.WithdrawFeeResponseBean;
import cn.neopay.walpay.android.module.response.WithdrawOrderResponseBean;
import retrofit2.http.POST;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;
import rx.Observable;


/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe http api
 */

public interface ApiService {

    @POST("employee/login")
    Observable<Result<LoginResponseBean>> login(@QueryMap Map<String, String> map);

    /**
     * 获取手机充值产品列表
     */
    @POST("pcharge/query_phone_recharge_product_list")
    Observable<Result<PhoneRechargeProductResponseBean>> queryPhoneRechargeProductList(@QueryMap Map<String, String> queryPhoneRechargeProductListRequestBean);

    /**
     * 创建手机充值订单
     */
    @POST("pcharge/create_phone_recharge_order")
    Observable<Result<PhoneRechargeOrderResponseBean>> createPhoneRechargeOrder(@QueryMap Map<String, String> createPhoneRechargeOrderRequestBean);

    /**
     * 获取充值记录列表
     */
    @POST("pcharge/query_phone_recharge_page")
    Observable<Result<PhoneRechargeOrderResponseBean>> queryPhoneRechargePage(@QueryMap Map<String, String> queryPhoneRechargePageRequestBean);

    /**
     * 添加分享记录
     */
    @POST("assist/add_share")
    Observable<Result<BaseResponse>> addShare(@QueryMap Map<String, String> addShareRequestBean);

    /**
     * 添加意见反馈
     */
    @POST("assist/add_feedback")
    Observable<Result<BaseResponse>> addFeedback(@QueryMap Map<String, String> addFeedbackRequestBean);

    /**
     * 检查应用新版本
     */
    @POST("assist/check_app_version")
    Observable<Result<AppVersionResponseBean>> checkAppVersion(@QueryMap Map<String, String> checkAppVersionRequestBean);

    /**
     * 签到
     */
    @POST("assist/check_in")
    Observable<Result<BaseResponse>> checkIn(@QueryMap Map<String, String> checkInRequestBean);

    /**
     * 获取签到信息
     */
    @POST("assist/get_check_in_info")
    Observable<Result<CheckInInfoResponseBean>> getCheckInInfo(@QueryMap Map<String, String> getCheckInInfoRequestBean);

    /**
     * 获取签到列表
     */
    @POST("assist/query_check_in_page")
    Observable<Result<CheckInResponseBean>> queryCheckInPage(@QueryMap Map<String, String> queryCheckInPageRequestBean);

    /**
     * 获取商户信息
     */
    @POST("merchant/get_merchant_info")
    Observable<Result<MerchantInfoResponseBean>> getMerchantInfo(@QueryMap Map<String, String> getMerchantInfoRequestBean);

    /**
     * 获取首页banner列表
     */
    @POST("merchant/query_banner_list")
    Observable<Result<List<BannerResponseBean>>> queryBannerList(@QueryMap Map<String, String> queryBannerListRequestBean);

    /**
     * 获取我的中奖统计
     */
    @POST("merchant/get_user_activity_statis")
    Observable<Result<UserActivityStatisResponseBean>> getUserActivityStatis(@QueryMap Map<String, String> getUserActivityStatisRequestBean);

    /**
     * 获取平台发布活动统计
     */
    @POST("merchant/get_platform_activity_statis")
    Observable<Result<PlatformActivityStatisResponseBean>> getPlatformActivityStatis(@QueryMap Map<String, String> getPlatformActivityStatisRequestBean);

    /**
     * 获取我参与的活动列表
     */
    @POST("merchant/query_user_activity_page")
    Observable<Result<UserActivityResponseBean>> queryUserActivityPage(@QueryMap Map<String, String> queryUserActivityPageRequestBean);

    /**
     * 获取商户活动banner列表
     */
    @POST("merchant/query_merchant_banner_list")
    Observable<Result<MerchantBannerResponseBean>> queryMerchantBannerList(@QueryMap Map<String, String> queryMerchantBannerListRequestBean);

    /**
     * 获取商户会员列表
     */
    @POST("merchant/query_user_merchant_list")
    Observable<Result<UserMerchantResponseBean>> queryUserMerchantList(@QueryMap Map<String, String> queryUserMerchantListRequestBean);

    /**
     * 获取商户活动列表
     */
    @POST("merchant/query_merchant_activity_page")
    Observable<Result<MerchantActivityResponseBean>> queryMerchantActivityPage(@QueryMap Map<String, String> queryMerchantActivityPageRequestBean);

    /**
     * 获取用户参与活动信息
     */
    @POST("merchant/get_user_activity_info")
    Observable<Result<UserActivityInfoResponseBean>> getUserActivityInfo(@QueryMap Map<String, String> getUserActivityInfoRequestBean);

    /**
     * 获取新光币活动列表
     */
    @POST("merchant/query_neocoin_activity_list")
    Observable<Result<NeocoinActivityResponseBean>> queryNeocoinActivityList(@QueryMap Map<String, String> queryNeocoinActivityListRequestBean);

    /**
     * 获取新光币活动列表
     */
    @POST("merchant/query_neocoin_activity_page")
    Observable<Result<NeocoinActivityResponseBean>> queryNeocoinActivityPage(@QueryMap Map<String, String> queryNeocoinActivityPageRequestBean);

    /**
     * 获取用户银行卡列表
     */
    @POST("bank/get_user_bank_card_list")
    Observable<Result<List<BankCardResponseBean>>> getUserBankCardList(@QueryMap Map<String, String> getUserBankCardListRequestBean);

    /**
     * 获取上次提现银行卡
     */
    @POST("bank/get_recent_withdraw_bank_card")
    Observable<Result<BankCardResponseBean>> getRecentWithdrawBankCard(@QueryMap Map<String, String> getRecentWithdrawBankCardRequestBean);

    /**
     * 获取上次充值银行卡
     */
    @POST("bank/get_recent_recharge_bank_card")
    Observable<Result<BankCardResponseBean>> getRecentRechargeBankCard(@QueryMap Map<String, String> getRecentRechargeBankCardRequestBean);

    /**
     * 发送绑定银行卡短信验证码
     */
    @POST("bank/send_bind_bank_card_code")
    Observable<Result<BaseResponse>> sendBindBankCardCode(@QueryMap Map<String, String> sendBindBankCardCodeRequestBean);

    /**
     * 绑定银行卡
     */
    @POST("bank/bind_bank_card")
    Observable<Result<BaseResponse>> bindBankCard(@QueryMap Map<String, String> bindBankCardRequestBean);

    /**
     * 解绑银行卡
     */
    @POST("bank/unbind_bank_card")
    Observable<Result<BaseResponse>> unbindBankCard(@QueryMap Map<String, String> unbindBankCardRequestBean);

    /**
     * 获取红包列表
     */
    @POST("packet/query_recent_red_packet_list")
    Observable<Result<RecentRedPacketResponseBean>> queryRecentRedPacketList(@QueryMap Map<String, String> queryRecentRedPacketListRequestBean);

    /**
     * 获取红包限额
     */
    @POST("packet/get_red_packet_limit")
    Observable<Result<RedPacketLimitResponseBean>> getRedPacketLimit(@QueryMap Map<String, String> getRedPacketLimitRequestBean);

    /**
     * 创建红包
     */
    @POST("packet/create_red_packet")
    Observable<Result<RedPacketResponseBean>> createRedPacket(@QueryMap Map<String, String> createRedPacketRequestBean);

    /**
     * 添加红包领取人
     */
    @POST("packet/add_red_packet_receiver")
    Observable<Result<BaseResponse>> addRedPacketReceiver(@QueryMap Map<String, String> addRedPacketReceiverRequestBean);

    /**
     * 查询用户未领取的红包列表
     */
    @POST("packet/query_user_receivable_red_packet_page")
    Observable<Result<RecentRedPacketResponseBean>> queryUserReceivableRedPacketPage(@QueryMap Map<String, String> queryUserReceivableRedPacketPageRequestBean);

    /**
     * 收红包
     */
    @POST("packet/receive_red_packet")
    Observable<Result<BaseResponse>> receiveRedPacket(@QueryMap Map<String, String> receiveRedPacketRequestBean);

    /**
     * 获取红包详细信息
     */
    @POST("packet/get_red_packet_info")
    Observable<Result<RecentRedPacketResponseBean>> getRedPacketInfo(@QueryMap Map<String, String> getRedPacketInfoRequestBean);

    /**
     * 获取红包领取信息
     */
    @POST("packet/query_red_packet_receive_list")
    Observable<Result<RedPacketReceiveResponseBean>> queryRedPacketReceiveList(@QueryMap Map<String, String> queryRedPacketReceiveListRequestBean);

    /**
     * 获取用户红包统计
     */
    @POST("packet/get_user_red_packet_statis")
    Observable<Result<UserRedPacketStatisResponseBean>> getUserRedPacketStatis(@QueryMap Map<String, String> getUserRedPacketStatisRequestBean);

    /**
     * 红包交易明细
     */
    @POST("packet/query_red_packet_record_page")
    Observable<Result<RedPacketRecordResponseBean>> queryRedPacketRecordPage(@QueryMap Map<String, String> queryRedPacketRecordPageRequestBean);

    /**
     * 获取商户发出的红包分页列表
     */
    @POST("packet/query_merchant_red_packet_page")
    Observable<Result<RecentRedPacketResponseBean>> queryMerchantRedPacketPage(@QueryMap Map<String, String> queryMerchantRedPacketPageRequestBean);

    /**
     * 获取商户用户红包列表
     */
    @POST("packet/query_merchant_user_red_packet_page")
    Observable<Result<RecentRedPacketResponseBean>> queryMerchantUserRedPacketPage(@QueryMap Map<String, String> queryMerchantUserRedPacketPageRequestBean);

    /**
     * 获取红包主题列表
     */
    @POST("packet/query_red_packet_theme_list")
    Observable<Result<RedPacketThemeResponseBean>> queryRedPacketThemeList(@QueryMap Map<String, String> queryRedPacketThemeListRequestBean);

    /**
     * 发送重置支付密码验证码
     */
    @POST("pay/send_reset_pay_password_code")
    Observable<Result<BaseResponse>> sendResetPayPasswordCode(@QueryMap Map<String, String> sendResetPayPasswordCodeRequestBean);

    /**
     * 重置支付密码
     */
    @POST("pay/reset_pay_password")
    Observable<Result<BaseResponse>> resetPayPassword(@QueryMap Map<String, String> resetPayPasswordRequestBean);

    /**
     * 创建付款码
     */
    @POST("pay/create_pay_qrcode")
    Observable<Result<PayQrcodeResponseBean>> createPayQrcode(@QueryMap Map<String, String> createPayQrcodeRequestBean);

    /**
     * 创建支付订单
     */
    @POST("pay/create_pay_order")
    Observable<Result<PayOrderResponseBean>> createPayOrder(@QueryMap Map<String, String> createPayOrderRequestBean);

    /**
     * 获取上一次付款方式
     */
    @POST("pay/get_recent_pay_type")
    Observable<Result<RecentPayTypeResponseBean>> getRecentPayType(@QueryMap Map<String, String> getRecentPayTypeRequestBean);

    /**
     * 查询银行卡交易记录
     */
    @POST("pay/query_bank_card_record_page")
    Observable<Result<BankCardRecordResponseBean>> queryBankCardRecordPage(@QueryMap Map<String, String> queryBankCardRecordPageRequestBean);

    /**
     * 查询银行卡交易月统计
     */
    @POST("pay/query_bank_card_statis_list")
    Observable<Result<BalanceStatisResponseBean>> queryBankCardStatisList(@QueryMap Map<String, String> queryBankCardStatisListRequestBean);

    /**
     * 查询账单详情
     */
    @POST("pay/get_user_order_detail")
    Observable<Result<UserOrderDetailResponseBean>> getUserOrderDetail(@QueryMap Map<String, String> getUserOrderDetailRequestBean);

    /**
     * 查询用户账单记录
     */
    @POST("pay/query_user_order_page")
    Observable<Result<UserOrderResponseBean>> queryUserOrderPage(@QueryMap Map<String, String> queryUserOrderPageRequestBean);

    /**
     * 获取用户余额
     */
    @POST("balance/get_user_balance")
    Observable<Result<UserBalanceResponseBean>> getUserBalance(@QueryMap Map<String, String> getUserBalanceRequestBean);

    /**
     * 获取余额交易记录
     */
    @POST("balance/query_balance_record_page")
    Observable<Result<BalanceRecordResponseBean>> queryBalanceRecordPage(@QueryMap Map<String, String> queryBalanceRecordPageRequestBean);

    /**
     * 获取余额交易月统计
     */
    @POST("balance/query_balance_statis_list")
    Observable<Result<BalanceStatisResponseBean>> queryBalanceStatisList(@QueryMap Map<String, String> queryBalanceStatisListRequestBean);

    /**
     * 计算提现手续费
     */
    @POST("balance/get_withdraw_fee")
    Observable<Result<WithdrawFeeResponseBean>> getWithdrawFee(@QueryMap Map<String, String> getWithdrawFeeRequestBean);

    /**
     * 提现
     */
    @POST("balance/create_withdraw_order")
    Observable<Result<WithdrawOrderResponseBean>> createWithdrawOrder(@QueryMap Map<String, String> createWithdrawOrderRequestBean);

    /**
     * 充值
     */
    @POST("balance/create_recharge_order")
    Observable<Result<RechargeOrderResponseBean>> createRechargeOrder(@QueryMap Map<String, String> createRechargeOrderRequestBean);

    /**
     * 获取用户当日可充值信息
     */
    @POST("balance/get_bank_card_rechargeable_info")
    Observable<Result<BankCardRechargeableInfoResponseBean>> getBankCardRechargeableInfo(@QueryMap Map<String, String> getBankCardRechargeableInfoRequestBean);

    /**
     * 查询我的资产
     */
    @POST("balance/get_user_asset_info")
    Observable<Result<UserAssetInfoResponseBean>> getUserAssetInfo(@QueryMap Map<String, String> getUserAssetInfoRequestBean);

    /**
     * 判断手机号是否注册
     */
    @POST("user/verify_register_phone")
    Observable<Result<VerifyRegisterPhoneResponseBean>> verifyRegisterPhone(@QueryMap Map<String, String> verifyRegisterPhoneRequestBean);

    /**
     * 发送注册的短信验证码
     */
    @POST("user/send_register_code")
    Observable<Result<BaseResponse>> sendRegisterCode(@QueryMap Map<String, String> sendRegisterCodeRequestBean);

    /**
     * 注册用户
     */
    @POST("user/register_user")
    Observable<Result<RegisterUserResponseBean>> registerUser(@QueryMap Map<String, String> registerUserRequestBean);

    /**
     * 发送重置登录密码短信验证码
     */
    @POST("user/send_reset_login_password_code")
    Observable<Result<BaseResponse>> sendResetLoginPasswordCode(@QueryMap Map<String, String> sendResetLoginPasswordCodeRequestBean);

    /**
     * 重置登录密码
     */
    @POST("user/reset_login_password")
    Observable<Result<BaseResponse>> resetLoginPassword(@QueryMap Map<String, String> resetLoginPasswordRequestBean);

    /**
     * 登录用户
     */
    @POST("user/login_user")
    Observable<Result<UserInfoResponseBean>> loginUser(@QueryMap Map<String, String> loginUserRequestBean);

    /**
     * 获取用户信息
     */
    @POST("user/get_user_info")
    Observable<Result<UserInfoResponseBean>> getUserInfo(@QueryMap Map<String, String> getUserInfoRequestBean);

    /**
     * 修改用户信息
     */
    @POST("user/modify_user_info")
    Observable<Result<BaseResponse>> modifyUserInfo(@QueryMap Map<String, String> modifyUserInfoRequestBean);

    /**
     * 修改用户信息
     */
    @POST("message/message_overview")
    Observable<Result<List<GetNewsResponseBean>>> getHomeNewsInfo(@QueryMap Map<String, String> homeNewsInfoRequestBean);

    @POST("file/get_security_token")
    Observable<Result<SecurityTokenResponseBean>> getSecurityToken(@Query("type") int type);

    @POST("message/update_read_status_msg")
    Observable<Result<BaseResponse>> updateNewsReadStatus(@QueryMap Map<String, String> updateNewsReadStatusRequestBean);
}
