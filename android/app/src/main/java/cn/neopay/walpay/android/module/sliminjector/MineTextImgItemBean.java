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
    private String typeClick;
    /**
     * 实名认证状态
     */
    private Integer authStatus;

    public Integer getAuthStatus() {
        return authStatus;
    }

    public void setAuthStatus(Integer authStatus) {
        this.authStatus = authStatus;
    }

    public String getTypeClick() {
        return typeClick;
    }

    public void setTypeClick(String typeClick) {
        this.typeClick = typeClick;
    }

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
