package cn.neopay.walpay.android.module.sliminjector;

import java.io.Serializable;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe CommonTextImgItemBean 图文混排Item
 */

public class CommonTextImgItemBean implements Serializable {
    private String leftImgId;
    private String leftImgDescript;
    private String rightImgId;
    private String rightImgDescript;
    private String itemType;

    public String getLeftImgId() {
        return leftImgId;
    }

    public void setLeftImgId(String leftImgId) {
        this.leftImgId = leftImgId;
    }

    public String getLeftImgDescript() {
        return leftImgDescript;
    }

    public void setLeftImgDescript(String leftImgDescript) {
        this.leftImgDescript = leftImgDescript;
    }

    public String getRightImgId() {
        return rightImgId;
    }

    public void setRightImgId(String rightImgId) {
        this.rightImgId = rightImgId;
    }

    public String getRightImgDescript() {
        return rightImgDescript;
    }

    public void setRightImgDescript(String rightImgDescript) {
        this.rightImgDescript = rightImgDescript;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }
}
