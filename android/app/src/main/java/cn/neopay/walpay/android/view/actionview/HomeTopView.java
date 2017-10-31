package cn.neopay.walpay.android.view.actionview;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.tbruyelle.rxpermissions.RxPermissions;

import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.HomeTopViewBinding;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe HomeTopView home页的上部分view
 */

public class HomeTopView extends FrameLayout {

    private HomeTopViewBinding mBinding;
    private UserInfoResponseBean mUserInfoBean;

    public HomeTopView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public HomeTopView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public HomeTopView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_top_view, null, false);
        addView(mBinding.getRoot());
        handleView(context);
    }

    private void handleView(Context context) {

        if (BuildConfig.DEBUG) {
            mBinding.walpayIconIv.setOnClickListener(v -> MainRouter.getSingleton().jumpToEnvironmentSettingActivityPage());
        }

        mBinding.homeSignIv.setOnClickListener(v -> MainRouter.getSingleton().jumpToSignInWebPage());

        mBinding.homeScanLl.setOnClickListener(v -> new RxPermissions((Activity) getContext())
                .request(Manifest.permission.CAMERA)
                .subscribe(granted -> {
                    if (!granted) {
                        DialogManager.getSingleton().showCarmerTipDialog(getContext());
                    }else {
                        RNActivityParams activityParams = new RNActivityParams();
                        activityParams.setRnPage(RNActivity.PageType.PAY_SCAN_QR_CODE);
                        MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
                    }
                }));

        mBinding.homePayCodeLl.setOnClickListener(v -> RNActivity.jumpToRNPage(context, RNActivity.PageType.PAY_CODE_PAGE));

        mBinding.homeBalanceLl.setOnClickListener(v -> BusniessUtils.handleCertification(context, mUserInfoBean, () -> {
            //TODO 跳转余额页面
        }));
    }

    public UserInfoResponseBean getmUserInfoBean() {
        return mUserInfoBean;
    }

    public void setmUserInfoBean(UserInfoResponseBean mUserInfoBean) {
        this.mUserInfoBean = mUserInfoBean;
    }

}
