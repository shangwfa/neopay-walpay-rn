//
//  XGQBTabBarBadge.h
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

/**
 tabbar 红点
 */
@interface XGQBTabBarBadge : UIButton

/**
 *  TabBar item badge value
 */
@property (nonatomic, copy) NSString *badgeValue;

/**
 *  TabBar's item count
 */
@property (nonatomic, assign) NSInteger tabBarItemCount;

/**
 *  TabBar item's badge title font
 */
@property (nonatomic, strong) UIFont *badgeTitleFont;

@end
