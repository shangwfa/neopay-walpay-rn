//
//  XGQBMessage.h
//  XinguangWallet
//
//  Created by BossKing on 30/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger,XGQBMessageType){
    XGQBMessageTypeRedPacket=1,
    XGQBMessageTypePayMessage,
    XGQBMessageTypePhoneRecharge,
    XGQBMessageTypeOtherMsg,
};

typedef NS_ENUM(NSInteger,XGQBRedPacketType) {
    XGQBRedPacketTypeCommon=1,
    XGQBRedPacketTypeBirthday,
    XGQBRedPacketTypeNewYear,
};

typedef NS_ENUM(NSInteger,XGQBRedPacketReceiveStatus) {
    XGQBRedPacketReceiveStatusReceiving=1,
    XGQBRedPacketReceiveStatusReceived,
    XGQBRedPacketReceiveStatusExpired,
    XGQBRedPacketReceiveStatusReceiveFinished,
    XGQBRedPacketReceiveStatusNoPermission,
};

/*
1      RECEIVING      领取中
2      RECEIVED      已领取
3      EXPIRED      已过期
4      RECEIVE_FINISHED      已领完
5      NO_PERMISSION      无权限
*/

@interface XGQBMessage : NSObject

@property (nonatomic,assign) XGQBMessageType msgType;
@property (nonatomic,strong) NSString *msgTypeText;
@property (nonatomic,strong) NSString *dayCode;
@property (nonatomic,assign) BOOL disPlayDate;
@property (nonatomic,strong) NSString *iconUrl;
@property (nonatomic,strong) NSString *ID;
@property (nonatomic,strong) NSString *packetCode;
@property (nonatomic,strong) NSString *uuid;
@property (nonatomic,assign) BOOL readStatus;
@property (nonatomic,assign) XGQBRedPacketReceiveStatus receiveStatus;
@property (nonatomic,strong) NSString *bossName;
@property (nonatomic,strong) NSString *message;
@property (nonatomic,assign) XGQBRedPacketType themeType;
@property (nonatomic,strong) NSString *themeTypeText;
@property (nonatomic,strong) NSString *themeName;
@property (nonatomic,strong) NSString *themeUrl;
@property (nonatomic,strong) NSString *luckyAmount;
@property (nonatomic,strong) NSString *createTime;
@property (nonatomic,strong) NSString *createTimeMs;
@property (nonatomic,strong) NSString *payNoticeType;
@property (nonatomic,strong) NSString *payNoticeTypeText;
@property (nonatomic,strong) NSString *contentString;
@property (nonatomic,strong) NSString *noticeImageUrl;

@end
