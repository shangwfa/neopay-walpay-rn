package com.xgjk.common.lib.iservice;

import com.alibaba.android.arouter.facade.template.IProvider;

/**
 * Created by shangwf on 2017/6/20.
 */

public interface PayService extends IProvider {
    //支付
    String pay(double amount);

    void paywithCB(double amount, PayCallBack callBack);

    //退款
    String recepit(double amount);


     interface PayCallBack {
        void callback(String payStr);
    }
}
