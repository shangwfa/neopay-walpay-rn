package cn.neopay.walpay.android.ui.fragment.minefragment;

import android.support.annotation.NonNull;
import android.support.v7.widget.LinearLayoutManager;
import android.view.View;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;

import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineDrawTextImgSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.MineDrawUserInforSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentMineLayoutBinding;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.event.MineEventBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.MineTextImgItemBean;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe MineDrawFragment 抽屉--我的页面
 */

public class MineDrawFragment extends BaseFragment<MineFragmentPresenter, FragmentMineLayoutBinding> implements MineFragmentContract.IView {

    private SlimAdapter mMineSlimAdapter;
    private ArrayList<Object> mData;

    @Override
    public int getLayoutId() {
        return R.layout.fragment_mine_layout;
    }

    @Override
    public void initView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
        mData = new ArrayList<>();
        mMineSlimAdapter = SlimAdapter.create()
                .register(R.layout.common_draw_user_info_view_layout, new MineDrawUserInforSlimInjector())
                .register(R.layout.common_draw_line_item_layout, new MineLineSlimInjector())
                .register(R.layout.common_draw_text_img_item_layout, new MineDrawTextImgSlimInjector());

        LinearLayoutManager layoutManager = new LinearLayoutManager(mContext);
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mViewBinding.mineRecyclerView.setLayoutManager(layoutManager);
        mViewBinding.mineRecyclerView.setAdapter(mMineSlimAdapter);
        handleInitView();
        mPresenter.getUserInfoData();
    }

    private void handleInitView() {
        mData.clear();
        mData.add(new UserInfoResponseBean());
        setTopMineItemData(mData);
        setNextItemData(mData);
        mMineSlimAdapter.updateData(mData);
    }


    @Override
    public void setUserInfoData(UserInfoResponseBean userInfoResponseBean) {
        ArrayList<Object> data = getMineItemData(userInfoResponseBean);
        mMineSlimAdapter.updateData(data);
    }

    @NonNull
    private ArrayList<Object> getMineItemData(UserInfoResponseBean userInfoResponseBean) {
        if (null != userInfoResponseBean) {
            mData.remove(0);
            mData.add(0, userInfoResponseBean);
        }
        return mData;
    }

    private void setNextItemData(ArrayList<Object> data) {

        MineTextImgItemBean mAbout = new MineTextImgItemBean();
        mAbout.setItemImgId(R.mipmap.img_mine_draw_about);
        mAbout.setItemName("关于我们");
        mAbout.setOnClickListener(v -> {

        });
        data.add(mAbout);
        mData.add(new CommonLineItemBean());
        MineTextImgItemBean mSetting = new MineTextImgItemBean();
        mSetting.setItemImgId(R.mipmap.img_mine_draw_settings);
        mSetting.setItemName("设置");
        mSetting.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setRnPage(RNActivity.PageType.SETTING_PAGE);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
        data.add(mSetting);
    }

    private void setTopMineItemData(ArrayList<Object> data) {
        MineTextImgItemBean mMyBill = new MineTextImgItemBean();
        mMyBill.setItemImgId(R.mipmap.img_mine_draw_bill);
        mMyBill.setItemName("我的账单");
        mMyBill.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setRnPage(RNActivity.PageType.MY_ORDER_PAGE);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
        data.add(mMyBill);
        mData.add(new CommonLineItemBean());
        MineTextImgItemBean mAsset = new MineTextImgItemBean();
        mAsset.setItemImgId(R.mipmap.img_mine_draw_money);
        mAsset.setItemName("我的资产");
        mAsset.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setRnPage(RNActivity.PageType.MY_ASSET);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
        data.add(mAsset);
        mData.add(new CommonLineItemBean());
        MineTextImgItemBean mMyBank = new MineTextImgItemBean();
        mMyBank.setItemImgId(R.mipmap.img_mine_draw_bank_card);
        mMyBank.setItemName("我的银行卡");
        mMyBank.setOnClickListener(v -> {
            RNActivityParams activityParams = new RNActivityParams();
            activityParams.setRnPage(RNActivity.PageType.MY_BANK);
            MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
        });
        data.add(mMyBank);
        mData.add(new CommonLineItemBean());
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void selectCurrentPageCallBack(MineEventBean mineEventBean) {
        mPresenter.getUserInfoData();
    }
}
