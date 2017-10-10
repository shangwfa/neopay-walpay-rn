package com.xgjk.common.lib.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;

/**
 * Created by shangwf on 2017/5/4.
 */

public abstract class CommonViewConverter<H extends CommonViewHolder> {
    private Context mContext;
    private int mLayoutId;
    private View rootView;

    public CommonViewConverter(Context context,int layoutId) {
        mContext=context;
        mLayoutId=layoutId;
    }


    public H createViewHolder(){
        final LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        rootView = inflater.inflate(mLayoutId, null, false);

        return getViewHolder(rootView);
    }
    public abstract H getViewHolder(View itemView);

    public View getRootView(){
        return rootView;
    }
}