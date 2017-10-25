//
//  XGQBRegResetPwdTVC.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRegResetPwdTVController.h"

#import "XGQBRegRestPwdTVCell.h"
#import "XGQBPureColorBtn.h"

@interface XGQBRegResetPwdTVController ()

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
    
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithText:btnName andColor:[UIColor colorWithHexString:@"F34646"]];
    [footerView addSubview:btn];
    
    [btn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.9, 51));
        make.centerX.equalTo(footerView);
        make.top.equalTo(footerView).with.offset(50);
    }];
    
    [btn addTarget:self action:@selector(comfirmBtnClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    self.tableView.tableFooterView = footerView;
    
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
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
    
    if([_loginPwdTextField.text isEqualToString:@""])
    {
        [SVProgressHUD showInfoWithStatus:@"密码不能为空"];
        return;
    }else if (![_loginPwdTextField.text checkPassword])
    {
        [SVProgressHUD showInfoWithStatus:@"请输入6至20位字母加数字"];
        return;
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
    if (self.type == XGQBRegResetPwdTVConTypeRegister) {
        //发送注册请求
        [MemberCoreService registerUser:body andSuccessFn:^(id responseAfter, id responseBefore) {
            NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
            [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
                //            NSLog(@"responseBefore:%@",responseBefore);
            {
                [SVProgressHUD showSuccessWithStatus:@"注册成功"];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    else if(self.type == XGQBRegResetPwdTVConTypeResetLoginPwd){
        [MemberCoreService resetLoginPassword:body andSuccessFn:^(id responseAfter, id responseBefore) {
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
                //            NSLog(@"responseBefore:%@",responseBefore);
            {
                [SVProgressHUD showSuccessWithStatus:@"重置密码成功"];
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
            NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
            [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
            if([[responseBefore objectForKey:@"retCode"] intValue] == 1)
            {
                [SVProgressHUD showSuccessWithStatus:@"验证码发送成功"];
                [btn startCountDown];
            }
        } andFailerFn:^(NSError *error) {
            
        }];
    }
    //重置登录密码页面获取验证码
    else if(self.type == XGQBRegResetPwdTVConTypeResetLoginPwd){
        [MemberCoreService sendResetLoginPasswordCode:body andSuccessFn:^(id responseAfter, id responseBefore) {
            NSLog(@"successWithRetCode:%d",[[responseBefore objectForKey:@"retCode"] intValue]);
            [responseBefore writeToFile:@"/Users/bossking/Desktop/responseBefore.plist" atomically:YES];
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
      XGQBRegRestPwdTVCell*cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePhoneNo];
        _phoneNoTextField = cell.textField;
        return cell;
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




@end