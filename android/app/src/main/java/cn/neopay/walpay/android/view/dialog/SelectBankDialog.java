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
import com.xgjk.common.lib.utils.ToastUtils;

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
        mSelectBankPayAdapter.updateData(mData);
    }

    private void requestBankCard(Activity context) {
        ApiManager.getSingleton().getUserBankCardList(new GetUserBankCardListRequestBean(), new BaseSubscriber(context, o -> {
            handleBankCard((List<BankCardResponseBean>) o);
        }));
    }

    private void handleBankCard(List<BankCardResponseBean> beanList) {
        //TODO 测试
        beanList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            BankCardResponseBean bean = new BankCardResponseBean();
            bean.setBankName("中国银行--" + i);
            bean.setBankCardNo("1234567" + i);
            beanList.add(bean);
        }

        if (beanList == null) {
            return;
        }
        for (int i = 0; i < beanList.size(); i++) {
            BankCardResponseBean bankCardBean = beanList.get(i);
            bankCardBean.setOnClickListener(v -> {
                //todo 选择了银行卡
                ToastUtils.show("银行卡");
                dismiss();
            });
            mData.add(bankCardBean);
        }
    }

    private void requestBalance(Activity context) {
        ApiManager.getSingleton().getUserBalance(new GetUserBalanceRequestBean(), new BaseSubscriber(context, o -> {
            handleBalance((UserBalanceResponseBean) o);
        }));
    }

    private void handleBalance(UserBalanceResponseBean balanceBean) {
        //TODO 测试
        balanceBean = new UserBalanceResponseBean();
        balanceBean.setBalance(new BigDecimal("88.08"));

        if (balanceBean == null) {
            return;
        }
        BigDecimal balance = balanceBean.getBalance();
        BankCardResponseBean bean = new BankCardResponseBean();
        bean.setBankName("余额");
        bean.setBankCardNo(balance.toString());
        bean.setOnClickListener(v -> {
            // TODO 选择了余额
            ToastUtils.show("余额");
            dismiss();
        });
        mData.add(bean);
    }

}
