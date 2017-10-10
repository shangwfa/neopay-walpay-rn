package com.xgjk.common.lib.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shangwf on 2017/5/4.
 */

public class CommonAdapter extends RecyclerView.Adapter<CommonViewHolder> {
    private List<Object> mDataList;
    private Map<Object, CommonViewConverter> mViewHolderMap;
    private Context mContext;

    public CommonAdapter(Context context) {
        mContext = context;
        mViewHolderMap = new HashMap<>();
    }

    private int position = -1;

    @Override
    public int getItemViewType(int position) {
        this.position = position;
        return super.getItemViewType(position);
    }

    @Override
    public CommonViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        final CommonViewConverter viewConverter = mViewHolderMap.get(mDataList.get(position).getClass());

        return viewConverter == null ? null : viewConverter.createViewHolder();
    }

    @Override
    public void onBindViewHolder(final CommonViewHolder holder, final int position) {
        holder.bindView(mDataList.get(position));
        if (null != mOnItemClickListener) {
            holder.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mOnItemClickListener.onItemClick(holder.itemView, position);
                }
            });
        }
    }

    @Override
    public int getItemCount() {
        return mDataList == null ? 0 : mDataList.size();
    }

    public void addDataList(List<Object> mDataList) {
        this.mDataList = mDataList;
    }


    public void regist(final Object viewType, CommonViewConverter viewConverter) {
        mViewHolderMap.put(viewType, viewConverter);
    }


    private OnItemClickListener mOnItemClickListener;

    public void setOnItemClickListener(OnItemClickListener listener) {
        this.mOnItemClickListener = listener;
    }

    public interface OnItemClickListener {
        void onItemClick(View view, int position);
    }
}