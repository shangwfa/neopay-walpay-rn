//
//  XGQBMineViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineViewController.h"
#import "XGQBMineTableView.h"

#import "XGQBMineHeaderView.h"
#import "XGQBMineItemCell.h"

@interface XGQBMineViewController () <UITableViewDelegate,UITableViewDataSource>

@end

@implementation XGQBMineViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = kViewBgColor;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    
    [self setUpViewComponents];
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBarHidden = YES;
}

#pragma mark - setUp view components
-(void)setUpViewComponents
{
    UIImageView *bgImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_beijing"]];
    [self.view addSubview:bgImg];
    
    XGQBMineTableView *mineTableView = [[XGQBMineTableView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 59/375.0*kScreenWidth, 353/375.0*kScreenWidth, kScreenHeight) style:UITableViewStyleGrouped];
    mineTableView.backgroundColor = kGreenColor;
    mineTableView.delegate = self;
    
    XGQBMineHeaderView *headerView = [[XGQBMineHeaderView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 59/375.0*kScreenWidth, 353/375.0*kScreenWidth, 161/375.0*kScreenWidth)];
    
    mineTableView.tableHeaderView = headerView;
    
    [self.view addSubview:mineTableView];
    
}


#pragma mark - tableView delegate

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 2;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 44;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 4;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    XGQBMineItemCell *cell = [XGQBMineItemCell cellWithImageNamed:@"wd_zhangdan" title:@"我的账单"];
    return cell;
}

@end
