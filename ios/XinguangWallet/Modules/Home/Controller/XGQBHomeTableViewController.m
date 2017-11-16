//
//  XGQBHomeTableViewController.m
//  XinguangWallet
//
//  Created by BossKing on 15/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTableViewController.h"
#import "XGQBRNViewController.h"

#import "XGQBCommMessTVC.h"
#import "XGQBActiMessTVC.h"

#import "XGQBNoContentViewController.h"
#import "XGQBNetworkFailureViewController.h"

#import "XGQBHomeCellView.h"
#import "XGQBHomeBannerView.h"
#import "XGQBHomeCellBtn.h"

@interface XGQBHomeTableViewController () <XGQBHomeCellViewDelegate>
@property (nonatomic,strong) NSMutableArray *messArr;

@end

@implementation XGQBHomeTableViewController

#pragma mark - Table view data source

-(NSMutableArray*)messArr
{
    if (!_messArr) {
        
        _messArr = [NSMutableArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"mess" ofType:@"plist"]];
    }
    return _messArr;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
//    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    self.clearsSelectionOnViewWillAppear = NO;
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    XGQBHomeCellView *homeCellView = [[XGQBHomeCellView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, 219)];
    homeCellView.delegate = self;
    
    XGQBHomeBannerView *homeBannerView = [[XGQBHomeBannerView alloc]initWithFrame:CGRectMake(0, 229, kScreenWidth, 209)];
    
    self.tableView.tableHeaderView = homeCellView;
    self.tableView.tableFooterView = homeBannerView;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
//    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;
//    self.navigationController.navigationBarHidden = NO;
    
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    if (section==0) {
        return 10;
    }
    return 10;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.messArr.count;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary *messDict = self.messArr[indexPath.row];
    
    if ([messDict[@"type"]containsString:@"Mess"]) {
        return (79+8);
    }
    else{
        return (218*kScreenWidth/375.0+8);
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary *messDict = self.messArr[indexPath.row];
    
    if ([messDict[@"type"]isEqualToString:@"shopMess"]) {
        
        UITableViewCell *cell=[XGQBCommMessTVC messTableViewCellWithType:XGQBCommMessTypeShopAd timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
        
    }
    else if([messDict[@"type"]isEqualToString:@"mobileMess"]){
        
        UITableViewCell *cell=[XGQBCommMessTVC messTableViewCellWithType:XGQBCommMessTypeCellPhone timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    else if([messDict[@"type"]isEqualToString:@"shopAct"]){
        
        UITableViewCell *cell=[XGQBActiMessTVC actiTableViewCellWithType:XGQBActiMessTypeShop timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    else if([messDict[@"type"]isEqualToString:@"redPacketAct"]){
        
        UITableViewCell *cell=[XGQBActiMessTVC actiTableViewCellWithType:XGQBActiMessTypeRedPocket timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    else if([messDict[@"type"]isEqualToString:@"systemMess"]){
        
        UITableViewCell *cell=[XGQBCommMessTVC messTableViewCellWithType:XGQBCommMessTypeSystem timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    else if([messDict[@"type"]isEqualToString:@"systemAct"]){
        
        UITableViewCell *cell=[XGQBActiMessTVC actiTableViewCellWithType:XGQBActiMessTypeSystem timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    else if([messDict[@"type"]isEqualToString:@"payMess"]){
        
        UITableViewCell *cell=[XGQBCommMessTVC messTableViewCellWithType:XGQBCommMessTypePayment timeLabel:@"06/06 00:00"];
        
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        
        return cell;
    }
    return nil;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSDictionary *messDict = self.messArr[indexPath.row];
    
    if ([messDict[@"type"]isEqualToString:@"payMess"]) {
        XGQBRNViewController *RNVC = [[XGQBRNViewController alloc]init];
        RNVC.pageType = @"payMessage";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }
    else if([messDict[@"type"]isEqualToString:@"mobileMess"])
    {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"topupMsgList";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }else if([messDict[@"type"]isEqualToString:@"redPacketAct"])
    {
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"redList";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }
    
    else if (arc4random()%2) {
        XGQBNoContentViewController *noContentVC = [XGQBNoContentViewController new];
        [self.view.superview.viewController.navigationController pushViewController:noContentVC animated:YES];
    }else{
        XGQBNetworkFailureViewController *netWorkFailVC = [XGQBNetworkFailureViewController new];
        [self.view.superview.viewController.navigationController pushViewController:netWorkFailVC animated:YES];
        
    }
}


#pragma mark - 按钮点击代理
-(void)btnClicked:(XGQBHomeCellBtn *)btn
{
    if ([btn.titleLabel.text isEqualToString:@"卡包"]) {
        
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType =@"cardPack";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }else if([btn.titleLabel.text isEqualToString:@"手机充值"]){
        XGQBRNViewController *RNVC = [XGQBRNViewController new];
        RNVC.pageType = @"phoneTopUp";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }else if([btn.titleLabel.text isEqualToString:@"大红包"]){
        XGQBRNViewController *RNVC =[XGQBRNViewController new];
        RNVC.pageType = @"bigRedPacket";
        [self.view.superview.viewController.navigationController pushViewController:RNVC animated:YES];
    }
}

@end
