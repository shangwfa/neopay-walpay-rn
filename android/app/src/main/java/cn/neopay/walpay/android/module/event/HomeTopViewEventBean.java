package cn.neopay.walpay.android.module.event;

/**
 * @author carlos.guo
 * @date 2017/10/23
 * @describe
 */

public class HomeTopViewEventBean extends BaseEventBean {
    private int scrollY;
    private float scaleY;

    public float getScaleY() {
        return scaleY;
    }

    public void setScaleY(float scaleY) {
        this.scaleY = scaleY;
    }

    public int getScrollY() {
        return scrollY;
    }

    public void setScrollY(int scrollY) {
        this.scrollY = scrollY;
    }
}
