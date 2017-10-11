//
//  XGQBRestPwdViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 27/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRestPwdViewController.h"
#import "XGQBLoginInputView.h"
#import "XGQBPureColorBtn.h"
#import "XGQBCountTimeBtn.h"

@interface XGQBRestPwdViewController ()
@property(nonatomic,strong)XGQBLoginInputView *userNameIV;
@property (nonatomic,strong)XGQBLoginInputView *pwdIV;
@property (nonatomic,strong)XGQBLoginInputView *regCodeIV;
@end

@implementation XGQBRestPwdViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = kWhiteColor;
    self.navigationController.navigationBarHidden = NO;
    self.title = @"重置登录密码";
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
    [ctBtn addTarget:self action:@selector(countTimeBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
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
    
    //确认按钮
    XGQBPureColorBtn *confirmBtn = [XGQBPureColorBtn buttonWithText:@"确认" andColor:[UIColor redColor]];
    [self.view addSubview:confirmBtn];
    [confirmBtn addTarget:self action:@selector(confirmBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
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
    
    [confirmBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(350, 51));
        make.centerX.equalTo(weakself.view);
        make.top.equalTo(pwdIV.mas_bottom).with.offset(54);
    }];
    
}

#pragma mark - 处理按钮点击
-(void)countTimeBtnClicked:(XGQBCountTimeBtn*)btn
{
    //检查手机号
    if ([self.userNameIV.textField.text checkMobile]) {
        //发送请求
        NSMutableDictionary *body = [[NSMutableDictionary alloc]init];
        body[@"phone"]=self.userNameIV.textField.text;
        
        [MemberCoreService sendResetLoginPasswordCode:body andSuccessFn:^(id responseAfter, id responseBefore) {
            //发送成功
            if ([[responseBefore objectForKey:@"retCode"]intValue] ==1) {
                [btn startCountDown];
            }
            
        } andFailerFn:^(NSError *error) {
            
        }];
        
    }else
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
    }
    
}

-(void)readPwdBtnClicked:(UIButton*)btn
{
    btn.selected =!btn.selected;
    self.pwdIV.textField.secureTextEntry = !btn.selected;
}
-(void)confirmBtnClicked:(UIButton*)btn
{
    NSMutableDictionary* body = [NSMutableDictionary dictionaryWithCapacity:0];
    [body setObject:self.userNameIV.textField.text forKey:@"phone"];
    [body setObject:self.pwdIV.textField.text forKey:@"password"];
    [body setObject:self.regCodeIV.textField.text forKey:@"smsCode"];
    
    //发送登录请求
    [MemberCoreService loginUser:body andSuccessFn:^(id responseAfter, id responseBefore) {
        if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
        {
            
        }
    } andFailerFn:^(NSError *error) {
        
        
    }];
    [self.navigationController popViewControllerAnimated:YES];

}


@end
