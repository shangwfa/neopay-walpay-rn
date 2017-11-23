//
//  XGQBSideViewController.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideViewController.h"
#import "XGQBSideView.h"
#import "XGQBRNViewController.h"
#import "XGQBAPPRootViewController.h"
#import "XGQBSideTableViewCell.h"

@interface XGQBSideViewController () <UITableViewDelegate,UITableViewDataSource>

@property (nonatomic,strong) NSArray *cellItemArray;

@property (nonatomic,strong) NSArray *cellImgArray;

@end

@implementation XGQBSideViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    XGQBSideView *sideView =[[XGQBSideView alloc]initWithFrame:CGRectMake(-kScreenWidth*kSideViewRatio*0.5, 0, kScreenWidth*kSideViewRatio, kScreenHeight)];
    self.view = sideView;
    
    sideView.tableView.delegate = self;
    sideView.tableView.dataSource = self;
    
}

#pragma mark - 懒加载相关
-(NSArray *)cellItemArray{
    if (!_cellItemArray) {
        _cellItemArray = @[@"我的账单",@"我的资产",@"我的银行卡",@"关于我们",@"设置"];
    }
    return _cellItemArray;
}

-(NSArray *)cellImgArray{
    if (!_cellImgArray) {
        _cellImgArray = @[@"wd_zhangdan4",@"wd_zichan4",@"wd_yinhangka4",@"wd_guanyu4",@"wd_shezhi4"];
    }
    return _cellImgArray;
}


- (nonnull UITableViewCell *)tableView:(nonnull UITableView *)tableView cellForRowAtIndexPath:(nonnull NSIndexPath *)indexPath {
    
    XGQBSideTableViewCell *cell = [XGQBSideTableViewCell cellWithImageNamed:self.cellImgArray[indexPath.row] title:self.cellItemArray[indexPath.row]];
    ///修改cell的选中样式
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    return cell;
}

- (NSInteger)tableView:(nonnull UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 5;
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
    //关于我们
    else if (indexPath.section==0&&indexPath.row==3) {
        RNVC.pageType = @"setting";
    }
    //设置
    else if (indexPath.section==0&&indexPath.row==4) {
        RNVC.pageType = @"setting";
    }
    XGQBAPPRootViewController *rootVC = (XGQBAPPRootViewController*)self.parentViewController;
    [rootVC.rootNAV pushViewController:RNVC animated:YES];
    [rootVC closeSideView];
}

#pragma mark - 处理按钮点击
//-(void)goRegBtnClicked
//{
//    XGQBIDRegisterTableViewController *idRegVC = [[XGQBIDRegisterTableViewController alloc]initWithStyle:UITableViewStyleGrouped];
//    [self.navigationController pushViewController:idRegVC animated:YES];
//}
//
//-(void)tableHeaderClicked
//{
//    XGQBRNViewController *RNVC = [XGQBRNViewController new];
//    RNVC.pageType = @"personalInfo";
//    [self.navigationController pushViewController:RNVC animated:YES];
//}



@end
