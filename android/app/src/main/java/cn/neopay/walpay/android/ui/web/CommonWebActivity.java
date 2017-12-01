package cn.neopay.walpay.android.ui.web;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseH5Activity;

import cn.neopay.walpay.android.constans.IWalpayConstants;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe CommonWebActivity 通用web
 */
@Route(path = IWalpayConstants.TO_SIGNINWEB_PAGE)
public class CommonWebActivity extends BaseH5Activity {
    @Autowired
    String loadUrl;

    @Override
    protected String loadUrl() {
        //TODO 获取url
        return loadUrl;
    }
}
