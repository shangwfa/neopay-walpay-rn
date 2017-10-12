//
//  XGQBRootViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootViewController.h"
#import "XGQBLoginViewController.h"

@interface XGQBRootViewController ()

@property (nonatomic,strong) UIImageView* noDataView;

@end

@implementation XGQBRootViewController

#pragma mark - viewController 生命周期
- (void)viewDidLoad {
    [super viewDidLoad];

    //插入临时显示VC名称的标签
    YYLabel *label = [YYLabel new];
    label.font= kSYSTEMFONT(8.0);
    [self.view addSubview:label];

    [label mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.view);
        make.bottom.equalTo(self.view).with.offset(-50);
    }];
    label.text = NSStringFromClass(self.class);
}

-(void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    [[UIApplication sharedApplication].keyWindow endEditing:YES];
}

@end
