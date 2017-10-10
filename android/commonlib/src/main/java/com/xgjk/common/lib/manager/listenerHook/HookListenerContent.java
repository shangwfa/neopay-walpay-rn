package com.xgjk.common.lib.manager.listenerHook;

/**
 * Created by shangwf on 2017/7/1.
 */

public class HookListenerContent {
    public IHookListener mOnClickListener;

    private HookListenerContent() {
    }


    public static HookListenerContent create(Builer builer) {
        if (builer == null) {
            return null;
        }
        return builer.build();
    }


    public static class Builer {
        private HookListenerContent hookListenerManager = new HookListenerContent();


        public Builer buildOnClickListener(IHookListener onClickListener) {
            hookListenerManager.mOnClickListener = onClickListener;
            return this;
        }


        public HookListenerContent build() {
            return hookListenerManager;
        }
    }


}
