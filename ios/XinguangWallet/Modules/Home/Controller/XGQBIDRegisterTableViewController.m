//
//  XGQBIDRegisterTableViewController.m
//  XinguangWallet
//
//  Created by BossKing on 12/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBIDRegisterTableViewController.h"
#import "XGQBPureColorBtn.h"

@interface XGQBIDRegisterTableViewController ()

@property (nonatomic,strong)NSArray *itemNameArray;
@property(nonatomic,strong)NSArray *placeHolderArray;

@end

@implementation XGQBIDRegisterTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"实名认证";
    
    [self setUpHeaderAndFooterViews];
}

-(void)setUpHeaderAndFooterViews
{
    self.tableView.tableHeaderView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 10)];
    self.tableView.sectionFooterHeight = 10;
    self.tableView.sectionHeaderHeight = 0;
    
    UIView *tableFooterView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 200)];
    
    UILabel *additionalLabel = [[UILabel alloc]initWithFrame:CGRectMake(kScreenWidth*0.04, 0, kScreenWidth, 20)];
    additionalLabel.text = @"注:认证通过后,该账号关联的账户不可修改";
    additionalLabel.font = kSYSTEMFONT(12.0);
    additionalLabel.textColor = [UIColor colorWithHexString:@"666666"];
    
    XGQBPureColorBtn *confirmBtn = [XGQBPureColorBtn buttonWithText:@"确认" andColor:kRedColor];
    
    [tableFooterView addSubview:confirmBtn];
    [tableFooterView addSubview:additionalLabel];
    
    kWeakSelf(tableFooterView);
    
    [confirmBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth*0.9, 51));
        make.top.equalTo(weaktableFooterView).with.offset(80);
        make.centerX.equalTo(tableFooterView);
        
    }];
    
    self.tableView.tableFooterView = tableFooterView;

}

-(NSArray *)itemNameArray
{
    if (!_itemNameArray) {
        _itemNameArray = [NSArray arrayWithObjects:@"姓名",@"身份证号",@"卡号",@"开户银行",@"手机号",@"验证码", nil];
    }
    return _itemNameArray;
}

-(NSArray *)placeHolderArray
{
    if (!_placeHolderArray) {
        _placeHolderArray = [NSArray arrayWithObjects:@"请填写真实姓名",@"请填写身份证号",@"请填写银行卡号",@"开户银行",@"请输入手机号",@"请输入验证码", nil];
    }
    return _placeHolderArray;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 2;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (section ==0) {
        return 4;
    }else if(section==1){
        return 2;}
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    UITableViewCell *cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"test"];
    
    cell.backgroundColor = kWhiteColor;
    
    UILabel *itemName = [[UILabel alloc]initWithFrame:CGRectMake(kScreenWidth*0.04, 0, kScreenWidth*0.29, cell.contentView.frame.size.height)];
    itemName.text = self.itemNameArray[indexPath.section*4 +indexPath.row];
    itemName.textColor = [UIColor colorWithHexString:@"666666"];
    itemName.font = kSYSTEMFONT(14.0);
    
    UITextField *textField = [[UITextField alloc]initWithFrame:CGRectMake(kScreenWidth*0.29, 0, kScreenWidth*0.67, cell.contentView.frame.size.height)];
    textField.placeholder = self.placeHolderArray[indexPath.section*4+indexPath.row];
    textField.font = kSYSTEMFONT(14.0);
    
    [cell.contentView addSubview: itemName];
    [cell.contentView addSubview:textField];
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    return cell;
}

@end
