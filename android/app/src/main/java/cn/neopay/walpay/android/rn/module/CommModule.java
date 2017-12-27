package cn.neopay.walpay.android.rn.module;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.tbruyelle.rxpermissions.RxPermissions;
import com.xgjk.common.lib.manager.ActivityManager;
import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.HandlerUtils;
import com.xgjk.common.lib.utils.ScreenUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import org.greenrobot.eventbus.EventBus;
import org.json.JSONException;
import org.json.JSONObject;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.environmentmanager.EnvironmentConfigManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.bean.NetCommonBaseUrl;
import cn.neopay.walpay.android.module.bean.NetCommonParamsBean;
import cn.neopay.walpay.android.module.event.CloseRNPageEvent;
import cn.neopay.walpay.android.module.event.LoadingDialogEvent;
import cn.neopay.walpay.android.module.request.ShareRequestBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * Created by shangwf on 2017/9/14.
 */

public class CommModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    public static final String MODULE_NAME = "commModule";
    public static final String EVENT_NAME = "nativeCallRn";
    public static final String EVENT_NAME1 = "getPatchImgs";

    public static final String EVENT_UPDATE_HEAD_IMG = "updateHeadImg";
    public static final String EVENT_SELECT_CONTACTS = "ContactSelected";
    public static final String EVENT_RED_PACKET_DETAIL = "RedPacketDetail";

    /**
     * 构造方法必须实现
     *
     * @param reactContext
     */
    public CommModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    /**
     * 在rn代码里面是需要这个名字来调用该类的方法
     *
     * @return
     */
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * RN调用Native的方法
     *
     * @param phone
     */
    @ReactMethod
    public void rnCallNativeCallPhone(String phone) {
        // 跳转到打电话界面
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_DIAL);
        intent.setData(Uri.parse("tel:" + phone));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 跳转需要添加flag, 否则报错
        mContext.startActivity(intent);
    }

    /**
     * RN调用Native的方法
     *
     * @param packetCode 红包编号
     * @param shareType  分享类型
     */

    @ReactMethod
    public void rnCallNativeCallShare(String packetCode, String shareType) {
        HandlerUtils.runOnUiThread(() -> {
            ShareRequestBean requestBean = new ShareRequestBean();
            requestBean.setShareType(Integer.valueOf(shareType));
            requestBean.setCode(packetCode);
            DialogManager.getSingleton().showShareDialog(getCurrentActivity(), requestBean);
        });
    }

    /**
     * RN调用Native的方法
     */
    @ReactMethod
    public void rnModalContactList() {
        // 跳转到系统联系人界面
        HandlerUtils.runOnUiThread(() -> {
            Activity activity = getCurrentActivity();
            if (null != activity) {
                new RxPermissions(activity)
                        .request(Manifest.permission.READ_CONTACTS)
                        .subscribe(granted -> {
                            if (!granted) {
                                DialogManager.getSingleton().showReadContactsDialog(activity);
                            }
                        });
                BusniessUtils.startContactsNoRepeatList(getCurrentActivity());
            }
        });


    }

    /**
     * Native调用RN
     *
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME, msg);
    }

    /**
     * Callback 方式
     * rn调用Native,并获取返回值
     *
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {

        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        callback.invoke(result);
    }

    /**
     * Promise
     *
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void rnCallNativeFromPromise(String msg, Promise promise) {

        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        promise.resolve(result);
    }

    /**
     * RN调到原生页面
     *
     * @param //跳转协议参数 {page:"",url:"",key:"",value:""}
     */

    @ReactMethod
    public void jumpToNativePage(String pageType, String params) {
        //pageType- normal->正常页面跳转  h5->跳转到5页面
        try {
            JSONObject jsonObject = new JSONObject(params);
            switch (pageType) {
                case "h5":
                    handleH5(jsonObject);
                    break;
                case "normal":
                    handlePage(jsonObject);
                default:
                    break;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void handlePage(JSONObject jsonObject) throws JSONException {
        switch (jsonObject.getString("page")) {
            case "resetLoginPwd"://修改登录密码页面
                MainRouter.getSingleton().jumpToForgotPwdPage("", IWalpayConstants.FORGOTPWD_TYPE_LOGIN);
                break;
            case "resetPayPwd"://修改支付密码页面
                MainRouter.getSingleton().jumpToForgotPwdPage("", IWalpayConstants.FORGOTPWD_TYPE_PAY);
                break;
            default:
                break;
        }
    }

    private void handleH5(JSONObject jsonObject) throws JSONException {

    }

    /**
     * 功能：关闭RN页面容器
     */
    @ReactMethod
    public void closeRNPage() {
        HandlerUtils.runOnUiThread(() -> {
            EventBus.getDefault().post(new CloseRNPageEvent());
        });
    }

    /**
     * 功能：用户退出并且跳转登录页面容器
     */
    @ReactMethod
    public void jumpToLoginPage() {
        HandlerUtils.runOnUiThread(() -> {
            ActivityManager.getInstance().killAllActivity();
            StoreManager.getSingleton().putString(false, IWalpayConstants.ACCESS_TOKEN, "");
            MainRouter.getSingleton().jumpToLoginPage(BusniessUtils.getUserName());
        });
    }


    /**
     * 功能：toast消息
     */
    @ReactMethod
    public void toast(final String msg) {
        HandlerUtils.runOnUiThread(() -> ToastUtils.showLong(msg));
    }

    /**
     * 获取网络请求通用参数
     */
    @ReactMethod
    public void netCommParas(Callback callback) {
        final NetCommonParamsBean paramsBean = new NetCommonParamsBean();
        callback.invoke(new Gson().toJson(paramsBean));
    }

    /**
     * 获取网络请求baseUrl
     */
    @ReactMethod
    public void netCommUrl(Callback callback) {
        final NetCommonBaseUrl paramsBean = new NetCommonBaseUrl();
        paramsBean.setBaseUrl(EnvironmentConfigManager.getSingleton().getCurrentEnvHttpUrl());
        callback.invoke(new Gson().toJson(paramsBean));
    }

    /**
     * 获取用户手机号码
     */
    @ReactMethod
    public void contactCommNumber(Callback callback) {
        String userName = BusniessUtils.getUserName().substring(0, BusniessUtils.getUserName().length());
        callback.invoke(userName);
    }

    @ReactMethod
    public void showCommDialog(String dialogType, Callback callback) {
        HandlerUtils.runOnUiThread(() -> {
            final Context context = mContext.getCurrentActivity();
            switch (dialogType) {
                case "exitApp":

                    break;
                case "updatePersonalAvatar":
                    DialogManager.getSingleton().showPhotoSelectDialog(context);
                    break;
                default:
            }
        });
    }

    /**
     * Native调用RN
     *
     * @param //msg
     */
    public void nativeCallRnUpdateHeadImg(String imgUrl) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_UPDATE_HEAD_IMG, imgUrl);
    }

    /**
     * Native调用RN
     *
     * @param //msg
     */
    public void nativeCallRnSelectContacts(String phone) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_SELECT_CONTACTS, phone);
    }

    /**
     * Native调用RN
     *
     * @param //msg
     */
    public void nativeCallRnRedPacketDetail(String packetCode) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_RED_PACKET_DETAIL, packetCode);
    }

    /**
     * 功能显示加载弹窗
     */
    @ReactMethod
    public void showLoadingDialog() {
        LoadingDialogEvent event = new LoadingDialogEvent();
        event.setShow(true);
        EventBus.getDefault().post(event);
    }

    @ReactMethod
    public void hideLoadingDialog() {
        LoadingDialogEvent event = new LoadingDialogEvent();
        event.setShow(false);
        EventBus.getDefault().post(event);
    }

    @ReactMethod
    public void isHaveBottomNav(Callback callback) {
        callback.invoke(ScreenUtils.hasSoftKeys(mContext.getCurrentActivity()));
    }
}
