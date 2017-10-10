package com.xgjk.common.lib.listener;
import android.view.View;

/**
 * Created by menmen on 16/5/13.
 * 功能：防止快速点击，产生多响应事件
 */
public abstract class OnClickEvent implements View.OnClickListener {

    public long lastTime;
    public long delayTime = 500;
    public final static long longDelayTime = 1000;

    public abstract void singleClick(View v);

    public OnClickEvent() {
    }

    public OnClickEvent(boolean isLongTime) {
        if (isLongTime) {
            delayTime = longDelayTime;
        }
    }

    @Override
    public void onClick(View v) {
        if (onDoubClick()) {
            return;
        }
        singleClick(v);
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

