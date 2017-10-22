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

@end

@implementation XGQBRegResetPwdTVController

+(instancetype)tableVCWithType:(XGQBRegResetPwdTVConType)type
{
    XGQBRegResetPwdTVController *tVC = [XGQBRegResetPwdTVController new];
    
    tVC.type = type;
    tVC.tableView.rowHeight = 54;
    
    return tVC;
}

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    switch (self.type) {
        case XGQBRegResetPwdTVConTypeRegister:
            self.title = @"注册";
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
    
    XGQBPureColorBtn *btn = [XGQBPureColorBtn buttonWithText:@"确认" andColor:[UIColor colorWithHexString:@"F34646"]];
    [footerView addSubview:btn];
    
    [btn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.9, 51));
        make.centerX.equalTo(footerView);
        make.top.equalTo(footerView).with.offset(50);
    }];
    
    self.tableView.tableFooterView = footerView;
    
}


-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
}

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    return [super initWithStyle:UITableViewStylePlain];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
        return cell;
    }else if (indexPath.section==0&&indexPath.row==1) {
        //第二行验证码
       XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeRegCode];
        return cell;
    }else if (indexPath.section==0&&indexPath.row==2) {
        //第三行
        if (self.type == XGQBRegResetPwdTVConTypeRegister) {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeLoginPwd];
            return cell;
        }else if(self.type ==XGQBRegResetPwdTVConTypeResetLoginPwd){
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeLoginPwd];
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdWithID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypeIDNo];
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdNoID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
            return cell;
        }else{
            return nil;
        }
    }else if (indexPath.section==0&&indexPath.row==3) {
        //第四行
        if (self.type == XGQBRegResetPwdTVConTypeRegister) {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
            return cell;
        }else if (self.type ==XGQBRegResetPwdTVConTypeResetPayPwdWithID)
        {
            XGQBRegRestPwdTVCell *cell = [XGQBRegRestPwdTVCell cellWithType:XGQBRegResetPwdTVCellTypePayPwd];
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
