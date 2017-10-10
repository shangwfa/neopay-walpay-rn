package com.xgjk.common.lib.base;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import java.lang.ref.WeakReference;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by shangwf on 2017/4/30.
 */

public class BaseActivityLifeCallback implements Application.ActivityLifecycleCallbacks {
    public final List<WeakReference<Activity>> weakReferences = new LinkedList<WeakReference<Activity>>();
    private boolean isAppForeground;

    @Override
    public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
        weakReferences.add(new WeakReference<Activity>(activity));
    }

    @Override
    public void onActivityStarted(Activity activity) {

    }

    @Override
    public void onActivityResumed(Activity activity) {
        isAppForeground = true;
    }

    @Override
    public void onActivityPaused(Activity activity) {
        isAppForeground = false;
    }

    @Override
    public void onActivityStopped(Activity activity) {
    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
    }

    @Override
    public void onActivityDestroyed(Activity activity) {
        final Iterator<WeakReference<Activity>> it = weakReferences.iterator();
        while (it.hasNext()) {
            final WeakReference<Activity> weakReference = it.next();
            if (weakReference.get() == null) {
                it.remove();
            } else if (weakReference.get() == activity) {
                it.remove();
            }
        }

    }

    public void finishAll() {
        final Iterator<WeakReference<Activity>> it = weakReferences.iterator();
        while (it.hasNext()) {
            final WeakReference<Activity> weakReference = it.next();
            final Activity activity = weakReference.get();
            if (activity != null) {
                activity.finish();
            }
        }
        weakReferences.clear();
    }

    public Activity getTopActivity() {
        if (weakReferences.size() > 0) {
            return weakReferences.get(weakReferences.size() - 1).get();
        } else {
            return null;
        }
    }

    public void popTopActivity() {
        final Iterator<WeakReference<Activity>> it = weakReferences.iterator();
        final WeakReference<Activity> weakReference = it.next();
        final Activity activity = weakReference.get();
        if (activity == null) {
            it.remove();
        } else {
            activity.finish();
        }
    }

    public boolean isAppForeground() {
        return isAppForeground;
    }
}
