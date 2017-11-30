//
//  XGQBHomeScrollView.m
//  XinguangWallet
//
//  Created by BossKing on 24/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeScrollView.h"
#import "XGQBHomeTableViewController.h"

#import "XGQBHomeTitleView.h"
#import "XGQBHomeCellView.h"
#import "XGQBHomeTableView.h"

#import "XGQBHomeViewController.h"

#define titleViewHeight kScreenWidth*134/375.0
#define cellViewHeight kScreenWidth*152/375.0


@interface XGQBHomeScrollView()


@end

@implementation XGQBHomeScrollView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    [self addSubviews];
    self.contentSize = CGSizeMake(kScreenWidth, kScreenHeight-75+kScreenWidth*134/375.0+kScreenWidth*152/375.0+350);
    
    self.showsVerticalScrollIndicator = NO;
    
    return self;
    
}

-(void)addSubviews{
    
    //顶部视图
    XGQBHomeTitleView *homeTitleView = [[XGQBHomeTitleView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenWidth*134/375.0)];
    _homeTitleView=homeTitleView;
    [self addSubview:homeTitleView];

    //tableView视图
    XGQBHomeTableViewController *homeTableVC = [[XGQBHomeTableViewController alloc]initWithStyle:UITableViewStyleGrouped];

    //一定要将tableviewcontroller加入到子控制器中,tableview才能点击...
    [kAppWindow.rootViewController addChildViewController:homeTableVC];
    _homeTableView = (XGQBHomeTableView*)homeTableVC.tableView;
    [self addSubview:homeTableVC.tableView];
}

-(void)titleViewAnimationWithOffsetY:(CGFloat)offsetY
{
    if (offsetY > titleViewHeight/ 2.0) {
        [self setContentOffset:CGPointMake(0, titleViewHeight) animated:YES];
    }else {
        [self setContentOffset:CGPointMake(0, 0) animated:YES];
    }
}


@end
