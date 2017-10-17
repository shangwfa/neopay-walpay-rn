//
//  XGQBCommMessTVC.h
//  XinguangWallet
//
//  Created by BossKing on 17/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, XGQBCommMessType) {
    XGQBCommMessTypePayment = 0,
    XGQBCommMessTypeCellPhone,
    XGQBCommMessTypeShopAd,
    XGQBCommMessTypeSystem,
};

@interface XGQBCommMessTVC : UITableViewCell

+(instancetype)messTableViewCellWithType:(XGQBCommMessType)type timeLabel:(NSString*)time;

@end
