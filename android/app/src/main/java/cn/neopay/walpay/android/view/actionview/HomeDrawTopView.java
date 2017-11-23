package cn.neopay.walpay.android.view.actionview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.xgjk.common.lib.manager.glide.GlideManager;

import cn.neopay.walpay.android.BuildConfig;
import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.HomeDrawTopViewBinding;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/11/23
 * @describe HomeDrawTopView homeDraw页的上部分view
 */

public class HomeDrawTopView extends FrameLayout {

    private HomeDrawTopViewBinding mBinding;
    private UserInfoResponseBean mUserInfoBean;

    public HomeDrawTopView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public HomeDrawTopView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public HomeDrawTopView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.home_draw_top_view, null, false);
        addView(mBinding.getRoot());
        handleView(context);
    }

    private void handleView(Context context) {

        if (BuildConfig.DEBUG) {
            mBinding.homeAvatarDesTv.setOnClickListener(v -> MainRouter.getSingleton().jumpToEnvironmentSettingActivityPage());
        }
        mBinding.homeDrawLoansLl.setOnClickListener(v -> {
            //todo 员工贷款
        });
        mBinding.homeDrawSeasonsLl.setOnClickListener(v -> {
            //todo 四季严选
        });
        mBinding.homeDrawBigRedPacketLl.setOnClickListener(v -> BusniessUtils.handleCertification(context, mUserInfoBean, () -> RNActivity.jumpToRNPage(context, RNActivity.PageType.BIG_RED_PAGE)));
        mBinding.homeDrawRechargeLl.setOnClickListener(v -> BusniessUtils.handleCertification(context, mUserInfoBean, () -> RNActivity.jumpToRNPage(context, RNActivity.PageType.PHONE_TOPUP_PAGE)));
        mBinding.homeDrawBalanceLl.setOnClickListener(v -> BusniessUtils.handleCertification(context, mUserInfoBean, () -> RNActivity.jumpToRNPage(context, RNActivity.PageType.BALANCE)));
    }

    public UserInfoResponseBean getmUserInfoBean() {
        return mUserInfoBean;
    }

    public void setHomeDrawAvatarClick(OnClickListener homeDrawAvatar) {
        mBinding.homeAvatarIv.setOnClickListener(homeDrawAvatar);
    }

    public void setmUserInfoBean(UserInfoResponseBean mUserInfoBean) {
        this.mUserInfoBean = mUserInfoBean;
        if (mUserInfoBean != null) {
            GlideManager.loadNetCircleImage(mBinding.homeAvatarIv, mUserInfoBean.getAvatarUrl());
            mBinding.homeAvatarDesTv.setText(mUserInfoBean.getNickName());
        }
    }

}
