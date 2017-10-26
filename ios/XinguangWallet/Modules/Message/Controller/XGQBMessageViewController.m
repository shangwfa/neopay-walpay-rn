//
//  XGQBMessageViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMessageViewController.h"
#import "XGQBCommMessTVC.h"
#import "XGQBActiMessTVC.h"

#import "XGQBNoContentViewController.h"
#import "XGQBNetworkFailureViewController.h"

#import "XGQBRNViewController.h"


@interface XGQBMessageViewController ()

@property (nonatomic,strong) NSMutableArray *messArr;

@end

@implementation XGQBMessageViewController


-(NSMutableArray*)messArr
{
    if (!_messArr) {
        
        _messArr = [NSMutableArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"mess" ofType:@"plist"]];
    }
    return _messArr;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
     self.clearsSelectionOnViewWillAppear = NO;

    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;

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
        [self.navigationController pushViewController:RNVC animated:YES];
    }
    
    
    else if (arc4random()%2) {
        XGQBNoContentViewController *noContentVC = [XGQBNoContentViewController new];
        [self.navigationController pushViewController:noContentVC animated:YES];
    }else{
        XGQBNetworkFailureViewController *netWorkFailVC = [XGQBNetworkFailureViewController new];
        [self.navigationController pushViewController:netWorkFailVC animated:YES];
    }
    
}

@end
