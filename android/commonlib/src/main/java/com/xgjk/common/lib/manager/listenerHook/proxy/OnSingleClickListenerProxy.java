package com.xgjk.common.lib.manager.listenerHook.proxy;

import android.view.View;

import com.xgjk.common.lib.Constants;
import com.xgjk.common.lib.manager.listenerHook.IHookListener;

/**
 * Created by shangwf on 2017/7/1.
 */

public class OnSingleClickListenerProxy implements View.OnClickListener {
    public long lastTime;
    public long delayTime = 500;
    public final static long longDelayTime = 1000;
    private View.OnClickListener mProxyListener;
    private IHookListener mIHookListener;

    public OnSingleClickListenerProxy(View.OnClickListener mProxyListener,IHookListener iHookListener) {
        this.mProxyListener = mProxyListener;
        this.mIHookListener=iHookListener;
    }

    @Override
    public void onClick(View v) {
        if(!Constants.NO_SINGLE_CLICK.equals(v.getTag())&&onDoubClick()){
            return;
        }

        if(null!=mIHookListener){
            mIHookListener.doListener(v);
        }
        if (null != mProxyListener) {
            mProxyListener.onClick(v);
        }

    }

    public boolean onDoubClick() {
        boolean flag = false;
        long time = System.currentTimeMillis() - lastTime;

        if (time < delayTime) {
            flag = true;
        }
        lastTime = System.currentTimeMillis();
        return flag;
    }
}
