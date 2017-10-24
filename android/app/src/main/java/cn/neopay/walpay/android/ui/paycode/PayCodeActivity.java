package cn.neopay.walpay.android.ui.paycode;

import android.text.TextUtils;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.manager.glide.GlideManager;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityPayCodeLayoutBinding;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.response.BankCardResponseBean;
import cn.neopay.walpay.android.module.response.RecentPayTypeResponseBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe PayCodeActivity 付款码 页面
 */

@Route(path = IWalpayConstants.TO_PAYCODE_PAGE)
public class PayCodeActivity extends BaseActivity<PayCodePresenter, ActivityPayCodeLayoutBinding> implements PayCodeContract.IView {
    @Override
    public int getLayoutId() {
        return R.layout.activity_pay_code_layout;
    }

    @Override
    public void initView() {
        handleHeaderView();
        mViewBinding.commonSelectLl.payModeTv.setText("付款方式");
        mViewBinding.commonSelectLl.payModeIconIv.setBackgroundResource(R.mipmap.img_right_arrow);
        mPresenter.getUserInfo();
        mPresenter.getRecentPayType();
        mViewBinding.commonSelectLl.payModeRl.setOnClickListener(v -> DialogManager.getSingleton().showSelectBankDialog(this));
    }

    private void handleHeaderView() {
        mPageBinding.commonHeader.setHeaderLeftImgAndRighImg("向商家付钱", R.mipmap.img_right_arrows, v -> {
            DialogManager.getSingleton().showScanBottomDialog(this, () -> MainRouter.getSingleton().jumpToExplainPage("向商家付钱"));
        });
    }

    @Override
    public void setBankNickName(RecentPayTypeResponseBean payTypeBean) {
        if (null == payTypeBean) {
            return;
        }
        String bankNickName = BusniessUtils.handleBankNickName(payTypeBean.getBankName(), payTypeBean.getBankCardNo());
        mViewBinding.commonSelectLl.payModeBackNameTv.setText(bankNickName);
    }

    @Override
    public void setUserInfo(UserInfoResponseBean userInfoBean) {
        if (null == userInfoBean || TextUtils.isEmpty(userInfoBean.getAvatarUrl())) {
            GlideManager.loadLocalResCircleImage(mViewBinding.userAvatarIv, R.mipmap.img_default_photo);
        } else {
            GlideManager.loadNetImage(mViewBinding.userAvatarIv, userInfoBean.getAvatarUrl());
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void getSelectPayStyleCallBack(BankCardResponseBean bankCardBean) {
        if (null == bankCardBean) {
            return;
        }
        String bankNickName;
        if ("余额".equals(bankCardBean.getBankName())) {
            bankNickName = BusniessUtils.handleBalanceNickName(bankCardBean.getBankName(), bankCardBean.getBankCardNo());
        } else {
            bankNickName = BusniessUtils.handleBankNickName(bankCardBean.getBankName(), bankCardBean.getBankCardNo());
        }
        mViewBinding.commonSelectLl.payModeBackNameTv.setText(bankNickName);
    }

}
