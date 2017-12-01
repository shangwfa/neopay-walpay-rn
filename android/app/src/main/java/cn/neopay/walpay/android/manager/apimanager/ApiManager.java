package cn.neopay.walpay.android.manager.apimanager;

import android.app.Activity;
import android.net.Uri;

import com.alibaba.sdk.android.oss.OSSClient;
import com.xgjk.common.lib.utils.FileUtils;
import com.xgjk.common.lib.utils.FormatUtils;
import com.xgjk.common.lib.utils.ReflectUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import cn.neopay.walpay.android.http.Api;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.ossmanager.OssManager;
import cn.neopay.walpay.android.module.request.AddFeedbackRequestBean;
import cn.neopay.walpay.android.module.request.AddRedPacketReceiverRequestBean;
import cn.neopay.walpay.android.module.request.AddShareRequestBean;
import cn.neopay.walpay.android.module.request.BaseRequest;
import cn.neopay.walpay.android.module.request.BindBankCardRequestBean;
import cn.neopay.walpay.android.module.request.CheckAppVersionRequestBean;
import cn.neopay.walpay.android.module.request.CheckInRequestBean;
import cn.neopay.walpay.android.module.request.CreatePayOrderRequestBean;
import cn.neopay.walpay.android.module.request.CreatePayQrcodeRequestBean;
import cn.neopay.walpay.android.module.request.CreatePhoneRechargeOrderRequestBean;
import cn.neopay.walpay.android.module.request.CreateRechargeOrderRequestBean;
import cn.neopay.walpay.android.module.request.CreateRedPacketRequestBean;
import cn.neopay.walpay.android.module.request.CreateWithdrawOrderRequestBean;
import cn.neopay.walpay.android.module.request.GetBankCardRechargeableInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetCheckInInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetMerchantInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetPlatformActivityStatisRequestBean;
import cn.neopay.walpay.android.module.request.GetRecentPayTypeRequestBean;
import cn.neopay.walpay.android.module.request.GetRecentRechargeBankCardRequestBean;
import cn.neopay.walpay.android.module.request.GetRecentWithdrawBankCardRequestBean;
import cn.neopay.walpay.android.module.request.GetRedPacketInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetRedPacketLimitRequestBean;
import cn.neopay.walpay.android.module.request.GetUserActivityInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetUserActivityStatisRequestBean;
import cn.neopay.walpay.android.module.request.GetUserAssetInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetUserBalanceRequestBean;
import cn.neopay.walpay.android.module.request.GetUserBankCardListRequestBean;
import cn.neopay.walpay.android.module.request.GetUserInfoRequestBean;
import cn.neopay.walpay.android.module.request.GetUserOrderDetailRequestBean;
import cn.neopay.walpay.android.module.request.GetUserRedPacketStatisRequestBean;
import cn.neopay.walpay.android.module.request.GetWithdrawFeeRequestBean;
import cn.neopay.walpay.android.module.request.LoginRequestBean;
import cn.neopay.walpay.android.module.request.LoginUserRequestBean;
import cn.neopay.walpay.android.module.request.ModifyUserInfoRequestBean;
import cn.neopay.walpay.android.module.request.QueryBalanceRecordPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryBalanceStatisListRequestBean;
import cn.neopay.walpay.android.module.request.QueryBankCardRecordPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryBankCardStatisListRequestBean;
import cn.neopay.walpay.android.module.request.QueryBannerListRequestBean;
import cn.neopay.walpay.android.module.request.QueryCheckInPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryMerchantActivityPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryMerchantBannerListRequestBean;
import cn.neopay.walpay.android.module.request.QueryMerchantRedPacketPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryMerchantUserRedPacketPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryNeocoinActivityListRequestBean;
import cn.neopay.walpay.android.module.request.QueryNeocoinActivityPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryPhoneRechargePageRequestBean;
import cn.neopay.walpay.android.module.request.QueryPhoneRechargeProductListRequestBean;
import cn.neopay.walpay.android.module.request.QueryRecentRedPacketListRequestBean;
import cn.neopay.walpay.android.module.request.QueryRedPacketReceiveListRequestBean;
import cn.neopay.walpay.android.module.request.QueryRedPacketRecordPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryRedPacketThemeListRequestBean;
import cn.neopay.walpay.android.module.request.QueryUserActivityPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryUserMerchantListRequestBean;
import cn.neopay.walpay.android.module.request.QueryUserOrderPageRequestBean;
import cn.neopay.walpay.android.module.request.QueryUserReceivableRedPacketPageRequestBean;
import cn.neopay.walpay.android.module.request.ReceiveRedPacketRequestBean;
import cn.neopay.walpay.android.module.request.RegisterUserRequestBean;
import cn.neopay.walpay.android.module.request.ResetLoginPasswordRequestBean;
import cn.neopay.walpay.android.module.request.ResetPayPasswordRequestBean;
import cn.neopay.walpay.android.module.request.SendBindBankCardCodeRequestBean;
import cn.neopay.walpay.android.module.request.SendRegisterCodeRequestBean;
import cn.neopay.walpay.android.module.request.SendResetLoginPasswordCodeRequestBean;
import cn.neopay.walpay.android.module.request.SendResetPayPasswordCodeRequestBean;
import cn.neopay.walpay.android.module.request.UnbindBankCardRequestBean;
import cn.neopay.walpay.android.module.request.VerifyRegisterPhoneRequestBean;
import cn.neopay.walpay.android.module.response.SecurityTokenResponseBean;
import cn.neopay.walpay.android.utils.RxUtils;

/**
 * @author carlos.guo
 * @date 2017/9/26
 * @describe api 管理器 避免代码冗余
 */

public class ApiManager {

    private static ApiManager singleton;

    private ApiManager() {
    }

    public static ApiManager getSingleton() {
        if (singleton == null) {
            synchronized (ApiManager.class) {
                if (singleton == null) {
                    singleton = new ApiManager();
                }
            }
        }
        return singleton;
    }


    public void login(LoginRequestBean loginRequestBean, BaseSubscriber subscriber) {
        Map map = ReflectUtils.convertObjToMap(loginRequestBean);
        Api.getInstance().getApiService()
                .login(map)
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);

    }

    /**
     * 获取手机充值产品列表
     */
    public void queryPhoneRechargeProductList(QueryPhoneRechargeProductListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryPhoneRechargeProductList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 创建手机充值订单
     */
    public void createPhoneRechargeOrder(CreatePhoneRechargeOrderRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createPhoneRechargeOrder(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取充值记录列表
     */
    public void queryPhoneRechargePage(QueryPhoneRechargePageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryPhoneRechargePage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 添加分享记录
     */
    public void addShare(AddShareRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .addShare(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 添加意见反馈
     */
    public void addFeedback(AddFeedbackRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .addFeedback(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 检查应用新版本
     */
    public void checkAppVersion(CheckAppVersionRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .checkAppVersion(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 签到
     */
    public void checkIn(CheckInRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .checkIn(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取签到信息
     */
    public void getCheckInInfo(GetCheckInInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getCheckInInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取签到列表
     */
    public void queryCheckInPage(QueryCheckInPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryCheckInPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户信息
     */
    public void getMerchantInfo(GetMerchantInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getMerchantInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取首页banner列表
     */
    public void queryBannerList(QueryBannerListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryBannerList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取我的中奖统计
     */
    public void getUserActivityStatis(GetUserActivityStatisRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserActivityStatis(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取平台发布活动统计
     */
    public void getPlatformActivityStatis(GetPlatformActivityStatisRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getPlatformActivityStatis(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取我参与的活动列表
     */
    public void queryUserActivityPage(QueryUserActivityPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryUserActivityPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户活动banner列表
     */
    public void queryMerchantBannerList(QueryMerchantBannerListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryMerchantBannerList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户会员列表
     */
    public void queryUserMerchantList(QueryUserMerchantListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryUserMerchantList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户活动列表
     */
    public void queryMerchantActivityPage(QueryMerchantActivityPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryMerchantActivityPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户参与活动信息
     */
    public void getUserActivityInfo(GetUserActivityInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserActivityInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取新光币活动列表
     */
    public void queryNeocoinActivityList(QueryNeocoinActivityListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryNeocoinActivityList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取新光币活动列表
     */
    public void queryNeocoinActivityPage(QueryNeocoinActivityPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryNeocoinActivityPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户银行卡列表
     */
    public void getUserBankCardList(GetUserBankCardListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserBankCardList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取上次提现银行卡
     */
    public void getRecentWithdrawBankCard(GetRecentWithdrawBankCardRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getRecentWithdrawBankCard(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取上次充值银行卡
     */
    public void getRecentRechargeBankCard(GetRecentRechargeBankCardRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getRecentRechargeBankCard(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 发送绑定银行卡短信验证码
     */
    public void sendBindBankCardCode(SendBindBankCardCodeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .sendBindBankCardCode(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 绑定银行卡
     */
    public void bindBankCard(BindBankCardRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .bindBankCard(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 解绑银行卡
     */
    public void unbindBankCard(UnbindBankCardRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .unbindBankCard(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取红包列表
     */
    public void queryRecentRedPacketList(QueryRecentRedPacketListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryRecentRedPacketList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取红包限额
     */
    public void getRedPacketLimit(GetRedPacketLimitRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getRedPacketLimit(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 创建红包
     */
    public void createRedPacket(CreateRedPacketRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createRedPacket(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 添加红包领取人
     */
    public void addRedPacketReceiver(AddRedPacketReceiverRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .addRedPacketReceiver(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询用户未领取的红包列表
     */
    public void queryUserReceivableRedPacketPage(QueryUserReceivableRedPacketPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryUserReceivableRedPacketPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 收红包
     */
    public void receiveRedPacket(ReceiveRedPacketRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .receiveRedPacket(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取红包详细信息
     */
    public void getRedPacketInfo(GetRedPacketInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getRedPacketInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取红包领取信息
     */
    public void queryRedPacketReceiveList(QueryRedPacketReceiveListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryRedPacketReceiveList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户红包统计
     */
    public void getUserRedPacketStatis(GetUserRedPacketStatisRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserRedPacketStatis(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 红包交易明细
     */
    public void queryRedPacketRecordPage(QueryRedPacketRecordPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryRedPacketRecordPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户发出的红包分页列表
     */
    public void queryMerchantRedPacketPage(QueryMerchantRedPacketPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryMerchantRedPacketPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取商户用户红包列表
     */
    public void queryMerchantUserRedPacketPage(QueryMerchantUserRedPacketPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryMerchantUserRedPacketPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取红包主题列表
     */
    public void queryRedPacketThemeList(QueryRedPacketThemeListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryRedPacketThemeList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 发送重置支付密码验证码
     */
    public void sendResetPayPasswordCode(SendResetPayPasswordCodeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .sendResetPayPasswordCode(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 重置支付密码
     */
    public void resetPayPassword(ResetPayPasswordRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .resetPayPassword(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 创建付款码
     */
    public void createPayQrcode(CreatePayQrcodeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createPayQrcode(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 创建支付订单
     */
    public void createPayOrder(CreatePayOrderRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createPayOrder(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取上一次付款方式
     */
    public void getRecentPayType(GetRecentPayTypeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getRecentPayType(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询银行卡交易记录
     */
    public void queryBankCardRecordPage(QueryBankCardRecordPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryBankCardRecordPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询银行卡交易月统计
     */
    public void queryBankCardStatisList(QueryBankCardStatisListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryBankCardStatisList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询账单详情
     */
    public void getUserOrderDetail(GetUserOrderDetailRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserOrderDetail(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询用户账单记录
     */
    public void queryUserOrderPage(QueryUserOrderPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryUserOrderPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户余额
     */
    public void getUserBalance(GetUserBalanceRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserBalance(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取余额交易记录
     */
    public void queryBalanceRecordPage(QueryBalanceRecordPageRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryBalanceRecordPage(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取余额交易月统计
     */
    public void queryBalanceStatisList(QueryBalanceStatisListRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .queryBalanceStatisList(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 计算提现手续费
     */
    public void getWithdrawFee(GetWithdrawFeeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getWithdrawFee(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 提现
     */
    public void createWithdrawOrder(CreateWithdrawOrderRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createWithdrawOrder(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 充值
     */
    public void createRechargeOrder(CreateRechargeOrderRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .createRechargeOrder(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户当日可充值信息
     */
    public void getBankCardRechargeableInfo(GetBankCardRechargeableInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getBankCardRechargeableInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 查询我的资产
     */
    public void getUserAssetInfo(GetUserAssetInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserAssetInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 判断手机号是否注册
     */
    public void verifyRegisterPhone(VerifyRegisterPhoneRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .verifyRegisterPhone(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 发送注册的短信验证码
     */
    public void sendRegisterCode(SendRegisterCodeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .sendRegisterCode(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 注册用户
     */
    public void registerUser(RegisterUserRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .registerUser(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 发送重置登录密码短信验证码
     */
    public void sendResetLoginPasswordCode(SendResetLoginPasswordCodeRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .sendResetLoginPasswordCode(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 重置登录密码
     */
    public void resetLoginPassword(ResetLoginPasswordRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .resetLoginPassword(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 登录用户
     */
    public void loginUser(LoginUserRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .loginUser(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取用户信息
     */
    public void getUserInfo(GetUserInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getUserInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 修改用户信息
     */
    public void modifyUserInfo(ModifyUserInfoRequestBean requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .modifyUserInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 获取首页消息
     */
    public void getHomeNewsInfo(BaseRequest requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .getHomeNewsInfo(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }

    /**
     * 更新首页消息的状态
     */
    public void updateNewsReadStatus(BaseRequest requestBean, BaseSubscriber subscriber) {
        Api.getInstance().getApiService()
                .updateNewsReadStatus(ReflectUtils.convertObjToMap(requestBean))
                .compose(RxUtils.rxNet())
                .subscribe(subscriber);
    }


    /**
     * 上传单张图片
     */
    public static void uploadSigleImge(Activity activity, Uri imgUri, UploadSingleImgCallback callback) {

        Api.getInstance().getApiService().getSecurityToken(2)//获取上传图片的Token
                .compose(RxUtils.rxNet())
                .subscribe(new BaseSubscriber<SecurityTokenResponseBean>(activity, tokenDTO -> OSSUploadImg(tokenDTO, activity, imgUri, callback)) {
                    @Override
                    public boolean isShowLoading() {
                        return false;
                    }

                    @Override
                    public void onError(Throwable e) {
                        super.onError(e);
                        callback.failed();
                    }
                });
    }

    private static void OSSUploadImg(SecurityTokenResponseBean tokenDTO, Activity activity, Uri imgUri, UploadSingleImgCallback callback) {
        OSSClient mOSS = OssManager.initOss(tokenDTO.getAccessKeyId(), tokenDTO.getAccessKeySecret(), tokenDTO.getSecurityToken(), tokenDTO.getEndpoint());
        final Map<String, String> uploadMap = new HashMap<>();
        final File file = FileUtils.getFileFromUri(activity, imgUri);
        String uuidFileName = FileUtils.getUUID() + FileUtils.getPrefixName(file.getAbsolutePath());
        OssManager.asyncPutObjectFromLocalFile(mOSS, tokenDTO.getBucket(), tokenDTO.getDirectory() + uuidFileName, file.getAbsolutePath(), new OssManager.UploadCallback() {
            @Override
            public void onSucess() {
                final String imgUrl = FormatUtils.uploadOssImgUrl(tokenDTO.getFileTemplateUrl(), tokenDTO.getBucket(), tokenDTO.getDirectory(), uuidFileName);
                callback.success(imgUrl);
            }

            @Override
            public void onFailure() {
                ToastUtils.show("上传失败");
                callback.failed();
            }
        });
    }

    public interface UploadSingleImgCallback {
        void success(String imgUrl);

        void failed();
    }
}
