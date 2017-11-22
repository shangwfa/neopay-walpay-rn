package cn.neopay.walpay.android.commontest;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;

import com.orhanobut.logger.Logger;
import com.tbruyelle.rxpermissions.RxPermissions;
import com.xgjk.common.lib.base.BaseActivity;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.ActivityCommonTestBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
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
            activityParams.setRnPage("home");
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
            testContacts();

        });
    }

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
