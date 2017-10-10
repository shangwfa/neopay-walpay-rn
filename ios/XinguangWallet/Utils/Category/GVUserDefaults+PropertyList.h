//
//  GVUserDefaults+PropertyList.h
//  ABroad
//
//  Created by gaojun on 16/8/23.
//  Copyright © 2016年 jesus. All rights reserved.
//

#import <GVUserDefaults/GVUserDefaults.h>

//#import "StoreModel.h"

@interface GVUserDefaults (PropertyList)
@property (nonatomic,strong)NSString* accessToken;
@property (nonatomic,strong)NSString* uuid;
@property (nonatomic,strong)NSString* userStatus;
@property (nonatomic,strong)NSString* name;
@property (nonatomic,strong)NSString* phone;
@property (nonatomic,strong)NSString* nickName;
@property (nonatomic,strong)NSString* avatarUrl;
@property (nonatomic,strong)NSString* authStatus;


@property (nonatomic,assign)int runCount;
//
//@property (nonatomic,strong)NSString* defaultStoreStatus;//是否有店铺（包括别人的）
//@property (nonatomic,strong)NSString* userHasStore;//是否有店铺（只是自己的）
//@property (nonatomic,strong)NSString* hasCerStore;//是否有店铺（只是自己的认证的）
//@property (nonatomic,strong)NSString* storeNo;
//@property (nonatomic,strong)NSString* storeName;
//@property (nonatomic,strong)NSString* storeHeadImgUrl;
//@property (nonatomic,strong)NSString* merchantType;//1.个体 2.商家 3.个人
//@property (nonatomic,strong)NSString* merchantNo;
//@property (nonatomic,strong)NSString* merchantAuthStatus;//1"未认证",2"审核中",3"已认证",4"审核失败",5"停用"
//@property (nonatomic,strong)NSString* merchantAuthStatusText;
//@property (nonatomic,strong)NSString* employeeType;//1.店长 2.收银员
//
//@property (nonatomic,strong)NSString* reCerfityStoreId;
//
//@property (nonatomic,strong)NSString* serviceTel;
//@property (nonatomic,strong)NSString* payPassWordHas;
//
//@property (nonatomic,strong)NSDictionary* webUrlDic;
//
//@property (nonatomic,strong)NSDictionary* limitDic;
@end
