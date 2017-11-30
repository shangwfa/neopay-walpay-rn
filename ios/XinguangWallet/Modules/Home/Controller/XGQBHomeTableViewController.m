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


#import "XGQBHomeCellView.h"

#import "XGQBHomeTableView.h"

@interface XGQBHomeTableViewController ()

@property (nonatomic,strong) NSMutableArray *messArr;

@end

@implementation XGQBHomeTableViewController

#pragma mark - Table view data source
-(void)loadView
{
    XGQBHomeTableView *tableView =[[XGQBHomeTableView alloc]initWithFrame:CGRectMake(0, 75, kScreenWidth, kScreenHeight-75) style:UITableViewStyleGrouped];
    tableView.contentInset=UIEdgeInsetsMake(kScreenWidth*134/375.0, 0, 0, 0);
    tableView.backgroundColor=kClearColor;
    self.tableView = tableView;
    self.view = tableView;
    
    tableView.tableHeaderView=[[XGQBHomeCellView alloc]initWithFrame:CGRectMake(0, kScreenWidth*134/375.0, kScreenWidth, kScreenWidth*152/375.0)];

    MJRefreshNormalHeader *header =[MJRefreshNormalHeader headerWithRefreshingBlock:^{
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [tableView.mj_header endRefreshing];
        });
    }];
    tableView.mj_header = header;
    header.automaticallyChangeAlpha=YES;
    header.lastUpdatedTimeLabel.hidden=YES;
    header.stateLabel.hidden=YES;
    
    tableView.mj_footer = [MJRefreshAutoFooter footerWithRefreshingBlock:^{
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [tableView.mj_footer endRefreshing];
        });
    }];
    tableView.dataSource = self;
}

-(NSMutableArray*)messArr
{
    if (!_messArr) {
        
        _messArr = [NSMutableArray arrayWithContentsOfFile:[[NSBundle mainBundle]pathForResource:@"mess" ofType:@"plist"]];
    }
    return _messArr;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.clearsSelectionOnViewWillAppear = NO;
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.sectionHeaderHeight=0;
    self.tableView.sectionFooterHeight=0;
}

-(void)moreBtnClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"activityList";
    [self.tableView.superview.viewController.navigationController pushViewController:RNVC animated:YES];
}


#pragma mark - Table view data source
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.messArr.count;
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



@end
