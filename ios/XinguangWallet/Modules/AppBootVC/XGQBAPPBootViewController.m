//
//  XGQBAPPBootViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 26/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAPPBootViewController.h"
#import "XGQBLoginViewController.h"

@interface XGQBAPPBootViewController ()

@end

@implementation XGQBAPPBootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor grayColor];
    // Do any additional setup after loading the view.
    
    UIButton *skipButton = [UIButton buttonWithType:UIButtonTypeSystem];
    skipButton.backgroundColor = [UIColor blueColor];
    skipButton.frame = CGRectMake(100, 200, 100, 50);
    [skipButton setTitle:@"skipBootVC" forState:UIControlStateNormal];
    [self.view addSubview:skipButton];
    [skipButton addTarget:self action:@selector(btnclicked) forControlEvents:UIControlEventTouchUpInside];
    
}

-(void)btnclicked
{
    if ([GVUserDefaults standardUserDefaults].accessToken) {
        kPostNotification(kNotificationLoginStateChange, @YES);
    }else{
        kPostNotification(kNotificationLoginStateChange, @NO);
    }
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
