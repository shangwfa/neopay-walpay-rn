package cn.neopay.walpay.android.constans;

/**
 * @author carlos.guo
 * @date 2017/9/21
 * @describe Walpay常量集合
 */

public interface IWalpayConstants {
    //---------------------------EnvironmentConfig---------------------//
    String HTTP_URL_KEY = "http_url";
    String BASE_HTTPURL_TEST = "http://139.224.11.160:8202/walpay-web/";
    String BASE_HTTPURL_DEVELOP = "http://139.224.11.160:8101/shopay-web/";
    String BASE_HTTPURL_PRODUCT = "https://shopay.neopay.cn/shopay-web/";
    String TEST_TAG = "0";
    String DEVELOP_TAG = "1";
    String PRODUCT_TAG = "2";
    String UNKNOWN_TAG = "3";
    String FLAVOR_TEST = "walpayTest";
    String FLAVOR_DEVELOP = "walpayDevelop";
    String FLAVOR_PRODUCT = "walpayProduct";
    //------------------------default omit  public final------------------------//
    String APPLICATION_LIKE_CLASSPATH = "cn.neopay.walpay.android.WalpayApplicationLike";

    //---------------------------bugly---------------------//
    String BUGLY_APP_ID_KEY = "bugly_app_id";
    String BUGLY_APP_KEY = "QAptDlnacS6aoUCd";
    String BUGLY_APP_ID_TEST = "e40cd56dbd";
    String BUGLY_APP_ID_DEVELOP = "f20050962c";
    String BUGLY_APP_ID_PRODUCT = "e40cd56dbd";

    //---------------------------sp---------------------//
    String USER_INFO = "user_info";
    String USER_INFO_AUTH = "user_info_auth";
    String IS_FIRST_INSTALL = "is_install_state";
    String IS_FIRST_CERTIFICATION = "is_certification_state";
    String ACCESS_TOKEN = "accessToken";

    //---------------------------time---------------------//
    int DELAY_TIME = 2000;

    //---------------------------routerPath---------------------//
    String TO_SPLASH_PAGE = "/appModule/SplashActivity";
    String TO_LOGIN_PAGE = "/appModule/LoginActivity";
    String TO_HOME_PAGE = "/appModule/HomeActivity";
    String TO_REGISTER_PAGE = "/appModule/RegisterActivity";
    String TO_FORGOTPWD_PAGE = "/appModule/ForgotPwdActivity";
    String TO_RN_PAGE = "/appModule/RNActivity";
    String TO_SIGNINWEB_PAGE = "/appModule/SignInWebActivity";
    String TO_SCAN_PAGE = "/appModule/ScanActivity";
    String TO_EXPLAIN_PAGE = "/appModule/ExplainActivity";
    String TO_PAYCODE_PAGE = "/appModule/PayCodeActivity";

    //---------------------------view---------------------//
    String COMMONINPUTVIEW_TYPE_DEFAULT = "default";
    String COMMONINPUTVIEW_TYPE_PHONE = "phone";
    String COMMONINPUTVIEW_TYPE_VERIFICATION_CODE = "verificationCode";
    String COMMONINPUTVIEW_TYPE_PASSWORD = "password";
    String COMMONINPUTVIEW_TYPE_PAYPWD = "payPwd";
    String COMMONINPUTVIEW_TYPE_NUM_AND_STR = "num_str";
    String COMMONINPUTVIEW_TYPE_PAY = "pay";
    String FORGOTPWD_TYPE_LOGIN = "forgotPwd_login";
    String FORGOTPWD_TYPE_PAY = "forgotPwd_pay";
    //---------------------------verification view code---------------------//
    int VERIFICATION_CODE_TYPE_REGISTER = 1;
    int VERIFICATION_CODE_TYPE_RESET_PWD = 2;
    int VERIFICATION_CODE_TYPE_RESET_PAY_PWD = 3;
    int VERIFICATION_CODE_TYPE_RESET_BIND_CARD = 4;
    //---------------------------activity、fragment---------------------//
    String HOME_TABTYPE_HOME = "homeFragment";
    String HOME_TABTYPE_SUNBEAMCOIN = "sunbeamCoinFragment";
    String HOME_TABTYPE_NEWS = "newsFragment";
    String HOME_TABTYPE_MINE = "mineFragment";
    String SELECTBANKPAY_BALANCE_TYPE = "balance_type";
    String SELECTBANKPAY_BANK_TYPE = "bank_type";

}
