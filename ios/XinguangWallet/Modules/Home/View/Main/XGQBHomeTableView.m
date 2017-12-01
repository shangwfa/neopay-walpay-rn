//
//  XGQBHomeTableView.m
//  XinguangWallet
//
//  Created by BossKing on 24/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeTableView.h"

@implementation XGQBHomeTableView

-(void)setScrollViewContentOffSetWithPoint:(CGPoint)point
{
    if (!self.mj_header.isRefreshing) {
        self.contentOffset = point;
    }
}

@end
