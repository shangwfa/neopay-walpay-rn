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
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.module.sliminjector.CommonLineItemBean;
import cn.neopay.walpay.android.module.sliminjector.CommonTextImgItemBean;

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
                .register(R.layout.common_text_img_item_layout, new MineTextImgSlimInjector());

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
        int[] leftImgId = new int[]{R.drawable.dd_add_image, R.drawable.dd_add_image, R.drawable.dd_add_image, R.drawable.dd_add_image};
        String[] leftImgDescript = new String[]{"我的账单", "我的资产", "我的银行卡", "我的中奖纪录"};
        int[] rightImgId = new int[]{R.mipmap.img_right_arrow};
        String[] itemType = new String[]{"我的账单", "我的资产", "我的银行卡", "我的中奖纪录"};

        int[] leftImgIdBottom = new int[]{R.drawable.dd_add_image, R.drawable.dd_add_image, R.drawable.dd_add_image};
        String[] leftImgDescriptBottom = new String[]{"邀请好友", "关于我们", "设置"};
        int[] rightImgIdBottom = new int[]{R.mipmap.img_right_arrow};
        String[] itemTypeBottom = new String[]{"邀请好友", "关于我们", "设置"};

        data.add(userInfoResponseBean);
        data.add(new CommonLineItemBean(1));
        setMineTextImgData(data, leftImgId, leftImgDescript, rightImgId, itemType);
        data.add(new CommonLineItemBean(1));
        setMineTextImgData(data, leftImgIdBottom, leftImgDescriptBottom, rightImgIdBottom, itemTypeBottom);
        return data;
    }

    private void setMineTextImgData(ArrayList<Object> data, int[] leftImgId, String[] leftImgDescript, int[] rightImgId, String[] itemType) {
        if (null != leftImgId) {
            for (int i = 0; i < leftImgId.length; i++) {
                CommonTextImgItemBean textImgItemBean = new CommonTextImgItemBean();
                textImgItemBean.setLeftImgId(String.format("%d", leftImgId[i]));
                textImgItemBean.setLeftImgDescript(leftImgDescript[i]);
                textImgItemBean.setRightImgId(String.format("%d", rightImgId[0]));
                textImgItemBean.setItemType(itemType[i]);
                textImgItemBean.setRightImgDescript("");
                data.add(textImgItemBean);
            }

        }
    }
}
