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

#import "XGQBRNViewController.h"

#import "XGQBIDRegisterTableViewController.h"

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
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
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
    XGQBMineTableView *mineTableView = [[XGQBMineTableView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 0, 353/375.0*kScreenWidth, kScreenHeight-44) style:UITableViewStyleGrouped];
    
    mineTableView.backgroundColor = kClearColor;
    mineTableView.delegate = self;
    mineTableView.dataSource = self;
    mineTableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    mineTableView.sectionHeaderHeight = 0;
    mineTableView.sectionFooterHeight = 8;
    mineTableView.showsVerticalScrollIndicator = NO;
    mineTableView.showsHorizontalScrollIndicator = NO;
//    mineTableView.scrollEnabled = NO;
    mineTableView.rowHeight = 50;
    
    //tableview头部试图
    XGQBMineHeaderView *headerView = [[XGQBMineHeaderView alloc]initWithFrame:CGRectMake(11.0/375.0*kScreenWidth, 59/375.0*kScreenWidth, 353/375.0*kScreenWidth, 161/375.0*kScreenWidth+70)];
    
    [headerView.goRegBtn addTarget:self action:@selector(goRegBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    
    UITapGestureRecognizer *tapOnHeader = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tableHeaderClicked)];
    
    [headerView addGestureRecognizer:tapOnHeader];
    
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
    ///修改cell的选中样式
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    //我的账单
    if (indexPath.section==0&&indexPath.row==0) {
        RNVC.pageType = @"myOrder";
    }
    //我的资产
    else if (indexPath.section==0&&indexPath.row==1) {
        RNVC.pageType = @"myAsset";
    }
    //我的银行卡
    else if (indexPath.section==0&&indexPath.row==2) {
        RNVC.pageType = @"bankCardList";
    }
    //我的中奖纪录
    else if (indexPath.section==0&&indexPath.row==3) {
        RNVC.pageType = @"myLotteryRecord";
    }
    //邀请好友
    else if (indexPath.section==1&&indexPath.row==0) {
        RNVC.pageType = @"setting";
    }
    //关于我们
    else if (indexPath.section==1&&indexPath.row==1) {
        RNVC.pageType = @"setting";
    }
    //设置
    else if (indexPath.section==1&&indexPath.row==2) {
        RNVC.pageType = @"setting";
    }
    [self.navigationController pushViewController:RNVC animated:YES];

}

#pragma mark - 处理按钮点击
-(void)goRegBtnClicked
{
    XGQBIDRegisterTableViewController *idRegVC = [[XGQBIDRegisterTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
    [self.navigationController pushViewController:idRegVC animated:YES];
}

-(void)tableHeaderClicked
{
    XGQBRNViewController *RNVC = [XGQBRNViewController new];
    RNVC.pageType = @"personalInfo";
    [self.navigationController pushViewController:RNVC animated:YES];
}

@end
