//
//  XGQBRootNavigationController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBRootNavigationController.h"

@interface XGQBRootNavigationController ()<UIGestureRecognizerDelegate>

@end

@implementation XGQBRootNavigationController

#pragma mark 初始化方法
//APP生命周期中 只会执行一次
+ (void)initialize
{
    //导航栏主题 title文字属性
    UINavigationBar *navBar = [UINavigationBar appearance];
    [navBar setBarTintColor:kNavBgColor];
    [navBar setTintColor:kNavBgFontColor];
    [navBar setTitleTextAttributes:@{NSForegroundColorAttributeName :kNavBgFontColor,
                                     NSFontAttributeName : [UIFont systemFontOfSize:18.0]}
     ];

}


- (void)viewDidLoad {
    [super viewDidLoad];
    
    //默认开启系统右划返回
    self.interactivePopGestureRecognizer.enabled = YES;
    self.interactivePopGestureRecognizer.delegate = self;
    
}

//根视图禁用右划返回
-(BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer{
    return self.childViewControllers.count == 1 ? NO : YES;
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    if (self.viewControllers.count > 0) { // 如果push的不是根控制器(不是栈底控制器)
        viewController.hidesBottomBarWhenPushed = YES;
        // 左上角的返回
        UIButton *leftBtn = [[UIButton alloc]initWithFrame:CGRectMake(0, 0, 10.5, 18)];
//        leftBtn.backgroundColor = kRedColor;
        [leftBtn setImage:[UIImage imageNamed:@"jiantou"] forState:0];
        [leftBtn setTitle:@"        " forState:UIControlStateNormal];
//        [leftBtn imageRectForContentRect:CGRectMake(0, 0, 30, 30)];
        
        viewController.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:leftBtn];
        [leftBtn addTarget:self action:@selector(back) forControlEvents:UIControlEventTouchUpInside];
        // 右上角的更多
        //        viewController.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"返回首页" style:UIBarButtonItemStyleDone target:self action:@selector(more)];
    
        //给tabbar发送通知,禁用自定义优化手势
        [kNotificationCenter postNotificationName:kNotificationNavPushToSecondLevel object:nil];
    
    }
    [super pushViewController:viewController animated:animated];
}
- (void)back
{
    [self popViewControllerAnimated:YES];
}

-(UIViewController *)popViewControllerAnimated:(BOOL)animated
{
    if (self.viewControllers.count==2) {
        [kNotificationCenter postNotificationName:kNotificationNavPopToFirstLevel object:nil];
    }
    return [super popViewControllerAnimated:animated];
}


@end
