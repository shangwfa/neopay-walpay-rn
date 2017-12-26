//
//  XGQBMsgNoContentTableViewCell.h
//  XinguangWallet
//
//  Created by BossKing on 25/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XGQBPureColorBtn.h"

typedef NS_ENUM(NSInteger,XGQBMsgNoContentType){
    XGQBMsgNoContentTypeWifi,
    XGQBMsgNoContentTypeNormal,
};

@interface XGQBMsgNoContentTableViewCell : UITableViewCell

@property (nonatomic,weak) XGQBPureColorBtn* btn;

+(instancetype)cellWithType:(XGQBMsgNoContentType)type;

@end
