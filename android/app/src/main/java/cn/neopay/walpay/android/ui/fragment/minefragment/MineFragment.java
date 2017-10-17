package cn.neopay.walpay.android.ui.fragment.minefragment;

import android.support.annotation.NonNull;
import android.support.v7.widget.LinearLayoutManager;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseFragment;

import java.util.ArrayList;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.MineLineSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.MineTextImgSlimInjector;
import cn.neopay.walpay.android.adapter.sliminjector.MineUserInforSlimInjector;
import cn.neopay.walpay.android.databinding.FragmentMineLayoutBinding;
import cn.neopay.walpay.android.module.sliminjector.MineTextImgItemBean;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;

/**
 * @author carlos.guo
 * @date 2017/9/27
 * @describe
 */

public class MineFragment extends BaseFragment<MineFragmentPresenter, FragmentMineLayoutBinding> implements MineFragmentContract.IView {

    private SlimAdapter mMineSlimAdapter;

    @Override
    public int getLayoutId() {
        return R.layout.fragment_mine_layout;
    }

    @Override
    public void initView() {
        mMineSlimAdapter = SlimAdapter.create()
                .register(R.layout.common_user_info_view_layout, new MineUserInforSlimInjector())
                .register(R.layout.common_line_item_layout, new MineLineSlimInjector())
                .register(R.layout.common_text_img_item_shape_bg_layout, new MineTextImgSlimInjector());

        LinearLayoutManager layoutManager = new LinearLayoutManager(mContext);
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mViewBinding.mineRecyclerView.setLayoutManager(layoutManager);
        mViewBinding.mineRecyclerView.setAdapter(mMineSlimAdapter);
        mPresenter.getUserInfoData();
    }


    @Override
    public void setUserInfoData(UserInfoResponseBean userInfoResponseBean) {
        ArrayList<Object> data = getMineItemData(userInfoResponseBean);
        mMineSlimAdapter.updateData(data);
    }

    @NonNull
    private ArrayList<Object> getMineItemData(UserInfoResponseBean userInfoResponseBean) {
        ArrayList<Object> data = new ArrayList<>();
        data.add(userInfoResponseBean);
        setTopMineItemData(data);
        data.add(new CommonLineItemBean());
        setNextItemData(data);
        data.add(new CommonLineItemBean());
        return data;
    }

    private void setNextItemData(ArrayList<Object> data) {
        MineTextImgItemBean mInvite = new MineTextImgItemBean();
        mInvite.setItemImgId(R.mipmap.img_invite);
        mInvite.setItemName("邀请好友");
        mInvite.setOnClickListener(v -> {

        });
        data.add(mInvite);

        MineTextImgItemBean mAbout = new MineTextImgItemBean();
        mAbout.setItemImgId(R.mipmap.img_about_us);
        mAbout.setItemName("关于我们");
        mAbout.setOnClickListener(v -> {

        });
        data.add(mAbout);

        MineTextImgItemBean mSetting = new MineTextImgItemBean();
        mSetting.setItemImgId(R.mipmap.img_setting);
        mSetting.setItemName("设置");
        mSetting.setOnClickListener(v -> {

        });
        data.add(mSetting);
    }

    private void setTopMineItemData(ArrayList<Object> data) {
        MineTextImgItemBean mMyBill = new MineTextImgItemBean();
        mMyBill.setItemImgId(R.mipmap.img_my_bill);
        mMyBill.setItemName("我的账单");
        mMyBill.setOnClickListener(v -> {
            //TODO 我的账单
        });
        data.add(mMyBill);
        MineTextImgItemBean mAsset = new MineTextImgItemBean();
        mAsset.setItemImgId(R.mipmap.img_asset);
        mAsset.setItemName("我的资产");
        mAsset.setOnClickListener(v -> {

        });
        data.add(mAsset);
        MineTextImgItemBean mMyBank = new MineTextImgItemBean();
        mMyBank.setItemImgId(R.mipmap.img_bank);
        mMyBank.setItemName("我的银行卡");
        mMyBank.setOnClickListener(v -> {

        });
        data.add(mMyBank);

        MineTextImgItemBean mMyWinReCord = new MineTextImgItemBean();
        mMyWinReCord.setItemImgId(R.mipmap.img_win_record);
        mMyWinReCord.setItemName("我的中奖记录");
        mMyWinReCord.setOnClickListener(v -> {

        });
        data.add(mMyWinReCord);
    }


}
