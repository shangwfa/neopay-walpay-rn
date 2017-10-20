//
//  XGQBNoContentViewController.m
//  XinguangWallet
//
//  Created by BossKing on 20/10/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBNoContentViewController.h"

@interface XGQBNoContentViewController ()

@end

@implementation XGQBNoContentViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.view.backgroundColor = kViewBgColor;
    
    UIImageView *noContentImage = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"kong"]];
    [self.view addSubview:noContentImage];
    
    UILabel *desLabel = [[UILabel alloc]init];
    desLabel.text = @"暂时没有内容哦！去其他页面看看~";
    desLabel.font = kSYSTEMFONT(15.0);
    desLabel.textColor = [UIColor colorWithHexString:@"B5B5B5"];
    [self.view addSubview:desLabel];
    
    [noContentImage mas_makeConstraints:^(MASConstraintMaker *make) {
        make.size.mas_equalTo(CGSizeMake(174, 147));
        make.centerX.equalTo(self.view);
        make.centerY.equalTo(self.view).with.offset(-40);
    }];
    [desLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.view);
        make.top.equalTo(noContentImage.mas_bottom).with.offset(40);
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
