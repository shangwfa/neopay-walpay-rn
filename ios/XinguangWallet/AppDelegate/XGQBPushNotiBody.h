//
//  XGQBPushNotiBody.h
//  XinguangWallet
//
//  Created by BossKing on 28/12/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface XGQBPushNotiBody : NSObject

@property (nonatomic,assign) XGQBMsgType noticeType;
@property (nonatomic,strong) NSDictionary *params;

@end
