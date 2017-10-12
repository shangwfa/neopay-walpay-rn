package cn.neopay.walpay.android.adapter.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.xgjk.common.lib.base.BaseFragment;

import java.util.List;

import cn.neopay.walpay.android.R;

/**
 * Created by shangwf on 2017/5/3.
 */

public class MainPagerAdapter extends BaseFragmentPagerAdapter {


    private final String[] tabTitles = {"首页", "新光币", "消息", "我的"};

    private final int[] imageResId = {R.drawable.home_home_tab_selecter, R.drawable.home_shinkong_currency_tab_selecter, R.drawable.home_msg_tab_selecter, R.drawable.home_mine_tab_selecter};

    public MainPagerAdapter(FragmentManager fm, List<BaseFragment> fragments) {
        super(fm, fragments);
    }

    /**
     * 获取Tab视图
     *
     * @param context  上下文
     * @param position 位置
     * @return view
     */
    @SuppressLint("InflateParams")
    public View getTabView(Context context, int position) {
        //后期做一下优化
        View view = LayoutInflater.from(context).inflate(R.layout.home_tab_item, null);
        TextView tv_tab = (TextView) view.findViewById(R.id.tv_tab);
        tv_tab.setText(tabTitles[position]);
        ImageView iv_tab = (ImageView) view.findViewById(R.id.iv_tab);
        iv_tab.setImageResource(imageResId[position]);
        return view;
    }


}
