package cn.neopay.walpay.android.view.dialog;

import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.support.v7.widget.LinearLayoutManager;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.xgjk.common.lib.adapter.slimadapter.SlimAdapter;
import com.xgjk.common.lib.base.BaseDialog;

import org.greenrobot.eventbus.EventBus;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.adapter.sliminjector.SelectBankPaySlimInjector;
import cn.neopay.walpay.android.databinding.SelectBankDialogLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.GetUserBalanceRequestBean;
import cn.neopay.walpay.android.module.request.GetUserBankCardListRequestBean;
import cn.neopay.walpay.android.module.response.BankCardResponseBean;
import cn.neopay.walpay.android.module.response.UserBalanceResponseBean;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe SelectBankDialog 选择支付方式银行卡页面
 */

public class SelectBankDialog extends BaseDialog {
    private SelectBankDialogLayoutBinding mBinding;
    private SlimAdapter mSelectBankPayAdapter;
    private List<Object> mData;
    private BankCardResponseBean mBalancebean;

    public SelectBankDialog(@NonNull Context context) {
        super(context);
        initView(context);
    }

    public SelectBankDialog(@NonNull Context context, String title) {
        super(context);
        initView(context);
    }

    private void initView(final Context context) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mBinding = DataBindingUtil.inflate(inflater, R.layout.select_bank_dialog_layout, null, false);
        setContentView(mBinding.getRoot());
        mLayoutParams.gravity = Gravity.CENTER;
        handleView(context);
        handleViewClick(context);
    }

    private void handleViewClick(Context context) {
        mBinding.payModeCloseIv.setOnClickListener(v -> cancel());
        mBinding.addBindBankCardRl.payModeLl.setOnClickListener(v -> {
            //TODO 添加新的银行卡界面
        });
    }

    private void handleView(Context context) {
        mData = new ArrayList<>();
        mBinding.addBindBankCardRl.payModeTv.setText("添加绑定银行卡");
        mBinding.addBindBankCardRl.payModeIconIv.setBackgroundResource(R.mipmap.img_right_arrows);
        LinearLayoutManager layoutManager = new LinearLayoutManager(context);
        layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mSelectBankPayAdapter = SlimAdapter.create().register(R.layout.common_select_layout, new SelectBankPaySlimInjector());
        mBinding.payModeListRv.setAdapter(mSelectBankPayAdapter);
        mBinding.payModeListRv.setLayoutManager(layoutManager);
        requestBalance((Activity) context);
        requestBankCard((Activity) context);
    }

    private void requestBankCard(Activity context) {
        ApiManager.getSingleton().getUserBankCardList(new GetUserBankCardListRequestBean(), new BaseSubscriber(context, o -> {
            handleBankCard((List<BankCardResponseBean>) o);
        }));
    }

    private void handleBankCard(List<BankCardResponseBean> beanList) {
        if (beanList == null) {
            return;
        }
        mData.add(mBalancebean);
        for (int i = 0; i < beanList.size(); i++) {
            BankCardResponseBean bankCardBean = beanList.get(i);
            bankCardBean.setOnClickListener(v -> handleSelectPayStyleClick(bankCardBean));
            mData.add(bankCardBean);
        }
        mSelectBankPayAdapter.updateData(mData);
    }


    private void requestBalance(Activity context) {
        ApiManager.getSingleton().getUserBalance(new GetUserBalanceRequestBean(),
                new BaseSubscriber(context, o -> handleBalance((UserBalanceResponseBean) o)));
    }

    private void handleBalance(UserBalanceResponseBean balanceBean) {
        if (balanceBean == null) {
            return;
        }
        BigDecimal balance = balanceBean.getBalance();
        mBalancebean = new BankCardResponseBean();
        mBalancebean.setBankName("余额");
        mBalancebean.setBankCardNo(balance.toString());
        mBalancebean.setOnClickListener(v -> {
            handleSelectPayStyleClick(mBalancebean);
        });
    }

    private void handleSelectPayStyleClick(BankCardResponseBean bankCardBean) {
        dismiss();
        EventBus.getDefault().post(bankCardBean);
    }

}
