package com.xgjk.common.lib.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Pair;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by shangwf on 2017/5/3.
 */

public class SimpleAdapt extends BaseAdapter {

    /***
     * 用来处理 生成View 和 绑定数据
     */
    public interface IConvertView {
        /***
         * 生成包装过的
         * @param context
         * @return
         */
        Object onCreateViewHolder(Context context);

        /***
         * 从ViewHolder的包装中 获取真实的View
         * @param viewHolder
         * @return
         */
        View getRootView(Object viewHolder);

        /***
         * 绑定数据
         * @param data
         * @param holder
         */
        void onAssignViewHolder(Object data, Object holder);

        /***
         * 是否匹配
         * @param data
         * @return
         */
        boolean isMatched(Object data);
    }


    public static abstract class RecycleViewHolderConverter<D, H extends RecyclerView.ViewHolder> implements IConvertView {
        private final int layoutId;

        public RecycleViewHolderConverter(Class<H> holderClass, int layoutId) {
            this.layoutId = layoutId;
        }

        private Object target;

        public final void setTarget(Object target) {
            this.target = target;
        }

        public final View inflate(Context context) {
            final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            final View rootView = inflater.inflate(layoutId, null, false);
            return rootView;
        }

        public final boolean isMatched(Object data) {
            if (data != null && data.equals(target)) {
                return true;
            } else if (data != null && data.getClass() == target) {
                return isDataMatched((D) data);
            }
            return false;
        }

        /***
         * 默认返回true
         * @param data
         * @return
         */
        public boolean isDataMatched(D data) {
            return true;
        }

        @Override
        public Object onCreateViewHolder(Context context) {
            final View view = inflate(context);
            return createRecyclerViewHolder(view);
        }

        public abstract H createRecyclerViewHolder(View view);

        public final View getRootView(Object viewHolder) {
            return ((H) viewHolder).itemView;
        }

        @Override
        public final void onAssignViewHolder(Object data, Object holder) {
            onAssign((D) data, (H) holder);
        }


        public abstract void onAssign(D data, H holder);


    }


    private int nextType = 0;

    private final LinkedList<Pair<IConvertView, Integer>> registList = new LinkedList<Pair<IConvertView, Integer>>();

    private final List<Object> dataList;
    private final Context context;

    public SimpleAdapt(Context context) {
        this.context = context;
        this.dataList = new ArrayList<>();
    }


    /***
     * 注册 适用于 Recycler.ViewHolder
     * @param type
     * @param convertView
     * @return
     */
    public int regist(final Object type, final RecycleViewHolderConverter convertView) {
        final int typeIndex = nextType;
        convertView.setTarget(type);
        final Pair<IConvertView, Integer> pair = new Pair<IConvertView, Integer>(convertView, typeIndex);
        registList.add(pair);
        nextType++;
        return typeIndex;
    }


    public List<Object> getDataList() {
        return dataList;
    }

    public void addData(Object obj) {
        if (obj != null) {
            dataList.add(obj);
        }
    }

    public void addAll(Collection obj) {
        if (obj != null) {
            dataList.addAll(obj);
        }
    }

    public void addData(Object obj, int index) {
        if (obj != null) {
            dataList.add(index, obj);
        }
    }

    public void removeData(Object obj) {
        dataList.remove(obj);
    }

    public void removeData(int index) {
        dataList.remove(index);
    }

    public void clearData() {
        dataList.clear();
    }

    public void clearAllRegist() {
        registList.clear();
        nextType = 0;
    }

    @Override
    public int getCount() {
        return dataList.size();
    }

    @Override
    public Object getItem(int position) {
        if (getCount() > position) {
            return dataList.get(position);
        }
        return null;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    private Pair<IConvertView, Integer> findPairByData(final Object data) {
        final Iterator<Pair<IConvertView, Integer>> it = registList.iterator();

        while (it.hasNext()) {
            final Pair<IConvertView, Integer> pairRet = it.next();
            if (pairRet.first.isMatched(data)) {
                return pairRet;
            }
        }

        return null;
    }

    @SuppressWarnings("unchecked")
    @Override
    public final View getView(int position, View convertView, ViewGroup parent) {
        final Object data = getItem(position);

        final Pair<IConvertView, Integer> pair = findPairByData(data);
        if (pair != null) {
            if (convertView != null) {
                pair.first.onAssignViewHolder(data, convertView.getTag());
            } else {
                final Object holder = pair.first.onCreateViewHolder(context);

                convertView = pair.first.getRootView(holder);
                convertView.setTag(holder);
                pair.first.onAssignViewHolder(data, holder);
            }
        }
        return convertView;
    }

    @Override
    public int getItemViewType(int position) {
        final Object data = getItem(position);
        final Pair<IConvertView, Integer> pair = findPairByData(data);

        if (pair != null) {
            return pair.second;
        } else {
            return -1;
        }
    }

    @Override
    public int getViewTypeCount() {
        return nextType;
    }


    public RecycleViewHolderConverter getViewHolderConverter(int position) {
        return (RecycleViewHolderConverter) findPairByData(dataList.get(position)).first;
    }

}
