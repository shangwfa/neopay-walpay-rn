package com.xgjk.common.lib.adapter.slimadapter;

import android.support.v7.widget.RecyclerView;


abstract class AbstractSlimAdapter extends RecyclerView.Adapter<SlimViewHolder> {

    @Override
    public  final void onBindViewHolder(SlimViewHolder holder, int position) {
        holder.bind(getItem(position));
    }

    protected abstract Object getItem(int position);

}
