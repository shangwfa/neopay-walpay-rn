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

@property (nonatomic,strong) NSArray *cellItemArray;

@property (nonatomic,strong) NSArray *cellImgArray;

@end

@implementation XGQBMineViewController

#pragma mark - VC生命周期
- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    self.view.backgroundColor = kViewBgColor;
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
    self.navigationController.navigationBarHidden = YES;
    
    [self setUpViewComponents];
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBarHidden = YES;
}

#pragma mark - 懒加载相关
-(NSArray *)cellItemArray{
    if (!_cellItemArray) {
        _cellItemArray = @[@"我的账单",@"我的资产",@"我的银行卡",@"我的中奖纪录",@"邀请好友",@"关于我们",@"设置"];
    }
    return _cellItemArray;
}

-(NSArray *)cellImgArray{
    if (!_cellImgArray) {
        _cellImgArray = @[@"wd_zhangdan",@"wd_zichan",@"wd_yinghangka",@"wd_zhongjiang",@"wd_yaoqing",@"wd_guanyu",@"wd_shezhi"];
    }
    return _cellImgArray;
}

#pragma mark - setUp view components
-(void)setUpViewComponents
{
    //背景图片
    UIImageView *bgImg = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"wd_beijing"]];
    [self.view addSubview:bgImg];
    
    //tableview
    XGQBMineTableView *mineTableView = [[XGQBMineTableView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 0, 353/375.0*kScreenWidth, kScreenHeight) style:UITableViewStyleGrouped];
    
    mineTableView.backgroundColor = kClearColor;
    mineTableView.delegate = self;
    mineTableView.dataSource = self;
    mineTableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    mineTableView.sectionHeaderHeight = 0;
    mineTableView.sectionFooterHeight = 8;
    mineTableView.showsVerticalScrollIndicator = NO;
    mineTableView.showsHorizontalScrollIndicator = NO;
    mineTableView.scrollEnabled = NO;
    mineTableView.rowHeight = 50;
    
    //tableview头部试图
    XGQBMineHeaderView *headerView = [[XGQBMineHeaderView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 59/375.0*kScreenWidth, 353/375.0*kScreenWidth, 161/375.0*kScreenWidth+70)];
    
    mineTableView.tableHeaderView = headerView;
    
    [self.view addSubview:mineTableView];
    
    kWeakSelf(self);
    //添加约束
    [bgImg mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(kScreenWidth, kScreenWidth*187.0/375.0));
        make.top.equalTo(weakself.view);
        make.left.equalTo(weakself.view);
    }];
    
}


#pragma mark - tableView delegate and data source
-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 2;
}


-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if (section==0) {
        return 4;
    }
    return 3;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    XGQBMineItemCell *cell = [XGQBMineItemCell cellWithImageNamed:self.cellImgArray[indexPath.section*4+indexPath.row] title:self.cellItemArray[indexPath.row+indexPath.section*4]];
    return cell;
}

@end
