//
//  XGQBSideView.h
//  XinguangWallet
//
//  Created by BossKing on 14/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "XGQBSideHeaderView.h"
#import "XGQBSideTableView.h"

@interface XGQBSideView : UIView

@property (nonatomic,weak) XGQBSideHeaderView *headerView;
@property (nonatomic,weak) XGQBSideTableView *tableView;

@end
