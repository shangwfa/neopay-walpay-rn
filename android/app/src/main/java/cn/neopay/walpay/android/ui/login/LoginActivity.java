package cn.neopay.walpay.android.ui.login;

import android.view.View;
import android.widget.LinearLayout;

import com.alibaba.android.arouter.facade.annotation.Autowired;
import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseActivity;
import com.xgjk.common.lib.utils.DensityUtils;
import com.xgjk.common.lib.utils.ScreenUtils;
import com.xgjk.common.lib.utils.ToastUtils;
import com.xgjk.common.lib.utils.ViewUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.databinding.ActivityLoginLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.VerifyRegisterPhoneRequestBean;
import cn.neopay.walpay.android.module.response.VerifyRegisterPhoneResponseBean;
import cn.neopay.walpay.android.utils.InputCheckUtils;
import cn.neopay.walpay.android.view.commoninputview.CommonLoginView;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe LoginActivity 登录页面
 */
@Route(path = IWalpayConstants.TO_LOGIN_PAGE)
public class LoginActivity extends BaseActivity<LoginPresenter, ActivityLoginLayoutBinding> implements LoginContract.IView {
    @Autowired
    public String userName;

    @Override
    public int getLayoutId() {
        return R.layout.activity_login_layout;
    }

    @Override
    public int getExceptionLayoutId() {
        return 0;
    }

    @Override
    public void initView() {
        hideHeaderView();
        setDoubleBackExit(true);
        handleBottomKeyLayout();
        handleView();
    }

    private void handleView() {
        ViewUtils.setEditTextValue(mViewBinding.loginPhone.getEditTextView(), userName);
        mViewBinding.loginPhone.setType(CommonLoginView.LoginInputType.LOGIN_PHONE, R.mipmap.img_phone_red);
        mViewBinding.loginPhone.setHint(getString(R.string.str_input_phone));
        mViewBinding.loginPwd.setType(CommonLoginView.LoginInputType.LOGIN_PWD, R.mipmap.img_pwd_red);
        mViewBinding.loginPwd.setHint(getString(R.string.str_input_pwd));
        //TODO 测试账号 需要清理
        mViewBinding.loginPhone.getEditTextView().setText("15858295625");
        mViewBinding.loginPwd.getEditTextView().setText("m12345678");
        mViewBinding.loginBtn.setOnClickListener(v -> {
            String phone = mViewBinding.loginPhone.getEditText();
            String passWord = mViewBinding.loginPwd.getEditText();
            if (InputCheckUtils.checkPhone(phone) && InputCheckUtils.checkPassword(passWord)) {
                mPresenter.login(phone, passWord);
            }
        });

        mViewBinding.loginForgetPwd.setOnClickListener(v -> mPresenter.forgetPassword(mViewBinding.loginPhone.getEditText()));
        mViewBinding.loginRegister.setOnClickListener(v -> mPresenter.register(mViewBinding.loginPhone.getEditText()));
        mViewBinding.loginPwd.getEditTextView().setOnFocusChangeListener((v, hasFocus) -> handleLoginPwdFocus(hasFocus));
    }

    private void handleLoginPwdFocus(boolean hasFocus) {
        if (hasFocus) {
            String phone = mViewBinding.loginPhone.getEditText();
            if (InputCheckUtils.checkPhone(phone)) {
                VerifyRegisterPhoneRequestBean requestBean = new VerifyRegisterPhoneRequestBean();
                requestBean.setPhone(phone);
                ApiManager.getSingleton().verifyRegisterPhone(requestBean, new BaseSubscriber(this, o -> {
                    VerifyRegisterPhoneResponseBean responseBean = (VerifyRegisterPhoneResponseBean) o;
                    if (!responseBean.getRegistered()) {
                        ToastUtils.show(getString(R.string.str_go_register));
                    }
                }, false));
            }
        }
    }

    private void handleBottomKeyLayout() {
        if (ScreenUtils.hasSoftKeys(this)) {
            mPageBinding.baseContainer.scrollTo(0, DensityUtils.dip2px(this, 10));
            LinearLayout.LayoutParams paramsOne = (LinearLayout.LayoutParams) mViewBinding.loginBtn.getLayoutParams();
            paramsOne.setMargins(DensityUtils.dip2px(this, 20), DensityUtils.dip2px(this, 46), DensityUtils.dip2px(this, 20), 0);
            mViewBinding.loginBtn.setLayoutParams(paramsOne);

            LinearLayout.LayoutParams paramsTwo = (LinearLayout.LayoutParams) mViewBinding.loginRegister.getLayoutParams();
            paramsTwo.setMargins(0, DensityUtils.dip2px(this, 18), 0, 0);
            mViewBinding.loginRegister.setLayoutParams(paramsTwo);
        }
    }

    @Override
    public boolean isShowExceptionView() {
        return false;
    }

    private void hideHeaderView() {
        mPageBinding.commonHeader.setVisibility(View.GONE);
    }

    @Override
    public void finishActivity() {
        finish();
    }
}
