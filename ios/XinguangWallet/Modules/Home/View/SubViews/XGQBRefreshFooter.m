//
//  XGQBRefreshFooter.m
//  XinguangWallet
//
//  Created by BossKing on 13/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRefreshFooter.h"

@implementation XGQBRefreshFooter

-(void)prepare
{
    [super prepare];
    
    NSMutableArray *footerImgArr =[[NSMutableArray alloc]initWithCapacity:40];
    for (int i=1; i<27; i++) {
        UIImage *img = [UIImage imageNamed:[NSString stringWithFormat:@"shangla%d",i]];
        [footerImgArr addObject:img];
    }
    self.stateLabel.hidden =YES;
    [self setImages:footerImgArr forState:MJRefreshStateRefreshing];
}

@end
