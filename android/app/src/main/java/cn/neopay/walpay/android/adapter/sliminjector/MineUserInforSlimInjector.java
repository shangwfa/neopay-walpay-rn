package cn.neopay.walpay.android.adapter.sliminjector;

import android.view.View;
import android.widget.TextView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.utils.FormatUtils;
import com.xgjk.common.lib.utils.StringUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe MineUserInforSlimInjector 我的 用户信息item
 */

public class MineUserInforSlimInjector implements SlimInjector<UserInfoResponseBean> {
    @Override
    public void onInject(UserInfoResponseBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.background(R.id.user_sign_in, R.drawable.dd_add_image)
                .with(R.id.user_avatar_iv, view -> {
//                    GlideManager.loadNetImage((ImageView) view, StringUtils.authString(data.getAvatarUrl()));
                })
                .with(R.id.user_name, view -> setAuthStateShow(data, injector, (TextView) view))
                .with(R.id.real_name_certification_tv, view -> {
                    TextView realNameCertifivationTv = (TextView) view;
                    if (null == data.getAuthStatus()) {
                        return;
                    }
                    if (1 == data.getAuthStatus()) {//实名认证
                        realNameCertifivationTv.setVisibility(View.GONE);
                    }
                    if (2 == data.getAuthStatus()) {//未实名认证
                        view.setOnClickListener(v -> {
                            //TODO 进行 实名认证
                        });
                    }

                })
        ;
    }

    private void setAuthStateShow(UserInfoResponseBean data, IViewInjector injector, TextView view) {
        String nickName = StringUtils.authString(data.getNickName());
        String phone = StringUtils.authString(data.getPhone());
        String name = StringUtils.authString(data.getName());
        if (StringUtils.isEmpty(nickName)) {//未设置昵称
            view.setText(FormatUtils.phoneTuomin(phone));
            injector.visibility(R.id.user_phone, View.GONE);
        }
        if (StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {//未设置昵称且实名认证
            view.setText(FormatUtils.nameTuomin(data.getName()));
            injector.text(R.id.user_phone, FormatUtils.phoneTuomin(phone));
        }

        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {// 设置昵称且实名认证
            view.setText(FormatUtils.nameTuomin(nickName + "(" + name + ")"));
            injector.text(R.id.user_phone, FormatUtils.phoneTuomin(phone));

        }

        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 2 == data.getAuthStatus()) {//设置昵称未实名认证
            view.setText(FormatUtils.nameTuomin(nickName));
            injector.text(R.id.user_phone, FormatUtils.phoneTuomin(phone));

        }
    }
}
