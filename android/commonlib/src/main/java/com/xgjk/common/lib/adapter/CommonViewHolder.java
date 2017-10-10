package com.xgjk.common.lib.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.View;

/**
 * Created by shangwf on 2017/5/4.
 */

public  abstract class CommonViewHolder extends RecyclerView.ViewHolder{
    public CommonViewHolder(View itemView) {
        super(itemView);
    }

    public abstract void bindView(Object data);

}
