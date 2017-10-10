//
//  ABNetworkManager.h
//  ABroad
//
//  Created by gaojun on 16/8/17.
//  Copyright © 2016年 jesus. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^serverSuccessFn)(id responseAfter, id responseBefore);
typedef void (^serverFailureFn)(NSError* error);

@interface ABNetworkManager : NSObject

+ (ABNetworkManager *)share;

+(void)AFGETNetworkWithUrl:(NSString *)url andBody:(NSMutableDictionary *)body andSuccess:(serverSuccessFn)successFn andFailer:(serverFailureFn)failerFn;

+(void)AFPOSTNetworkWithUrl:(NSString *)url andBody:(NSMutableDictionary *)body andSuccess:(serverSuccessFn)successFn andFailer:(serverFailureFn)failerFn;

@end
