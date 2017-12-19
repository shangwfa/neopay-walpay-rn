package cn.neopay.walpay.android.commontest;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;

import com.orhanobut.logger.Logger;
import com.tbruyelle.rxpermissions.RxPermissions;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.utils.ToastUtils;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.ActivityCommonTestBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.APPInitializationManager;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.request.LoginRequestBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

public class CommonTestActivity extends BaseActivity<CommonTestPresenter, ActivityCommonTestBinding> implements CommonTestContract.IView {


    @Override
    public int getLayoutId() {
        return R.layout.activity_common_test;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        verifyConfigs();
        jumpToRNTest();
    }

    private void jumpToRNTest() {
        mViewBinding.toRnBtn.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setPage("home");
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }

    private void verifyConfigs() {
        verifyHttp();
    }

    private void verifyHttp() {
        mViewBinding.tvCommonTest.setOnClickListener(v -> {
//            testLogin();
//            testContacts();
            testShare();
        });
    }

    private void testShare() {
        boolean install = APPInitializationManager.umShareAPI.isInstall(this, SHARE_MEDIA.WEIXIN);
        if (!install) {
            ToastUtils.show("未安装客户端");
            return;
        }
        new ShareAction(CommonTestActivity.this)
                .setPlatform(SHARE_MEDIA.WEIXIN_CIRCLE)//传入平台
                .withText("hello")//分享内容
                .setCallback(umShareListener)//回调监听器
                .share();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        ToastUtils.show(requestCode + "");
    }

    private UMShareListener umShareListener = new UMShareListener() {
        /**
         * @descrption 分享开始的回调
         * @param platform 平台类型
         */
        @Override
        public void onStart(SHARE_MEDIA platform) {

        }

        /**
         * @descrption 分享成功的回调
         * @param platform 平台类型
         */
        @Override
        public void onResult(SHARE_MEDIA platform) {
            ToastUtils.show("成功了");
        }

        /**
         * @descrption 分享失败的回调
         * @param platform 平台类型
         * @param t 错误原因
         */
        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            ToastUtils.show("失败" + t.getMessage());
        }

        /**
         * @descrption 分享取消的回调
         * @param platform 平台类型
         */
        @Override
        public void onCancel(SHARE_MEDIA platform) {
            ToastUtils.show("取消了");
        }
    };

    @SuppressLint("RestrictedApi")
    private void testContacts() {
        new RxPermissions(this)
                .request(Manifest.permission.READ_CONTACTS)
                .subscribe(granted -> {
                    if (!granted) {
                        DialogManager.getSingleton().showReadContactsDialog(this);
                    }
                });
        BusniessUtils.startContactsNoRepeatList(this);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ArrayList<String> list = BusniessUtils.contactsNoRepeatListResult(mContext, data);
    }


    private void testLogin() {
        LoginRequestBean loginRequestBean = new LoginRequestBean("15088726554", "abc123456");
        ApiManager.getSingleton().login(loginRequestBean,
                new BaseSubscriber(this, loginResponseBean ->
                        Logger.d(loginResponseBean.toString())
                ));
    }
}
