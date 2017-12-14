//
//  XGQBHomeTableViewController.m
//  XinguangWallet
//
//  Created by BossKing on 15/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTableViewController.h"
#import "XGQBRNViewController.h"

#import "XGQBHomeCellView.h"

#import "XGQBMessage.h"

#import "XGQBHomeTableView.h"

#import "XGQBMsgTableViewCell.h"

#import "XGQBRefreshHeader.h"
#import "XGQBRefreshFooter.h"

@interface XGQBHomeTableViewController ()

@property (nonatomic,assign) int currentPage;
//@property (nonatomic,strong) NSMutableArray *freshImagesPull;

@end

@implementation XGQBHomeTableViewController

#pragma mark - Table view data source
-(void)loadView
{
    XGQBHomeTableView *tableView =[[XGQBHomeTableView alloc]initWithFrame:CGRectMake(0, 75+(kiPhoneX?24:0), kScreenWidth, kScreenHeight-75-(kiPhoneX?24:0)) style:UITableViewStyleGrouped];
    tableView.contentInset=UIEdgeInsetsMake(kScaledSizeW(134), 0, 0, 0);
    tableView.backgroundColor=kClearColor;
    self.tableView = tableView;
    self.view = tableView;
    tableView.dataSource = self;
    
    tableView.tableHeaderView=[[XGQBHomeCellView alloc]initWithFrame:CGRectMake(0, kScaledSizeW(134), kScreenWidth, kScaledSizeW(152)+8)];
    
    [self refreshData];

    //下拉刷新
    kWeakSelf(self);
    XGQBRefreshHeader *header =[XGQBRefreshHeader headerWithRefreshingBlock:^{
        [weakself refreshData];
    }];
    
    tableView.mj_header = header;

    //上拉加载
    XGQBRefreshFooter *footer = [XGQBRefreshFooter footerWithRefreshingBlock:^{
        [weakself loadMoreData];
    }];
    tableView.mj_footer = footer;
    
}


-(void)loadMoreData
{
    NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
    [body setObject:[NSNumber numberWithInt:_currentPage] forKey:@"pageNo"];
    [body setObject:@10 forKey:@"pageSize"];
    [MemberCoreService messageOverview:body andSuccessFn:^(id responseAfter, id responseBefore) {
        for (NSDictionary*dict in responseAfter) {
            XGQBMessage *mess =[XGQBMessage modelWithJSON:dict];
            [self.messArr addObject:mess];
            [self.tableView reloadData];
        }

        if([(NSArray*)responseAfter count]<10)//判断是否加载完成
        {
            [self.tableView.mj_footer endRefreshingWithNoMoreData];
        }else{
            [self.tableView.mj_footer endRefreshing];
        }
        _currentPage++;
    } andFailerFn:^(NSError *error) {
        [self.tableView.mj_footer endRefreshing];
    }];
}

-(void)refreshData
{
    
    //发送请求获取消息数据
    NSMutableDictionary *body = [NSMutableDictionary dictionaryWithCapacity:10];
    [body setObject:@10 forKey:@"pageSize"];
    [body setObject:@1 forKey:@"pageNo"];
    [self.tableView.mj_header beginRefreshing];
    [MemberCoreService messageOverview:body andSuccessFn:^(id responseAfter, id responseBefore) {
        //获取到数据
        self.messArr=nil;
        
        for (NSDictionary*dict in responseAfter) {
            XGQBMessage *mess =[XGQBMessage modelWithJSON:dict];
            [self.messArr addObject:mess];
            [self.tableView reloadData];
        }
        [(XGQBRefreshHeader*)self.tableView.mj_header showRefreshSuccessGifAndText];
//        [self.tableView.mj_header endRefreshing];
        
        if([(NSArray*)responseAfter count]<10)//判断是否加载完成
        {
            [self.tableView.mj_footer endRefreshingWithNoMoreData];
        }else{
            [self.tableView.mj_footer resetNoMoreData];
        }
        _currentPage=2;
    } andFailerFn:^(NSError *error) {
            [self.tableView.mj_header endRefreshing];
    }];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.clearsSelectionOnViewWillAppear = NO;
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.sectionHeaderHeight=0;
    self.tableView.sectionFooterHeight=0;
    
    self.tableView.estimatedRowHeight=84;
    self.tableView.rowHeight=UITableViewAutomaticDimension;
    
}

-(NSMutableArray *)messArr
{
    if (!_messArr) {
        _messArr=[NSMutableArray arrayWithCapacity:10];
    }
    return _messArr;
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
    XGQBMessage *mess = self.messArr[indexPath.row];
    XGQBMsgTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:mess.msgTypeText];
    if (!cell) {
        cell = [XGQBMsgTableViewCell cellWithMessage:mess];
    }
    cell.selectionStyle=UITableViewCellSelectionStyleNone;
//    cell.textLabel.text=[NSString stringWithFormat:@"当前行:%ld",indexPath.row];
    return cell;
}



@end
