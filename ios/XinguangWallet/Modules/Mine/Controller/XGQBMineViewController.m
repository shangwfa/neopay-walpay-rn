//
//  XGQBMineViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMineViewController.h"

@interface XGQBMineViewController ()

@end

@implementation XGQBMineViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor greenColor];

    YYLabel *logoutLabel = [YYLabel new];
    logoutLabel.text = @"Logout";
    logoutLabel.textAlignment = NSTextAlignmentCenter;
    logoutLabel.backgroundColor = [UIColor redColor];
 
    logoutLabel.frame = CGRectMake(100, 100, 100, 50);
    [self.view addSubview:logoutLabel];
    
    [logoutLabel setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].accessToken = nil;
        [kNotificationCenter postNotificationName:KNotificationLoginStateChange object:@NO];
    }];
    
    YYLabel *restRunCount = [YYLabel new];
    restRunCount.text = @"ResetRunCount";
    restRunCount.textAlignment = NSTextAlignmentCenter;
    restRunCount.backgroundColor = [UIColor redColor];
    
    restRunCount.frame = CGRectMake(100, 200, 100, 50);
    [self.view addSubview:restRunCount];
    
    [restRunCount setTextTapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
        [GVUserDefaults standardUserDefaults].runCount = 0;
    }];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
