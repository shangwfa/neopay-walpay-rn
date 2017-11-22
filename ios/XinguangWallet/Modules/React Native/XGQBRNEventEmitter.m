//
//  XGQBRNEventEmitter.m
//  XinguangWallet
//
//  Created by BossKing on 22/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//  eventDispatcher已经过期,应该使用此类EventEmitter的子类,但由于Android那边目前采用eventDispatcher的方式,为两边统一,故此类尚未使用

#import "XGQBRNEventEmitter.h"
#import "RCTBridgeModule.h"

@implementation XGQBRNEventEmitter

RCT_EXPORT_MODULE();
/**
 * Override this method to return an array of supported event names. Attempting
 * to observe or send an event that isn't included in this list will result in
 * an error.
 */
//必须加上单例才能将事件传过去
+ (id)allocWithZone:(NSZone *)zone {
    static XGQBRNEventEmitter *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents
{
    return(@[@"ContactSelected"]);
}


-(void)tellJS
{
    [self sendEventWithName:@"ContactSelected" body:@"test"];
}

@end
