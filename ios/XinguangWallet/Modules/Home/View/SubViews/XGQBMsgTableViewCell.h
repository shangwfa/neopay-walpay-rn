//
//  XGQBMsgTableViewCell.h
//  XinguangWallet
//
//  Created by BossKing on 30/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

@class XGQBMessage;

@interface XGQBMsgTableViewCell : UITableViewCell

+(XGQBMsgTableViewCell*)cellWithMessage:(XGQBMessage*)message;

@end
