//
//  XGQBPushNotiBody.h
//  XinguangWallet
//
//  Created by BossKing on 28/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "XGQBPushNotiParams.h"


typedef NS_ENUM(NSInteger,XGQBMsgType){
    XGQBMsgTypeRedPacket=1,
    XGQBMsgTypePayNotice,
    XGQBMsgTypePhoneRechargeSuccess,
    XGQBMsgTypePhoneDataRechargeSuccess,
    XGQBMsgTypeMerchantBroadcast,
    XGQBMsgTypeDiscountsNotice,
    XGQBMsgTypeSystemNotice,
    XGQBMsgTypeSystemActNotice,
};

@interface XGQBPushNotiBody : NSObject

@property (nonatomic,assign) XGQBMsgType noticeType;
@property (nonatomic,strong) XGQBPushNotiParams *params;
@property (nonatomic,assign) int redirectType;

@end
