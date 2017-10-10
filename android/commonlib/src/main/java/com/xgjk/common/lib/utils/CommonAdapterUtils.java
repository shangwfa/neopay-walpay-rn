package com.xgjk.common.lib.utils;

import android.view.ViewGroup;

import com.xgjk.common.lib.adapter.CommonViewConverter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shangwf on 2017/4/29.
 */

public class CommonAdapterUtils {
    private List<Object> mDataList;
    private Map<Object, CommonViewConverter> mViewHolderMap;

    public CommonAdapterUtils() {
        this.mViewHolderMap = new HashMap<>();
    }

    public void setAdapter(ViewGroup parent) {
        if (parent != null && mDataList != null) {
            final int count = mDataList.size();
            for (int i = 0; i < count; i++) {
                CommonViewConverter viewConverter = mViewHolderMap.get(mDataList.get(i).getClass());
                viewConverter.createViewHolder().bindView(mDataList.get(i));
                parent.addView(viewConverter.getRootView());
            }
            parent.invalidate();
        }
    }

    public void register(Object type, CommonViewConverter viewConverter) {
        mViewHolderMap.put(type, viewConverter);
    }

    public void addAllDatas(List<Object> mDataList) {
        this.mDataList = mDataList;
    }
    public void clearAllDatas(){
        if(mDataList!=null){
            mDataList.clear();
        }
    }
}
