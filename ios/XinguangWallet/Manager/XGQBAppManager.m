//
//  XGQBAppManager.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 27/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAppManager.h"
#import "XGQBAdViewController.h"
#import "YYFPSLabel.h"


@implementation XGQBAppManager

+(void)appStart{
    //加载广告
    XGQBAdViewController *adVC = [XGQBAdViewController new];
                                         
    [kRootViewController presentViewController:adVC animated:YES completion:nil];

}
#pragma mark - FPS 监测 - 
+(void)showFPS{
    YYFPSLabel *_fpsLabel = [YYFPSLabel new];
    [_fpsLabel sizeToFit];
    _fpsLabel.bottom = kScreenHeight - 55;
    _fpsLabel.right = kScreenWidth - 10;
    //    _fpsLabel.alpha = 0;
    [kAppWindow addSubview:_fpsLabel];
}




@end
