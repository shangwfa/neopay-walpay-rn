package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

/**
 * @author carlos.guo
 * @date 2017/10/17
 * @describe MineTextImgItemBean mineFragment 的条目bean
 */

public class MineTextImgItemBean {
    private int itemImgId;
    private String itemName;
    private View.OnClickListener onClickListener;

    public int getItemImgId() {
        return itemImgId;
    }

    public void setItemImgId(int itemImgId) {
        this.itemImgId = itemImgId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }
}
