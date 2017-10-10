package com.xgjk.common.lib.base;

import android.databinding.ViewDataBinding;

import java.lang.reflect.ParameterizedType;

/**
 * Created by shangwf on 2017/4/30.
 */

public abstract class BaseActivity<P extends BasePresenter, B extends ViewDataBinding> extends DataBindingActivity<B> {
    public P mPresenter;

    @Override
    protected void initPresenter() {
        if (this instanceof BaseView && this.getClass().getGenericSuperclass() instanceof ParameterizedType && ((ParameterizedType) (this.getClass().getGenericSuperclass())).getActualTypeArguments().length > 0) {
            Class mPresenterClass = (Class) ((ParameterizedType) (this.getClass().getGenericSuperclass())).getActualTypeArguments()[0];
            try {
                mPresenter = (P) mPresenterClass.newInstance();
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            mPresenter.setView(this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mPresenter != null) mPresenter.onDetached();
    }
}
