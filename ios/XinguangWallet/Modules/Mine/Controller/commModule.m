//
//  commModule.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 30/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "commModule.h"
#import "RCTBridgeModule.h"

@implementation commModule

//RN跳转回原生界面
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(closeRNPage){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [kNotificationCenter postNotificationName:kNotificationRNJumpBackToNative object:nil];
        
    });
}
    
@end
