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

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by shangwf on 2017/5/3.
 */

public abstract class DataBindingFragment<B extends ViewDataBinding> extends Fragment {
    public Context mContext;
    public B mViewBinding;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        EventBus.getDefault().register(this);
        mViewBinding = DataBindingUtil.inflate(inflater, getLayoutId(), container, false);
        mContext=getActivity();
        initPresenter();
        initView();
        return mViewBinding.getRoot();
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

    public static class MessageEvent { /* Additional fields if needed */ }
}
