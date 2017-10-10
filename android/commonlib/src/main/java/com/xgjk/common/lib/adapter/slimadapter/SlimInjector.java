package com.xgjk.common.lib.adapter.slimadapter;


import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

public interface SlimInjector<T> {
    void onInject(T data, IViewInjector injector);
}
