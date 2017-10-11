package cn.neopay.walpay.android.ui.paycode;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.manager.glide.GlideManager;
import com.xgjk.common.lib.manager.storage.StoreManager;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityPayCodeLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.manager.dialogmanager.DialogManager;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.request.GetRecentPayTypeRequestBean;
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
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {

        mPageBinding.commonHeader.setHeaderLeftImgAndRighImg("向商家付钱", R.mipmap.img_right_arrows, v -> {
            DialogManager.getSingleton().showScanBottomDialog(this, () -> MainRouter.getSingleton().jumpToExplainPage("向商家付钱"));
        });

        UserInfoResponseBean userInfoBean = StoreManager.getSingleton().get(true, IWalpayConstants.USER_INFO, UserInfoResponseBean.class);
        if (userInfoBean != null) {
            GlideManager.loadNetImage(mViewBinding.userAvatarIv, userInfoBean.getAvatarUrl());
        }
        //TODO 去除掉本地图片
        GlideManager.loadLocalResCircleImage(mViewBinding.userAvatarIv, R.mipmap.img_home_big_red_bag);

        ApiManager.getSingleton().getRecentPayType(new GetRecentPayTypeRequestBean(), new BaseSubscriber(this, o -> {
            setBankNickName((RecentPayTypeResponseBean) o);
        }));

        mViewBinding.payModeRl.setOnClickListener(v -> {
            //TODO 选择银行卡
        });
    }

    private void setBankNickName(RecentPayTypeResponseBean payTypeBean) {
        if (payTypeBean == null) {
            return;
        }
        String bankNickName = BusniessUtils.handleBankNickName(payTypeBean.getBankName(), payTypeBean.getBankCardNo());
        mViewBinding.payModeBackNameTv.setText(bankNickName);
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }
}
