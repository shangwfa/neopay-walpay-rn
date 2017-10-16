//
//  XGQBMainTabBarViewController.m
//  XinguangWallet
//
//  Created by Neopay-iOS on 25/09/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBMainTabBarViewController.h"

#import "XGQBRootNavigationController.h"

#import "XGQBHomeViewController.h"
#import "XGQBMessageViewController.h"
#import "XGQBMineViewController.h"

#import "XGQBLoginViewController.h"



#import "XGQBTabBarItem.h"


@interface XGQBMainTabBarViewController () <XGQBTabBarDelegate>

@property (nonatomic,strong) NSMutableArray *VCs;

@end

@implementation XGQBMainTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //初始化TabBar
    [self setUpTabBar];
    
    //添加子控制器
    [self setUpAllChildViewControllers];
}



#pragma mark - 初始化TabBar
-(void)setUpTabBar{
    
    [self.tabBar addSubview:({
        
        XGQBTabBar *tabBar = [[XGQBTabBar alloc] init];
        tabBar.frame     = self.tabBar.bounds;
        tabBar.delegate  = self;
        
        self.customTabBar = tabBar;
    })];
}

#pragma mark - 初始化VCs
-(void)setUpAllChildViewControllers
{
    _VCs = @[].mutableCopy;
    XGQBHomeViewController *homeVC = [[XGQBHomeViewController alloc]init];
    [self setupChildViewController:homeVC title:@"首页" imageName:@"sy_shouye2" seleceImageName:@"sy_shouye1"];
    
//    删除新光币相关页
//    XGQBCoinViewController *iconVC = [[XGQBCoinViewController alloc]init];
//    [self setupChildViewController:iconVC title:@"新光币" imageName:@"sy_xinguangbi2" seleceImageName:@"sy_xinguangbi1"];
    
    XGQBMessageViewController *msgVC = [XGQBMessageViewController new];
    [self setupChildViewController:msgVC title:@"消息" imageName:@"sy_xiaoxi2" seleceImageName:@"sy_xiaoxi1"];
    
    
    XGQBMineViewController *mineVC = [[XGQBMineViewController alloc]init];
    [self setupChildViewController:mineVC title:@"我的" imageName:@"sy_wode2" seleceImageName:@"sy_wode1"];
    
    self.viewControllers = _VCs;
    
}

-(void)setupChildViewController:(UIViewController*)controller title:(NSString *)title imageName:(NSString *)imageName seleceImageName:(NSString *)selectImageName{
    
    controller.tabBarItem.title = title;
    controller.tabBarItem.image = [UIImage imageNamed:imageName];
    controller.tabBarItem.selectedImage = [UIImage imageNamed:selectImageName];
    
    //包装导航控制器
    XGQBRootNavigationController *nav = [[XGQBRootNavigationController alloc]initWithRootViewController:controller];
    controller.title = title;
    
    [_VCs addObject:nav];
    
}
#pragma mark - 取出系统自带的TabBar并把里面的按钮删除掉
-(void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    [self removeOriginControls];
}

-(void)removeOriginControls
{
    [self.tabBar.subviews enumerateObjectsUsingBlock:^(__kindof UIView * obj, NSUInteger idx, BOOL * stop) {
        
        if ([obj isKindOfClass:[UIControl class]]) {
            
            [obj removeFromSuperview];
        }
    }];
}
#pragma mark - 统一设置tabBarItem属性并添加到TabBar
- (void)setViewControllers:(NSArray *)viewControllers {
    
    self.customTabBar.badgeTitleFont         = kSYSTEMFONT(11.0f);
    self.customTabBar.itemTitleFont          = kSYSTEMFONT(10.0f);
    self.customTabBar.itemImageRatio         = self.itemImageRatio == 0 ? 0.7 : self.itemImageRatio;
    self.customTabBar.itemTitleColor         = kBlackColor;
    self.customTabBar.selectedItemTitleColor = kRedColor;
    self.customTabBar.tabBarItemCount = viewControllers.count;
    
    [viewControllers enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        
        UIViewController *VC = (UIViewController *)obj;
        
        UIImage *selectedImage = VC.tabBarItem.selectedImage;
        VC.tabBarItem.selectedImage = [selectedImage imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
        
        [self addChildViewController:VC];
        
        [self.customTabBar addTabBarItem:VC.tabBarItem];
    }];
}

#pragma mark - 选中某个tab
-(void)setSelectedIndex:(NSUInteger)selectedIndex
{
    [super setSelectedIndex:selectedIndex];
    self.customTabBar.selectedItem.selected = NO;
    self.customTabBar.selectedItem = self.customTabBar.tabBarItems[selectedIndex];
    self.customTabBar.selectedItem.selected = YES;
}

#pragma mark - TabBarDelegate Method

-(void)tabBar:(UITabBar *)tabBar didSelectedItemFrom:(NSInteger)from to:(NSInteger)to
{
    self.selectedIndex = to;
}



@end
