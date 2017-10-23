package com.xgjk.common.lib.base;

import android.content.Context;
import android.databinding.DataBindingUtil;
import android.databinding.ViewDataBinding;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.xgjk.common.lib.R;
import com.xgjk.common.lib.databinding.CommonNetworkErrorLayoutBinding;
import com.xgjk.common.lib.databinding.CommonNoDataLayoutBinding;
import com.xgjk.common.lib.databinding.FragmentBaseBinding;
import com.xgjk.common.lib.listener.OnClickEvent;
import com.xgjk.common.lib.utils.NetWorkUtils;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by shangwf on 2017/5/3.
 */

public abstract class DataBindingFragment<B extends ViewDataBinding> extends Fragment {
    public Context mContext;
    public B mViewBinding;
    public FragmentBaseBinding mPageBinding;
    private CommonNetworkErrorLayoutBinding mExcepitonView;
    private CommonNoDataLayoutBinding mNoDataView;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        if (!EventBus.getDefault().isRegistered(this)) {
            EventBus.getDefault().register(this);
        }
        mPageBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_base, container, false);
        mViewBinding = DataBindingUtil.inflate(inflater, getLayoutId(), null, false);
        handleNetworkError(inflater);
        handleNoData(inflater);
        mPageBinding.baseContainer.addView(mViewBinding.getRoot());
        mContext = getActivity();
        initPresenter();
        initView();
        return mPageBinding.getRoot();
    }

    private void handleNetworkError(LayoutInflater inflater) {
        if (isShowExceptionView()) {
            mExcepitonView = DataBindingUtil.inflate(inflater, getExceptionLayoutId(), null, false);
            mPageBinding.baseContainer.addView(mExcepitonView.getRoot());
            showExceptionPage(!NetWorkUtils.isConnectedByState(getActivity()));
            mExcepitonView.getRoot().setOnClickListener(new OnClickEvent() {
                @Override
                public void singleClick(View v) {
                    refreshCurPage();
                    initView();
                }
            });
        }
    }


    private void handleNoData(LayoutInflater inflater) {
        if (isShowNoDataView()) {
            mNoDataView = DataBindingUtil.inflate(inflater, getNoDataLayoutId(), null, false);
            mPageBinding.baseContainer.addView(mNoDataView.getRoot());
            mNoDataView.getRoot().setVisibility(isShowNoDataView() ? View.VISIBLE : View.GONE);
        }
        mViewBinding.getRoot().setVisibility(isShowNoDataView() ? View.GONE : View.VISIBLE);
    }

    public void refreshCurPage() {
        showExceptionPage(!NetWorkUtils.isConnectedByState(getActivity()));
    }

    private void showExceptionPage(boolean isShow) {
        mExcepitonView.getRoot().setVisibility(isShow ? View.VISIBLE : View.GONE);
        mViewBinding.getRoot().setVisibility(isShow ? View.GONE : View.VISIBLE);
    }

    public boolean isShowExceptionView() {
        return false;
    }

    public boolean isShowNoDataView() {
        return false;
    }

    public int getExceptionLayoutId() {
        return R.layout.common_network_error_layout;
    }

    public int getNoDataLayoutId() {
        return R.layout.common_no_data_layout;
    }

    protected void initPresenter() {

    }

    public abstract int getLayoutId();

    public abstract void initView();

    @Override
    public void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onMessageEvent(DataBindingActivity.MessageEvent event) {/* Do something */}

    public static class MessageEvent { /* Additional fields if needed */
    }
}
