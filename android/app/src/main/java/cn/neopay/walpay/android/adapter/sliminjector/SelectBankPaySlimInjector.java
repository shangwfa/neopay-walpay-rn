package cn.neopay.walpay.android.adapter.sliminjector;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.response.BankCardResponseBean;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/10/12
 * @describe SelectBankPaySlimInjector 付款码 选择付款方式 item
 */

public class SelectBankPaySlimInjector implements SlimInjector<BankCardResponseBean> {
    @Override
    public void onInject(BankCardResponseBean data, IViewInjector injector) {
        if (data == null) {
            return;
        }
        if ("余额".equals(data.getBankName())) {
            injector.text(R.id.pay_mode_tv, BusniessUtils.handleBalanceNickName(data.getBankName(), data.getBankCardNo()));
        } else {
            injector.text(R.id.pay_mode_tv, BusniessUtils.handleBankNickName(data.getBankName(), data.getBankCardNo()));
        }
        injector.background(R.id.pay_mode_icon_iv, R.mipmap.img_right_arrow);
        injector.clicked(R.id.pay_mode_rl, data.getOnClickListener());
    }

}
