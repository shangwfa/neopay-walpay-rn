//
//  XGQBSideTableView.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideTableView.h"

@implementation XGQBSideTableView

-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    self.backgroundColor = kClearColor;
    self.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.sectionHeaderHeight = 0;
    self.sectionFooterHeight = 0;
    self.showsVerticalScrollIndicator = NO;
    self.showsHorizontalScrollIndicator = NO;
    self.rowHeight = 58;
    
    return self;
}

@end
