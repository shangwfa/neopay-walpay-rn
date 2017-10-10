package com.xgjk.common.lib.manager.listenerHook;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;

import com.xgjk.common.lib.manager.listenerHook.proxy.OnSingleClickListenerProxy;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by shangwf on 2017/7/1.
 */

public class HookListenerManager {
    private HookListenerContent  mHookListenerContent;

    private HookListenerManager(){}

    private static class SingleHolder{
        public static final HookListenerManager INSTANCE = new HookListenerManager();
    }

    public static HookListenerManager getInstance(){
        return SingleHolder.INSTANCE;
    }

    public void startHook(Activity activity, HookListenerContent hookListenerContent){
        mHookListenerContent = hookListenerContent;

        List<View> views = getAllChildViews(activity);
        for(View v: views){
            hookSingleView(v);
        }
    }


    private void hookSingleView(View view){
        Class mClassView = null;
        try {
            mClassView = Class.forName("android.view.View");
            Method method = mClassView.getDeclaredMethod("getListenerInfo");
            method.setAccessible(true);
            Object listenerInfoObject = method.invoke(view);

            Class mClassListenerInfo = Class.forName("android.view.View$ListenerInfo");

            Field feildOnClickListener = mClassListenerInfo.getDeclaredField("mOnClickListener");
            feildOnClickListener.setAccessible(true);
            View.OnClickListener mOnClickListenerObject = (View.OnClickListener) feildOnClickListener.get(listenerInfoObject);


            View.OnClickListener onClickListenerProxy = new OnSingleClickListenerProxy(mOnClickListenerObject,mHookListenerContent.mOnClickListener);

            feildOnClickListener.set(listenerInfoObject, onClickListenerProxy);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
    }


    public List<View> getAllChildViews(Activity activity) {
        View view = activity.getWindow().getDecorView();
        return getAllChildViews(view);
    }

    private List<View> getAllChildViews(View view) {
        List<View> allchildren = new ArrayList<View>();
        if (view instanceof ViewGroup) {
            ViewGroup vp = (ViewGroup) view;
            for (int i = 0; i < vp.getChildCount(); i++) {
                View viewchild = vp.getChildAt(i);
                allchildren.add(viewchild);
                allchildren.addAll(getAllChildViews(viewchild));
            }
        }
        return allchildren;
    }
}
