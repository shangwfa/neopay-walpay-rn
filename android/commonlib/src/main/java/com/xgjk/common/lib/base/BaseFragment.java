package com.xgjk.common.lib.base;

import android.databinding.ViewDataBinding;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.lang.reflect.ParameterizedType;

/**
 * Created by shangwf on 2017/5/3.
 */

public abstract class BaseFragment<P extends BasePresenter, B extends ViewDataBinding> extends DataBindingFragment<B> {
    public P mPresenter;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return super.onCreateView(inflater, container, savedInstanceState);
    }

    @Override
    protected void initPresenter() {
        if (this instanceof BaseView &&
                this.getClass().getGenericSuperclass() instanceof ParameterizedType &&
                ((ParameterizedType) (this.getClass().getGenericSuperclass())).getActualTypeArguments().length > 0) {
            Class mPresenterClass = (Class) ((ParameterizedType) (this.getClass()
                    .getGenericSuperclass())).getActualTypeArguments()[0];
            try {
                mPresenter = (P) mPresenterClass.newInstance();
            } catch (java.lang.InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            mPresenter.setView(this);
        }
    }
}
