//
//  XGQBActiMessTVC.h
//  XinguangWallet
//
//  Created by BossKing on 17/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, XGQBActiMessType) {
    XGQBActiMessTypeShop = 0,
    XGQBActiMessTypeSystem,
    XGQBActiMessTypeRedPocket,
};

@interface XGQBActiMessTVC : UITableViewCell

+(instancetype)actiTableViewCellWithType:(XGQBActiMessType)type timeLabel:(NSString*)time;

@end
