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


@interface XGQBMessageViewController ()



@end

@implementation XGQBMessageViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
     self.clearsSelectionOnViewWillAppear = NO;
    
//    self.tableView.estimatedRowHeight = 200;
//    self.tableView.rowHeight = UITableViewAutomaticDimension;
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
    return 50;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row%2==0)
    {
        return (79*kScreenWidth/375.0+8);
    }else{
        return (218*kScreenWidth/375.0+8);
    }
}

 - (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    NSString *cellIdentify = [NSString string];
    
    if (indexPath.row%2==0){
        cellIdentify = @"mess";
    }else{
        cellIdentify = @"messCell";
    }
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentify];
     if (!cell && indexPath.row%2 ==0)
     {
         cell = [XGQBCommMessTVC messTableViewCellWithType:arc4random()%4 timeLabel:@"06/06 00:00"];

     }else if (!cell)
     {
         cell = [XGQBActiMessTVC actiTableViewCellWithType:arc4random()%3 timeLabel:@"06/06 00:00"];
     }
    
    
    return cell;
 }

@end
