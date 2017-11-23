//
//  XGQBSideViewController.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBSideViewController.h"
#import "XGQBSideView.h"

@interface XGQBSideViewController ()

@end

@implementation XGQBSideViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    XGQBSideView *sideView =[[XGQBSideView alloc]initWithFrame:CGRectMake(-kScreenWidth*0.33, 0, kScreenWidth*0.66, kScreenHeight)];
    self.view = sideView;
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
