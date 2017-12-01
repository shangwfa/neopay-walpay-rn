package cn.neopay.walpay.android.ui;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.facebook.react.ReactInstanceManager;
import com.google.gson.Gson;
import com.gyf.barlibrary.ImmersionBar;
import com.xgjk.common.lib.base.BaseRNActivity;
import com.xgjk.common.lib.utils.PhotoUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.WalpayApp;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.event.CloseRNPageEvent;
import cn.neopay.walpay.android.module.event.LoadingDialogEvent;
import cn.neopay.walpay.android.module.rnParams.TestParams;
import cn.neopay.walpay.android.rn.RNCacheViewManager;
import cn.neopay.walpay.android.utils.BusniessUtils;
import cn.neopay.walpay.android.view.dialog.LoadingDialog;

/**
 * Created by shangwf on 2017/9/12.
 */
@Route(path = IWalpayConstants.TO_RN_PAGE)
public class RNActivity extends BaseRNActivity {

    @Autowired
    RNActivityParams activityParams;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(mReactRootView);
    }

    @Override
    public ReactInstanceManager initReactInstanceManager() {
        return RNCacheViewManager.getReactInstanceManager();
    }

    @Nullable
    public Bundle getLaunchOptions() {
        Bundle bundle = new Bundle();
        initLaunchOptions(bundle, activityParams.getRnPage());
        return bundle;
    }

    private void initLaunchOptions(Bundle bundle, String pageType) {
        TestParams params = new TestParams();
        params.setPage(pageType);
        bundle.putString("params", new Gson().toJson(params));
    }

    @Override
    public String getModuleName() {
        return "neopay_walpay";
    }

    @Override
    public void setStatusBar() {
        ImmersionBar.with(this)
                .statusBarColor(com.xgjk.common.lib.R.color.common_white)
                .fitsSystemWindows(true)
                .statusBarDarkFont(true, 1) //原理：如果当前设备支持状态栏字体变色，会设置状态栏字体为黑色，如果当前设备不支持状态栏字体变色，会使当前状态栏加上透明度，否则不执行透明度
                .init();
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onCloseRNPageEvent(CloseRNPageEvent event) {
        finish();
    }

    private LoadingDialog mLoadingDialog;
    private boolean isShowLoadingDialog;

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onLoadingEvent(LoadingDialogEvent event) {
        if (event.isShow()) {
            if (null == mLoadingDialog) {
                mLoadingDialog = new LoadingDialog(this, R.style.LoadingDialog);
            }
            if (isShowLoadingDialog) {
                return;
            } else {
                isShowLoadingDialog = true;
                mLoadingDialog.show();
            }
        } else {
            if (null != mLoadingDialog && isShowLoadingDialog) {
                mLoadingDialog.dismiss();
            }
        }


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case IWalpayConstants.SELECT_SYSTEM_CONTACTS:
                contactActivityResult(resultCode, data);
                break;
            default:
                photoActivityResult(requestCode, resultCode, data);
                break;
        }

    }

    private void contactActivityResult(int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            ArrayList<String> contactsData = BusniessUtils.contactsNoRepeatListResult(RNActivity.this, data);
            if (null != contactsData && contactsData.size() >= 2) {
                WalpayApp.getRnPackage().mModule.nativeCallRnSelectContacts(contactsData.get(1));
            }
        }
    }


    private void photoActivityResult(int requestCode, int resultCode, Intent data) {
        PhotoUtils.onActivityResult(this, requestCode, resultCode, data, R.color.colorPrimary, R.color.colorPrimaryDark, (Uri resultUri) -> {
            ApiManager.getSingleton().uploadSigleImge(this, resultUri, new ApiManager.UploadSingleImgCallback() {
                @Override
                public void success(String imgUrl) {
                    WalpayApp.getRnPackage().mModule.nativeCallRnUpdateHeadImg(imgUrl);
                }

                @Override
                public void failed() {
                    ToastUtils.show("图片上传失败");
                }
            });
        });
    }


    public interface PageType {
        String SETTING_PAGE = "setting";
        String MY_ORDER_PAGE = "myOrder";
        String PERSONAL_INFO_PAGE = "personalInfo";
        String ACTIVITY_LIST_PAGE = "activityList";
        String ACTIVITY_RED_LIST_PAGE = "redList";
        String PAY_SCAN_QR_CODE = "qrCodeScan";
        String MY_LOTTER_RECORD = "myLotteryRecord";
        String MY_ASSET = "myAsset";
        String MY_BANK = "bankCardList";
        String CARD_PACK_PAGE = "cardPack";
        String RP_DETAIL_PAGE = "rpDetail";
        String BIG_RED_PAGE = "bigRedPacket";
        String BIG_RED_PACKET_SIMPLE_PAGE = "bigRedPacketSimple";
        String PHONE_TOPUP_PAGE = "phoneTopUp";
        String TOPUP_MSG_LIST_PAGE = "topupMsgList";
        String PAY_MESSAGE_PAGE = "payMessage";
        String PAY_CODE_PAGE = "payCode";
        String BALANCE = "myBalance";
        String BIND_BANK_CARD = "bindBankCard";
    }

    public static void jumpToRNPage(Context context, String pageType) {
        RNActivityParams activityParams = new RNActivityParams();
        activityParams.setRnPage(pageType);
        MainRouter.getSingleton().jumpToRNPage(context, activityParams);
    }
}
