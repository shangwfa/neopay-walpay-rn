//
//  XGQBRegisterViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 27/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRegisterViewController.h"
#import "XGQBLoginInputView.h"
#import "XGQBPureColorBtn.h"
#import "XGQBCountTimeBtn.h"

@interface XGQBRegisterViewController ()
@property (nonatomic,strong)XGQBLoginInputView *userNameIV;
@property (nonatomic,strong)XGQBLoginInputView *regCodeIV;

@property (nonatomic,strong)XGQBLoginInputView *pwdIV;
@property (nonatomic,strong)XGQBLoginInputView *paypwdIV;


@end

@implementation XGQBRegisterViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = kWhiteColor;
    self.navigationController.navigationBarHidden = NO;
    self.title = @"注册";
    [self setUpViewComponents];
}
-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
}

#pragma mark - 设置视图组件
-(void)setUpViewComponents
{
    //手机号输入框
    XGQBLoginInputView *userNameIV = [XGQBLoginInputView inputViewWithLeftImage:[UIImage imageNamed:@"dl_shouji1"] placeHolder:@"请输入手机号" rightBtn:nil];
    _userNameIV = userNameIV;
    userNameIV.textField.keyboardType = UIKeyboardTypeNumberPad;
    [self.view addSubview:userNameIV];
    
    //验证码输入框
    XGQBCountTimeBtn *ctBtn = [XGQBCountTimeBtn new];
    [ctBtn addTarget:self action:@selector(regCodeBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    XGQBLoginInputView *regCodeIV = [XGQBLoginInputView inputViewWithLeftImage:[UIImage imageNamed:@"dl_yanzhengma"] placeHolder:@"请输入验证码" rightBtn:ctBtn];
    _regCodeIV = regCodeIV;
    regCodeIV.textField.keyboardType = UIKeyboardTypeNumberPad;
    [self.view addSubview:regCodeIV];
    
    //设置密码框
    UIButton *readPwdBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_yanjing"] forState:UIControlStateNormal];
    [readPwdBtn setImage:[UIImage imageNamed:@"dl_zhengyan"] forState:UIControlStateSelected];
    [readPwdBtn addTarget:self action:@selector(readPwdBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    readPwdBtn.selected = NO;
    XGQBLoginInputView *pwdIV = [XGQBLoginInputView inputViewWithLeftImage:[UIImage imageNamed:@"dl_mima1"] placeHolder:@"设置登录密码，6-18位字母加数字" rightBtn:readPwdBtn];
    _pwdIV = pwdIV;
    pwdIV.textField.secureTextEntry = YES;
    [self.view addSubview:pwdIV];
    
    //设置支付密码框
    UIButton *readPayPwdBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [readPayPwdBtn setImage:[UIImage imageNamed:@"dl_yanjing"] forState:UIControlStateNormal];
    [readPayPwdBtn setImage:[UIImage imageNamed:@"dl_zhengyan"] forState:UIControlStateSelected];
    
    [readPayPwdBtn addTarget:self action:@selector(readPayPwdBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    readPayPwdBtn.selected = NO;
    XGQBLoginInputView *paypwdIV = [XGQBLoginInputView inputViewWithLeftImage:[UIImage imageNamed:@"dl_zhifumima1"] placeHolder:@"设置支付密码，6位数字" rightBtn:readPayPwdBtn];
    _paypwdIV = paypwdIV;
    paypwdIV.textField.keyboardType = UIKeyboardTypeNumberPad;
    paypwdIV.textField.secureTextEntry = YES;
    [self.view addSubview:paypwdIV];
    
    //注册按钮
    XGQBPureColorBtn *regBtn = [XGQBPureColorBtn buttonWithText:@"注册" andColor:[UIColor redColor]];
    [self.view addSubview:regBtn];
    [regBtn addTarget:self action:@selector(registerBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    kWeakSelf(self);
    //设置约束
    [userNameIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.width.mas_equalTo(kScreenSize.width*0.9);
        make.height.mas_equalTo(40);
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(weakself.view).with.offset(94);
    }];
    [regCodeIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(userNameIV);
        make.centerX.equalTo(weakself.view);
        make.bottom.equalTo(userNameIV.mas_bottom).with.offset(54);
    }];
    
    [pwdIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(userNameIV);
        make.centerX.equalTo(weakself.view);
        make.bottom.equalTo(regCodeIV.mas_bottom).with.offset(54);
    }];
    
    [paypwdIV mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.equalTo(userNameIV);
        make.centerX.equalTo(weakself.view);
        make.bottom.equalTo(pwdIV.mas_bottom).with.offset(54);
    }];
    
    [regBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(350, 51));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(paypwdIV.mas_bottom).with.offset(54);
    }];
    
}

#pragma mark - 处理按钮点击
//显示登录密码
-(void)readPwdBtnClicked:(UIButton*)btn
{
    btn.selected =!btn.selected;
    self.pwdIV.textField.secureTextEntry = !btn.selected;
}
//显示支付密码
-(void)readPayPwdBtnClicked:(UIButton*)btn
{
    btn.selected =!btn.selected;
    self.paypwdIV.textField.secureTextEntry = !btn.selected;
}
//注册按钮点击
-(void)registerBtnClicked:(UIButton*)btn
{
//    phone    String    必填    手机号    必须是手机号
//    smsCode    String    必填    短信验证码    长度必须是6
//    password    String    必填    登录密码    最小长度8 最大长度16
//    payPassword    String    必填    支付密码    长度必须是6
    
    NSMutableDictionary* body = [NSMutableDictionary dictionaryWithCapacity:0];
    [body setObject:self.userNameIV.textField.text forKey:@"phone"];
    [body setObject:self.pwdIV.textField.text forKey:@"password"];
    [body setObject:self.regCodeIV.textField.text forKey:@"smsCode"];
    [body setObject:self.paypwdIV.textField.text forKey:@"payPassword"];
    
    //发送登录请求
    [MemberCoreService registerUser:body andSuccessFn:^(id responseAfter, id responseBefore) {
        if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
        {
            
        }
    } andFailerFn:^(NSError *error) {
        nil;
    }];
}
//获取验证码按钮点击
-(void)regCodeBtnClicked:(XGQBCountTimeBtn*)btn
{
    if ([self.userNameIV.textField.text checkMobile]) {
        
        [SVProgressHUD show];
        btn.userInteractionEnabled=NO;
        //发送请求
        NSMutableDictionary *body = [[NSMutableDictionary alloc]init];
        body[@"phone"]=self.userNameIV.textField.text;
        
        [MemberCoreService sendRegisterCode:body andSuccessFn:^(id responseAfter, id responseBefore) {
            NSLog(@"retCodeis:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
             {
                 [btn startCountDown];
                 [SVProgressHUD dismiss];
             }
        } andFailerFn:^(NSError *error) {
            btn.userInteractionEnabled=YES;
            [SVProgressHUD showInfoWithStatus:@"登陆错误"];
        }];
        
    }else
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
    }
}

@end
