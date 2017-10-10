package com.xgjk.common.lib.manager.listenerHook.proxy;

import android.view.View;

import com.xgjk.common.lib.manager.listenerHook.IHookListener;

/**
 * Created by shangwf on 2017/7/1.
 */

public class OnClickListenerProxy implements View.OnClickListener {
    private View.OnClickListener mProxyListener;
    private IHookListener mListener;

    public OnClickListenerProxy(View.OnClickListener mProxyListener, IHookListener mListener) {
        this.mProxyListener = mProxyListener;
        this.mListener = mListener;
    }

    @Override
    public void onClick(View v) {
        if (null != mListener) {
            mListener.doListener(v);
        }

        if (null != mProxyListener) {
            mProxyListener.onClick(v);
        }
    }
}
