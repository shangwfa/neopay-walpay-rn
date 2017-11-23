//
//  XGQBAPPRootViewController.m
//  XinguangWallet
//
//  Created by BossKing on 23/11/2017.
//  Copyright © 2017 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBAPPRootViewController.h"
#import "UIView+Transform.h"

@interface XGQBAPPRootViewController ()

@property (nonatomic,strong) UIPanGestureRecognizer *panToRightGes;
@property (nonatomic,weak) UIView *blockView;
@end

@implementation XGQBAPPRootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

+(instancetype)setupSideVCAndNavVC
{
    XGQBAPPRootViewController *rootVC = [[XGQBAPPRootViewController alloc]init];
    
    XGQBSideViewController *sideVC = [[XGQBSideViewController alloc]init];
    XGQBHomeViewController *homeVC = [[XGQBHomeViewController alloc]init];
    XGQBRootNavigationController *homeNAV = [[XGQBRootNavigationController alloc]initWithRootViewController:homeVC];
    
    [rootVC addChildViewController:sideVC];
    [rootVC addChildViewController:homeNAV];
    
    [rootVC.view addSubview:sideVC.view];
    [rootVC.view addSubview:homeNAV.view];
    
    rootVC.rootNAV = homeNAV;
    rootVC.sideVC = sideVC;
    rootVC.homeVC = homeVC;
    rootVC.sideView = (XGQBSideView*)sideVC.view;
    
    //增加右划手势
    [rootVC addGesture];
    //增加蒙版
    [rootVC addBlockView];
    
    return rootVC;
}

-(void)addGesture{
    UIPanGestureRecognizer *panToRight = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(panToRight:)];
    self.panToRightGes = panToRight;
    
    [self.rootNAV.view addGestureRecognizer:panToRight];
    
    [kNotificationCenter addObserver:self selector:@selector(removePanToRightGes) name:kNotificationNavPushToSecondLevel object:nil];
    [kNotificationCenter addObserver:self selector:@selector(addPanToRightGes) name:kNotificationNavPopToFirstLevel object:nil];
}

-(void)addBlockView{
    UIView *blockView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    blockView.backgroundColor = [UIColor colorWithHexString:@"000000"];
    blockView.alpha=0;
    self.blockView=blockView;
    [self.rootNAV.view addSubview:blockView];
    
    UITapGestureRecognizer *tapOnBlockView = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapOnBlockView)];
    [blockView addGestureRecognizer:tapOnBlockView];
    
}

-(void)closeSideView
{
    [UIView animateWithDuration:0.2f animations:^{
        _rootNAV.view.transform=CGAffineTransformMakeTranslation(0, 0);;
        _sideView.tx = _rootNAV.view.tx/2.0;
        _blockView.alpha=0.0;
    }];
}


-(void)tapOnBlockView
{
    [UIView animateWithDuration:0.2f animations:^{
        _rootNAV.view.transform=CGAffineTransformMakeTranslation(0, 0);;
        _sideView.tx = _rootNAV.view.tx/2.0;
        _blockView.alpha=0.0;
    }];
}

-(void)removePanToRightGes
{
    if (_panToRightGes) {
        [self.rootNAV.view removeGestureRecognizer:_panToRightGes];
    }
}
-(void)addPanToRightGes{
    if (_panToRightGes) {
        [self.rootNAV.view addGestureRecognizer:_panToRightGes];
    }
}



-(void)panToRight:(UIPanGestureRecognizer*)sender
{
    //判断navigationVC是否在第一级页面
    if (self.rootNAV.childViewControllers.count>1) {
        return;
    }
    
    /** 注：
     *   [kAppDelegate window].subviews.firstObject.tx = sender.view.tx / 3;
     *   sender.view.tx / 3 的原因是要让中心控制器每向右移动一像素，左侧视图就向右移动 1/3 像素
     *   另外在初始化左侧视图的时候将其 frame.origin.x 设置为 -kScreenWidth * (1 - kLeftWidthScale), 这样将 tx / 3 就会刚好在左侧视图刚好展示完成时保证左侧视图的 origin.x与屏幕左侧边缘重合
     */
    // 1. 获取手指拖拽的时候，平移的值
    CGPoint translation = [sender translationInView:sender.view];
    //    NSLog(@"%@",NSStringFromCGPoint(translation));
    // 2. 让当前视图进行平移
    sender.view.transform = CGAffineTransformTranslate(sender.view.transform, translation.x, 0);
    _sideView.tx = sender.view.tx/2.0;
    // 3. 让平移的值不要累加
    [sender setTranslation:CGPointZero inView:sender.view];
    // 4. 获取最右边的范围
    CGFloat rightScopeTransformMaxX = (CGFloat)kScreenWidth*kSideViewRatio;
    
    if (sender.view.tx > rightScopeTransformMaxX) {
        // 当移动到右边极限时
        // 限制最右边的范围
        sender.view.transform = CGAffineTransformMakeTranslation(rightScopeTransformMaxX, 0);
        _sideView.tx = sender.view.tx/2.0;
    } else if (sender.view.tx < 0.0) {
        // 限制最左边的范围
        sender.view.transform = CGAffineTransformMakeTranslation(0, 0);
        _sideView.tx = sender.view.tx/2.0;
    }
    
    // 拖拽结束时
    if (sender.state == UIGestureRecognizerStateEnded) {
        [UIView animateWithDuration:0.2f animations:^{
            if (sender.view.left > kScreenWidth * kSideViewRatio*0.5) {
                sender.view.tx = rightScopeTransformMaxX;
                _sideView.tx = sender.view.tx/2.0;
                _blockView.alpha=0.7;
                
            } else {
                sender.view.transform = CGAffineTransformIdentity;
                _sideView.tx = sender.view.tx/2.0;
                _blockView.alpha=0.0;
            }
        }];
    }
}


@end
