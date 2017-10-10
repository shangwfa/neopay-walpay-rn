//
//  XGQBMainTabBarViewController.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XGQBTabBar.h"

@interface XGQBMainTabBarViewController : UITabBarController

@property (nonatomic,strong) XGQBTabBar *customTabBar;

@property (nonatomic,assign) CGFloat itemImageRatio;

-(void)removeOriginControls;

@end
