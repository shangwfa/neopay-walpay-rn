//
//  XGQBRNEventEmitter.h
//  XinguangWallet
//
//  Created by BossKing on 22/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "RCTEventEmitter.h"
#import "RCTBridgeModule.h"

@interface XGQBRNEventEmitter : RCTEventEmitter<RCTBridgeModule>

-(void)tellJS;

@end
