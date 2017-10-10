package com.xgjk.common.lib.listener;


import com.xgjk.common.lib.view.xrecyclerview.XRecyclerView;

/**
 * Created by shangwf on 2017/5/27.
 */

public abstract class LoadingMoreListener implements XRecyclerView.LoadingListener {

    public abstract void onRefresh();

    public void onLoadMore() {
    }
}
