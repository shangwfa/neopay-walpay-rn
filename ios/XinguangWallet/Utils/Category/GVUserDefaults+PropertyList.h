//
//  GVUserDefaults+PropertyList.h
//  ABroad
//
//  Created by gaojun on 16/8/23.
//  Copyright © 2016年 jesus. All rights reserved.
//

#import <GVUserDefaults/GVUserDefaults.h>

typedef NS_ENUM(NSInteger, XGQBUserAuthStatus){
    XGQBUserAuthStatusUnauthorized =1,
    XGQBUserAuthStatusAuthorized,
};

//#import "StoreModel.h"

@interface GVUserDefaults (PropertyList)
@property (nonatomic,strong)NSString* accessToken;
@property (nonatomic,strong)NSString* uuid;
@property (nonatomic,assign)int userStatus;
@property (nonatomic,strong)NSString* name;
@property (nonatomic,strong)NSString* phone;
@property (nonatomic,strong)NSString* nickName;
@property (nonatomic,strong)NSString* avatarUrl;
@property (nonatomic,assign)XGQBUserAuthStatus authStatus;


@property (nonatomic,assign)int runCount;

//临时增加RN页面Router选择项
@property (nonatomic,assign)int RNRouter;

@end
