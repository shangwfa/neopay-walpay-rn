package com.xgjk.common.lib.base;

import android.app.Activity;
import android.support.v4.app.Fragment;


/**
 * Created by shangwf on 2017/4/30.
 */

public abstract class BasePresenter<V> {
    protected V mView;
    protected Activity mActivity;

    public void setView(V v) {
        this.mView = v;
        if (mView instanceof Activity) {
            this.mActivity = (Activity) mView;
        }
        if (mView instanceof Fragment) {
            this.mActivity = ((Fragment) mView).getActivity();
        }

        this.onAttached();
    }

    public abstract void onAttached();

    public abstract void onDetached();
}
