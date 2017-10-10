package cn.neopay.walpay.android.module.sliminjector;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe CommonLineItemBean 我的页面 line
 */

public class CommonLineItemBean {
    private int lineHeight;

    public CommonLineItemBean() {
    }

    public CommonLineItemBean(int lineHeight) {
        this.lineHeight = lineHeight;
    }

    public int getLineHeight() {
        return lineHeight;
    }

    public void setLineHeight(int lineHeight) {
        this.lineHeight = lineHeight;
    }


}
