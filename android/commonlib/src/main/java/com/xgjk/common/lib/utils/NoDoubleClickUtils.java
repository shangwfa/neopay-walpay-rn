package com.xgjk.common.lib.utils;

/**
 * Created by shangwf on 2017/8/29.
 */

public class NoDoubleClickUtils {
    private static long lastClickTime = 0;
    private final static int SPACE_TIME = 500;

    public synchronized static boolean isDoubleClick() {
        long currentTime = System.currentTimeMillis();
        boolean isOK;
        if (currentTime - lastClickTime > SPACE_TIME) {
            isOK = false;
        } else {
            isOK = true;
        }
        lastClickTime = currentTime;
        return isOK;
    }
}
