//
//  XGQBLoginViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 26/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBLoginViewController.h"
#import "XGQBRootNavigationController.h"

#import "XGQBPureColorBtn.h"
#import "XGQBLoginInputView.h"

#import "XGQBRegResetPwdTVController.h"

@interface XGQBLoginViewController () <UITextFieldDelegate>
@property (nonatomic,strong) XGQBLoginInputView *userNameIV;
@property (nonatomic,strong) XGQBLoginInputView *pwdIV;
@property (nonatomic,strong) XGQBPureColorBtn *loginBtn;
@end

@implementation XGQBLoginViewController

#pragma mark - viewcontroller生命周期
- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    [self setUpViewComponents];
    
    ///设置键盘不挡住登录按钮
    [IQKeyboardManager sharedManager].keyboardDistanceFromTextField = 180;
    
}

-(void)viewWillAppear:(BOOL)animated
{
    
    [super viewWillAppear:animated];
    //隐藏navigationBar
    self.navigationController.navigationBarHidden = YES;
    if (_userName) {
        self.userNameIV.textField.text=_userName;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - 设置view组件
-(void)setUpViewComponents
{
    self.view.backgroundColor = kWhiteColor;
    
    kWeakSelf(self);
    
    //背景
    UIImageView *backgroundImageV = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"dl_beijing"]];
    [self.view addSubview:backgroundImageV];
//    backgroundImageV.backgroundColor = [UIColor blueColor];
    [backgroundImageV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.width.mas_equalTo(weakself.view.width);
        make.height.mas_equalTo(weakself.view.width*0.7);
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];
    

    //logo
    UIImageView *logoImage = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"dl_logo"]];
    logoImage.alpha = 0;
    [self.view addSubview:logoImage];

    [logoImage mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(162/2.0*kScreenWidth/375.0, 217/2.0*kScreenWidth/375.0));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(weakself.view).with.offset(kScreenHeight*0.13);
    }];
    
    //添加渐隐效果
    [UIView animateWithDuration:2.0 animations:^{
        logoImage.alpha = 1.0;
    }];
    
    //userNameIV
    XGQBLoginInputView *userNameIV = [XGQBLoginInputView viewWithLeftImage:@"dl_shouji" placeHolder:@"请输入手机号" rightBtn:nil];
    userNameIV.textField.type = XGQBTextFieldTypePhoneNo;
    self.userNameIV = userNameIV;
    [self.view addSubview:userNameIV];
    userNameIV.textField.keyboardType = UIKeyboardTypeNumberPad;
    
    [_userNameIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.width.mas_equalTo(kScreenSize.width*0.9);
        make.height.mas_equalTo(40);
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(backgroundImageV.mas_bottom).with.offset(kScreenHeight*0.1);
    }];
    
    //pwdIV
    UIButton *readPwdBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_yanjing"] forState:UIControlStateNormal];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_zhengyan"] forState:UIControlStateSelected];

    [readPwdBtn addTarget:self action:@selector(readPwdBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    readPwdBtn.selected = NO;
    
    
    XGQBLoginInputView *pwdIV = [XGQBLoginInputView viewWithLeftImage:@"dl_mima" placeHolder:@"请输入登录密码" rightBtn:readPwdBtn];
    pwdIV.textField.type = XGQBTextFieldTypeLoginPassword;
    pwdIV.textField.returnKeyType = UIReturnKeyDefault;
    self.pwdIV = pwdIV;
    pwdIV.textField.secureTextEntry = YES;
    [self.view addSubview:pwdIV];
    
    [_pwdIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(_userNameIV);
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(_userNameIV.mas_top).with.offset(kScreenHeight*0.1);
    }];
    
    //登录按钮
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithText:@"登录" andColor:kButtonColor];
    self.loginBtn = btn;
    
    [self.view addSubview:btn];
    [btn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.93, 51));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(pwdIV.mas_bottom).with.offset(kScreenHeight*0.1);
    }];
    [btn addTarget:self action:@selector(loginBtnClicked) forControlEvents:UIControlEventTouchUpInside];
   
    //登录按钮下方中间分割线
    UIView *sepLine = [UIView new];
    sepLine.backgroundColor = [UIColor grayColor];
    [self.view addSubview:sepLine];
    [sepLine mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(1, 12));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(btn.mas_bottom).with.offset(kScreenHeight*0.03);
    }];
    
    //忘记密码
    UIButton *restPwdBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [restPwdBtn setTitle:@"忘记密码" forState:UIControlStateNormal];
    restPwdBtn.titleLabel.font = [UIFont systemFontOfSize:13.0];
    [restPwdBtn addTarget:self action:@selector(resetPwdButtonClicked) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:restPwdBtn];
    [restPwdBtn setTitleColor:[UIColor colorWithHexString:@"888888"] forState:UIControlStateNormal];
    [restPwdBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(60, 20));
        make.right.equalTo(sepLine.mas_left).with.offset(-2);
        make.centerY.equalTo(sepLine);
    }];
    
    //立即注册
    UIButton *registerBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [registerBtn setTitle:@"立即注册" forState:UIControlStateNormal];
    registerBtn.titleLabel.font = [UIFont systemFontOfSize:13.0];
    [self.view addSubview:registerBtn];
    [registerBtn setTitleColor:[UIColor colorWithHexString:@"E83042"] forState:UIControlStateNormal];

    [registerBtn addTarget:self action:@selector(registerButtonClicked) forControlEvents:UIControlEventTouchUpInside];
    [registerBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(restPwdBtn);
        make.centerY.equalTo(sepLine);
        make.left.equalTo(sepLine.mas_right).with.offset(2);
    }];

    
    //跳过按钮
    XGQBPureColorBtn *skipBtn = [XGQBPureColorBtn buttonWithText:@"skip" andColor:kButtonColor];
    [self.view addSubview:skipBtn];
    [skipBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.4, 20));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(btn.mas_bottom).with.offset(kScreenHeight*0.1);
    }];
    [skipBtn addTarget:self action:@selector(skipButtonClicked) forControlEvents:UIControlEventTouchUpInside];

}

#pragma mark - 按钮点击方法
-(void)readPwdBtnClicked:(UIButton*)btn
{
    btn.selected =!btn.selected;
    self.pwdIV.textField.secureTextEntry = !btn.selected;
}
-(void)skipButtonClicked
{
    kPostNotification(kNotificationLoginStateChange, @YES)
}
///注册按钮点击
-(void)registerButtonClicked
{
    
    XGQBRegResetPwdTVController *regVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeRegister];
    regVC.userName = self.userNameIV.textField.text;

    [self.navigationController pushViewController:regVC animated:YES];
}

///忘记密码按钮点击
-(void)resetPwdButtonClicked
{
    XGQBRegResetPwdTVController *resetVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetLoginPwd];
    resetVC.userName = self.userNameIV.textField.text;
    
    [self.navigationController pushViewController:resetVC animated:YES];
}

-(void)loginBtnClicked
{
    [self.view endEditing:YES];
    
    //判断手机号跟密码格式是否正确
    if([self.userNameIV.textField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"手机号不能为空"];
        return;
    }else if (![self.userNameIV.textField.text checkMobile])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
        return;
    }
    
    if([self.pwdIV.textField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"密码不能为空"];
        return;
    }else if (![self.pwdIV.textField.text checkPassword])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入6至20位字母加数字"];
        return;
    }
    
    NSMutableDictionary* body = [NSMutableDictionary dictionaryWithCapacity:0];
    [body setObject:self.userNameIV.textField.text forKey:@"phone"];
    [body setObject:self.pwdIV.textField.text forKey:@"password"];
//    [body setObject:@(2) forKey:@"loginTerminalType"];
    
    //发送登录请求
    [MemberCoreService loginUser:body andSuccessFn:^(id responseAfter, id responseBefore) {
        NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
        [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
        if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
//            NSLog(@"responseBefore:%@",responseBefore);
        {
            [GVUserDefaults standardUserDefaults].accessToken = [responseAfter objectForKey:@"accessToken"];
  
            //发送登录成功通知
            kPostNotification(kNotificationLoginStateChange, @YES);
            
        }
        
    } andFailerFn:^(NSError *error) {

    
    }];
}

#pragma mark - 处理键盘
-(BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [self.view endEditing:YES];
    [self loginBtnClicked];
    return YES;
}


@end
