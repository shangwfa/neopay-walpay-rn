package com.xgjk.common.lib.manager;

import android.app.Activity;
import android.content.Context;

import com.orhanobut.logger.Logger;

import java.util.Stack;

/**
 * Created by shangwf on 2017/4/29.
 */

public class ActivityManager {
    private static Stack<Activity> mActivityStack;
    private static ActivityManager mAppManager;

    private ActivityManager() {
    }

    /**
     * 单一实例
     */
    public static ActivityManager getInstance() {
        if (mAppManager == null) {
            mAppManager = new ActivityManager();
        }
        return mAppManager;
    }

    /**
     * 添加Activity到堆栈
     */
    public void addActivity(Activity activity) {
        if (mActivityStack == null) {
            mActivityStack = new Stack<Activity>();
        }
        mActivityStack.add(activity);
    }

    /**
     * 获取栈顶Activity
     */
    public Activity getTopActivity() {
        return mActivityStack.lastElement();
    }

    /**
     * 结束栈顶Activity
     */
    public void killTopActivity() {
        if (null != mActivityStack) {
            Activity activity = mActivityStack.lastElement();
            killActivity(activity);
        }
    }

    /**
     * 结束指定的Activity
     */
    public void killActivity(Activity activity) {
        if (activity != null && null != mActivityStack) {
            mActivityStack.remove(activity);
            activity.finish();
        }
    }

    /**
     * 结束指定类名的Activity
     */
    public void killActivity(Class<?> cls) {
        if (null != mActivityStack) {
            for (Activity activity : mActivityStack) {
                if (activity.getClass().equals(cls)) {
                    killActivity(activity);
                }
            }
        }
    }

    public void printAllActivity() {
        if (null != mActivityStack) {
            StringBuffer buffer = new StringBuffer();
            for (int i = 0, size = mActivityStack.size(); i < size; i++) {
                if (null != mActivityStack.get(i)) {
                    String name = mActivityStack.get(i).getClass().getName();
                    buffer.append(name);
                    buffer.append("\n");
                }
            }
            Logger.d("printAllActivity：\n" + buffer.toString());
        }
    }

    /**
     * 结束所有Activity
     */
    public void killAllActivity() {
        if (null != mActivityStack) {
            for (int i = 0, size = mActivityStack.size(); i < size; i++) {
                if (null != mActivityStack.get(i)) {
                    mActivityStack.get(i).finish();
                }
            }
            mActivityStack.clear();
        }
    }

    /**
     * 退出应用程序
     */
    @SuppressWarnings("deprecation")
    public void appExit(Context context) {
        try {
            killAllActivity();
            android.app.ActivityManager activityMgr = (android.app.ActivityManager) context
                    .getSystemService(Context.ACTIVITY_SERVICE);
            activityMgr.restartPackage(context.getPackageName());
            System.exit(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
