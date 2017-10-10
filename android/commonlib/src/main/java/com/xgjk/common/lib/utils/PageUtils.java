package com.xgjk.common.lib.utils;

import java.util.List;

/**
 * Created by shangwf on 2017/6/2.
 */

public class PageUtils {
    private final static int defaultPagesize = 10;

    public static String getPageNo(List<Object> mList) {
        if (mList.size() <= 0) {
            return "1";
        }
        return "" + (mList.size() % defaultPagesize == 0 ? (mList.size() / defaultPagesize + 1) : (mList.size() / defaultPagesize + 2));
    }

    public static boolean isLoadNoMoreItem(int listSize) {
        return listSize > 0 && listSize % defaultPagesize > 0;
    }
}
