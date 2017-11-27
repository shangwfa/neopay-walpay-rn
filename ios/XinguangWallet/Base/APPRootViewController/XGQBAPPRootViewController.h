//
//  XGQBAPPRootViewController.h
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootViewController.h"
#import "XGQBSideViewController.h"
#import "XGQBRootNavigationController.h"
#import "XGQBHomeViewController.h"

#import "XGQBSideView.h"

@interface XGQBAPPRootViewController : XGQBRootViewController
@property (nonatomic,weak) XGQBRootNavigationController *rootNAV;
@property (nonatomic,weak) XGQBSideViewController *sideVC;
@property (nonatomic,weak) XGQBHomeViewController *homeVC;


//侧边栏视图
@property (nonatomic,weak) XGQBSideView *sideView;

+(instancetype)setupSideVCAndNavVC;

-(void)closeSideView;

@end
