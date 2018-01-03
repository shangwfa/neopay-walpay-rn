package cn.neopay.walpay.android.ui.web;

import android.content.Context;
import android.webkit.JavascriptInterface;

import com.just.library.AgentWeb;
import com.xgjk.common.lib.utils.HandlerUtils;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2018/1/2
 * @describe
 */

public class AndroidJSInterface {
    private AgentWeb agent;
    private Context context;

    public AndroidJSInterface(AgentWeb agent, Context context) {
        this.agent = agent;
        this.context = context;
    }

    @JavascriptInterface
    public void jsCallNativeShowMsg(final String msg) {
        HandlerUtils.runOnUiThread(() -> ToastUtils.show(msg));
    }

    @JavascriptInterface
    public String jsCallNativeGetAccessToken() {
        return BusniessUtils.getAccessToken();
    }

    @JavascriptInterface
    public int jsCallNativeGetTerminal() {
        return 1;
    }
}
