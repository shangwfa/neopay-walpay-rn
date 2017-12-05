//
//  XGQBMessage.h
//  XinguangWallet
//
//  Created by BossKing on 30/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface XGQBMessage : NSObject

@property (nonatomic,strong) NSString *msgType;
@property (nonatomic,strong) NSString *msgTypeText;
@property (nonatomic,strong) NSString *dayCode;
@property (nonatomic,assign) BOOL disPlayDate;
@property (nonatomic,strong) NSString *iconUrl;
@property (nonatomic,strong) NSString *ID;
@property (nonatomic,strong) NSString *packetCode;
@property (nonatomic,strong) NSString *uuid;
@property (nonatomic,assign) BOOL readStatus;
@property (nonatomic,strong) NSString *receiveStatus;
@property (nonatomic,strong) NSString *bossName;
@property (nonatomic,strong) NSString *message;
@property (nonatomic,strong) NSString *themeType;
@property (nonatomic,strong) NSString *themeTypeText;
@property (nonatomic,strong) NSString *themeName;
@property (nonatomic,strong) NSString *themeUrl;
@property (nonatomic,strong) NSString *createTime;
@property (nonatomic,strong) NSString *createTimeMs;
@property (nonatomic,strong) NSString *payNoticeType;
@property (nonatomic,strong) NSString *payNoticeTypeText;
@property (nonatomic,strong) NSString *contentString;
@property (nonatomic,strong) NSString *noticeImageUrl;

@end
