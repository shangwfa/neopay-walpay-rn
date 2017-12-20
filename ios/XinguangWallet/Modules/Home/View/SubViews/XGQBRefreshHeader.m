//
//  XGQBRefreshHeader.m
//  XinguangWallet
//
//  Created by BossKing on 13/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRefreshHeader.h"

@implementation XGQBRefreshHeader

#pragma mark - 重写方法
#pragma mark 基本设置
- (void)prepare
{
    [super prepare];
    
    NSMutableArray *headerImgLoadingArr = [[NSMutableArray alloc]initWithCapacity:40];
    for (int i=1; i<30; i++) {
        UIImage *img = [UIImage imageNamed:[NSString stringWithFormat:@"图层%d",i]];
        [headerImgLoadingArr addObject:img];
    }
    
    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStateIdle];
    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStatePulling];
    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStateRefreshing];
    
    self.gifView.size = CGSizeMake(200, 200);
    
    [self setTitle:@"正在刷新" forState:MJRefreshStateRefreshing];
    //    header.stateLabel.hidden=YES;
    self.automaticallyChangeAlpha=YES;
    self.lastUpdatedTimeLabel.hidden=YES;

}

-(void)showRefreshSuccessGifAndText
{
    NSMutableArray *headerImgLoadingSucArr = [[NSMutableArray alloc]initWithCapacity:40];
    for (int i=22; i<38; i++) {
        UIImage *img = [UIImage imageNamed:[NSString stringWithFormat:@"图层%d",i]];
        [headerImgLoadingSucArr addObject:img];
    }
    
    if (self.state==MJRefreshStateRefreshing) {
        [self.gifView stopAnimating];
        self.gifView.animationImages=nil;
        self.gifView.animationImages=headerImgLoadingSucArr;
        [self.gifView startAnimating];
    }
    
    [self setTitle:@"刷新成功" forState:MJRefreshStateRefreshing];

    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self endRefreshing];
        [self setTitle:@"正在刷新" forState:MJRefreshStateRefreshing];
    });
    
    
}

@end

