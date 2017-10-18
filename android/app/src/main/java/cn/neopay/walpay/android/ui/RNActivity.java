package cn.neopay.walpay.android.ui;

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

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.WalpayApp;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.event.CloseRNPageEvent;
import cn.neopay.walpay.android.module.rnParams.TestParams;
import cn.neopay.walpay.android.rn.RNCacheViewManager;

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
        switch (activityParams.getRnPage()) {
            case "splash":
                TestParams testParams = new TestParams();
                testParams.setPage("splash");
                testParams.setValue("splash");
                bundle.putString("params", new Gson().toJson(testParams));
                break;

            case "home":
                TestParams homeParams = new TestParams();
                homeParams.setPage("home");
                homeParams.setValue("home");
                bundle.putString("params", new Gson().toJson(homeParams));
                break;
        }
        return bundle;
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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
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
        super.onActivityResult(requestCode, resultCode, data);
    }
}
