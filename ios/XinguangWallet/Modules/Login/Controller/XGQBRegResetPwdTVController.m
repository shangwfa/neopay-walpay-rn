//
//  XGQBRegResetPwdTVC.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRegResetPwdTVController.h"

#import "XGQBAccountExistAlertViewController.h"
#import "XGQBIDAlertTransiton.h"

#import "XGQBRegRestPwdTVCell.h"
#import "XGQBPureColorBtn.h"

#import "XGQBLoginViewController.h"

#import "XGQBAccountExistAlertView.h"

@interface XGQBRegResetPwdTVController ()<UIViewControllerTransitioningDelegate,XGQBAccountExistAlertViewDelegate>

@property (nonatomic,strong) XGQBTextField *phoneNoTextField;
@property (nonatomic,strong) XGQBTextField *regCodeTextField;
@property (nonatomic,strong) XGQBTextField *payPwdTextField;
@property (nonatomic,strong) XGQBTextField *loginPwdTextField;
@property (nonatomic,strong) XGQBTextField *idNoTextField;

@end

@implementation XGQBRegResetPwdTVController

#pragma mark - 工厂方法
+(instancetype)tableVCWithType:(XGQBRegResetPwdTVConType)type
{
    XGQBRegResetPwdTVController *tVC = [XGQBRegResetPwdTVController new];
    
    tVC.type = type;
    tVC.tableView.rowHeight = 54;
    
    return tVC;
}

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    return [super initWithStyle:UITableViewStylePlain];
}



#pragma mark - VC生命周期
- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    NSString *btnName = [NSString stringWithFormat:@"确认"];
    
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    switch (self.type) {
        case XGQBRegResetPwdTVConTypeRegister:
            self.title = @"注册";
            btnName = @"注册";
            break;
        case XGQBRegResetPwdTVConTypeResetLoginPwd:
            self.title = @"重置登录密码";
            break;
        case XGQBRegResetPwdTVConTypeResetPayPwdNoID:
            self.title = @"重置支付密码";
            break;
        case XGQBRegResetPwdTVConTypeResetPayPwdWithID:
            self.title = @"重置支付密码";
            break;
        default:
            break;
    }
    
    UIView *footerView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 200)];
    
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithText:btnName andColor:kButtonColor];
    [footerView addSubview:btn];
    
    [btn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.9, 51));
        make.centerX.equalTo(footerView);
        make.top.equalTo(footerView).with.offset(50);
    }];
    
    [btn addTarget:self action:@selector(comfirmBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    self.tableView.tableFooterView = footerView;
    [kNotificationCenter addObserver:self selector:@selector(alertAccountExist) name:kNotificationPhoneNoAlreadyExist object:nil];
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;

}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    //判断是否需要传手机号回登录界面
    if ([self.navigationController.viewControllers[0] isKindOfClass:[XGQBLoginViewController class]]) {
        XGQBLoginViewController *loginVC = self.navigationController.viewControllers[0];
        loginVC.userName = _phoneNoTextField.text;
    }
}

#pragma mark - 处理按钮点击
-(void)comfirmBtnClicked:(XGQBPureColorBtn*)btn
{
    [self.view endEditing:YES];
    
    //判断手机号跟密码格式是否正确
    if([_phoneNoTextField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"手机号不能为空"];
        return;
    }else if (![_phoneNoTextField.text checkMobile])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
        return;
    }
    
    //判断验证码
    if([_regCodeTextField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"验证码不能为空"];
        return;
    }else if (![_regCodeTextField.text checkRegCode])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确验证码"];
        return;
    }
    
    //判断身份证号
    if(self.type == XGQBRegResetPwdTVConTypeResetPayPwdWithID){
        //判断登录密码
        if([_idNoTextField.text isEqualToString:@""])
        {
            [SVProgressHUD showInfoWithStatus:@"身份证号不能为空"];
            return;
        }else if (![_idNoTextField.text simpleVerifyIdentityCardNum])
        {
            [SVProgressHUD showInfoWithStatus:@"请输入正确身份证号"];
            return;
        }
        
    }
    
    if(self.type == XGQBRegResetPwdTVConTypeRegister||self.type==XGQBRegResetPwdTVConTypeResetLoginPwd){
        //判断登录密码
        if([_loginPwdTextField.text isEqualToString:@""])
        {
            [SVProgressHUD showInfoWithStatus:@"登录密码不能为空"];
            return;
        }else if (![_loginPwdTextField.text checkPassword])
        {
            [SVProgressHUD showInfoWithStatus:@"登录密码为6至18位字母加数字"];
            return;
        }
        
    }
    
    if (self.type==XGQBRegResetPwdTVConTypeRegister||self.type==XGQBRegResetPwdTVConTypeResetPayPwdNoID||
        self.type==XGQBRegResetPwdTVConTypeResetPayPwdWithID) {
        //判断支付密码
        if([_payPwdTextField.text isEqualToString:@""])
        {
            [SVProgressHUD showInfoWithStatus:@"支付密码不能为空"];
            return;
        }else if (![_payPwdTextField.text checkPayPassword])
        {
            [SVProgressHUD showInfoWithStatus:@"支付密码为6位数字"];
            return;
        }
    }
   
 
    NSMutableDictionary* body = [NSMutableDictionary dictionaryWithCapacity:0];
    if (_phoneNoTextField.text) {
        [body setObject:_phoneNoTextField.text forKey:@"phone"];
    }
    if (_regCodeTextField.text) {
        [body setObject:_regCodeTextField.text forKey:@"smsCode"];
    }
    if (_loginPwdTextField.text) {
        [body setObject:_loginPwdTextField.text forKey:@"password"];
    }
    if (_payPwdTextField.text) {
        [body setObject:_payPwdTextField.text forKey:@"payPassword"];
    }
    if (_idNoTextField.text) {
        [body setObject:_idNoTextField.text forKey:@"certNo"];
    }
  
    if (self.type == XGQBRegResetPwdTVConTypeRegister) {
        //发送注册请求
        [MemberCoreService registerUser:body andSuccessFn:^(id responseAfter, id responseBefore) {

            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"注册成功"];
                [self.navigationController popViewControllerAnimated:YES];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    //发送重置登录密码请求
    else if(self.type == XGQBRegResetPwdTVConTypeResetLoginPwd){
        [MemberCoreService resetLoginPassword:body andSuccessFn:^(id responseAfter, id responseBefore) {
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"重置密码成功"];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    //发送重置支付密码请求
    else if(self.type == XGQBRegResetPwdTVConTypeResetPayPwdWithID ||self.type == XGQBRegResetPwdTVConTypeResetPayPwdNoID)
    {
        if ([GVUserDefaults standardUserDefaults].accessToken) {
            [body setObject:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
        }
        [MemberCoreService resetPayPassword:body andSuccessFn:^(id responseAfter, id responseBefore) {
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
                //            NSLog(@"responseBefore:%@",responseBefore);
            {
                [SVProgressHUD showSuccessWithStatus:@"重置支付密码成功"];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
        
    }

}

-(void)countTimeBtnClicked:(XGQBCountTimeBtn*)btn
{
    //判断手机号跟密码格式是否正确
    if([_phoneNoTextField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"手机号不能为空"];
        return;
    }else if (![_phoneNoTextField.text checkMobile])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入正确手机号"];
        return;
    }
    
    NSMutableDictionary* body = [NSMutableDictionary dictionaryWithCapacity:0];
    [body setObject:_phoneNoTextField.text forKey:@"phone"];

    //注册页面获取验证码
    if (self.type == XGQBRegResetPwdTVConTypeRegister) {
        [MemberCoreService sendRegisterCode:body andSuccessFn:^(id responseAfter, id responseBefore) {

            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"验证码已发送，请注意查收"];
                [btn startCountDown];
            }else if ([[responseBefore objectForKey:@"retCode"] intValue] == 2)
            {
                [self alertAccountExist];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    //重置登录密码页面获取验证码
    else if(self.type == XGQBRegResetPwdTVConTypeResetLoginPwd){
        [MemberCoreService sendResetLoginPasswordCode:body andSuccessFn:^(id responseAfter, id responseBefore) {
//            NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
            [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"验证码发送成功"];
                [btn startCountDown];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    else if(self.type == XGQBRegResetPwdTVConTypeResetPayPwdNoID||self.type == XGQBRegResetPwdTVConTypeResetPayPwdWithID){
        [MemberCoreService sendResetPayPasswordCode:body andSuccessFn:^(id responseAfter, id responseBefore) {
//            NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
//            [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"验证码发送成功"];
                [btn startCountDown];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }

    
}

#pragma mark - Table view data source
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    switch (self.type) {
        case XGQBRegResetPwdTVConTypeRegister:
            return 4;
        case XGQBRegResetPwdTVConTypeResetLoginPwd:
            return 3;
        case XGQBRegResetPwdTVConTypeResetPayPwdNoID:
            return 3;
        case XGQBRegResetPwdTVConTypeResetPayPwdWithID:
            return 4;
        default:
            return 0;
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (indexPath.section==0&&indexPath.row==0) {
        //第一行手机号
        if(self.type ==XGQBRegResetPwdTVConTypeRegister){//注册页面
            XGQBRegRestPwdTVCell*cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegRestPwdTVCellTypeRegPhoneNo];
            _phoneNoTextField = cell.textField;
            //判断是否有手机号输入信息,将其输入
            if (_userName) {
                _phoneNoTextField.text = _userName;
            }
            return cell;
        }else{//其他页面
            XGQBRegRestPwdTVCell*cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePhoneNo];
            _phoneNoTextField = cell.textField;
            //判断是否有手机号输入信息,将其输入
            if (_userName) {
                _phoneNoTextField.text = _userName;
            }
            //判断是否已经缓存用户手机号
            if([GVUserDefaults standardUserDefaults].phone){
                _phoneNoTextField.text=[GVUserDefaults standardUserDefaults].phone;
                _phoneNoTextField.enabled=NO;
            }
            return cell;
        }

    }else if (indexPath.section==0&&indexPath.row==1) {
        //第二行验证码
       XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeRegCode];
        [cell.countTimeBtn addTarget:self action:@selector(countTimeBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
        _regCodeTextField = cell.textField;
        return cell;
    }else if (indexPath.section==0&&indexPath.row==2) {
        //第三行
        if (self.type == XGQBRegResetPwdTVConTypeRegister) {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeLoginPwd];
            _loginPwdTextField = cell.textField;
            return cell;
        }else if(self.type ==XGQBRegResetPwdTVConTypeResetLoginPwd){
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeLoginPwd];
            _loginPwdTextField = cell.textField;
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdWithID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeIDNo];
            _idNoTextField = cell.textField;
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdNoID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
            _payPwdTextField = cell.textField;
            return cell;
        }else{
            return nil;
        }
    }else if (indexPath.section==0&&indexPath.row==3) {
        //第四行
        if (self.type == XGQBRegResetPwdTVConTypeRegister) {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
            _payPwdTextField = cell.textField;
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdWithID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
            _payPwdTextField = cell.textField;
            return cell;
        }else{
            return nil;
        }
    }else{
        return nil;
    }
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
}


#pragma mark - 手机号存在弹窗
-(void)alertAccountExist
{
        XGQBAccountExistAlertViewController *alertVC = [XGQBAccountExistAlertViewController new];
    
        alertVC.alertviewDelegate = self;

        alertVC.transitioningDelegate = self;
        
        alertVC.modalPresentationStyle = UIModalPresentationCustom;
        
        [self presentViewController:alertVC animated:YES completion:nil];
}
//transition代理方法
- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source
{
    return [[XGQBIDAlertTransiton alloc] init];
}

- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed
{
    return [[XGQBIDAlertTransiton alloc] init];
}


#pragma mark - 手机号存在弹窗代理
-(void)accountExistAlertView:(XGQBAccountExistAlertView *)alertView btnClicked:(UIButton *)btn
{
    
    if ([btn.titleLabel.text isEqualToString:@"忘记密码"]) {
        [self dismissViewControllerAnimated:YES completion:nil];
        [self.navigationController popViewControllerAnimated:YES];
        
        XGQBRegResetPwdTVController *restPwdVC = [XGQBRegResetPwdTVController tableVCWithType:XGQBRegResetPwdTVConTypeResetLoginPwd];
        restPwdVC.userName = _phoneNoTextField.text;
        [self.navigationController pushViewController:restPwdVC animated:YES];
        
    }else if ([btn.titleLabel.text isEqualToString:@"去登陆"]){
        [self dismissViewControllerAnimated:YES completion:nil];
        [self.navigationController popViewControllerAnimated:YES];
    }
    
}





@end
