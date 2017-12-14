package cn.neopay.walpay.android.view.actionview;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import com.bumptech.glide.Glide;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.XrecyclerviewLoadmoreViewBinding;

/**
 * @author carlos.guo
 * @date 2017/10/9
 * @describe XRecyclerViewLoadMoreView 加载更多视图
 */

public class XRecyclerViewLoadMoreView extends FrameLayout {

    private static XrecyclerviewLoadmoreViewBinding mBinding;

    public XRecyclerViewLoadMoreView(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public XRecyclerViewLoadMoreView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }

    public XRecyclerViewLoadMoreView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    private void initView(Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.xrecyclerview_loadmore_view, null, false);
        addView(mBinding.getRoot());
        Glide.with(context).load(R.mipmap.img_load_more).
                placeholder(R.mipmap.img_load_more).into(mBinding.xrvLoadMoreIv);
    }


    public static void loadMoreViewStart() {
        mBinding.getRoot().setVisibility(VISIBLE);
        mBinding.xrvLoadMoreContainerRl.setVisibility(VISIBLE);
        mBinding.xrvNoLoadMoreContainerRl.setVisibility(GONE);
    }

    public static void loadMoreViewEnd() {
        mBinding.getRoot().setVisibility(GONE);
        mBinding.xrvLoadMoreContainerRl.setVisibility(GONE);
        mBinding.xrvNoLoadMoreContainerRl.setVisibility(GONE);
    }

    public static void loadNoMoreView() {
        mBinding.getRoot().setVisibility(VISIBLE);
        mBinding.xrvLoadMoreContainerRl.setVisibility(GONE);
        mBinding.xrvNoLoadMoreContainerRl.setVisibility(VISIBLE);
    }

    public static void showLoadMore(int visibility) {
        mBinding.xrvLoadMoreContainerRl.setVisibility(visibility);
    }

    public static void showNoLoadMore(int visibility) {
        mBinding.xrvNoLoadMoreContainerRl.setVisibility(visibility);
    }


}
