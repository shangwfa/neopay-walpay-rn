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
    
//    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStateIdle];
//    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStatePulling];
    [self setImages:headerImgLoadingArr duration:1.0 forState:MJRefreshStateRefreshing];
    
    
    [self setTitle:@"正在刷新" forState:MJRefreshStateRefreshing];
    //    header.stateLabel.hidden=YES;
    self.automaticallyChangeAlpha=YES;
    self.lastUpdatedTimeLabel.hidden=YES;

}
@end

