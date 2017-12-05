package cn.neopay.walpay.android.module.event;

/**
 * @author carlos.guo
 * @date 2017/12/4
 * @describe
 */

public class HomeViewChangeEvent extends BaseEventBean {
    private int scrollY;
    private boolean isBottom;

    public boolean isBottom() {
        return isBottom;
    }

    public void setBottom(boolean bottom) {
        isBottom = bottom;
    }

    public int getScrollY() {
        return scrollY;
    }

    public void setScrollY(int scrollY) {
        this.scrollY = scrollY;
    }
}
