//
//  XGQBHomeBannerView.m
//  XinguangWallet
//
//  Created by BossKing on 2017/10/10.
//  Copyright © 2017年 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeBannerView.h"

@interface XGQBHomeBannerView()

@property (nonatomic,strong) UIScrollView *scrV;
@property (nonatomic,strong) UIPageControl *pageControl;
@property (nonatomic,strong) NSTimer *timer;
@property (nonatomic,assign) CGFloat pageWidth;
@property (nonatomic,assign) int currentPage;


@end

@implementation XGQBHomeBannerView



-(void)setCurrentPage:(int)currentPage
{
    _currentPage = currentPage;
    _pageControl.currentPage = currentPage;
    [_scrV setContentOffset:CGPointMake((currentPage-1)*_pageWidth,0) animated:YES];
}


-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    _pageWidth = frame.size.width;
    
    UIScrollView *scrView = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];

    //创建临时图片
    UIImage *img_1 = [self createImageWithColor:kRandomColor andFrame:frame];
    UIImage *img_2 = [self createImageWithColor:kRandomColor andFrame:frame];
    UIImage *img_3 = [self createImageWithColor:kRandomColor andFrame:frame];
    UIImageView *page_1 = [[UIImageView alloc]initWithImage:img_1];
    UIImageView *page_2 = [[UIImageView alloc]initWithImage:img_2];
    UIImageView *page_3 = [[UIImageView alloc]initWithImage:img_3];
    
    //设置SV的contentsize
    scrView.contentSize = CGSizeMake(frame.size.width*3, frame.size.height);
    
    page_1.frame = CGRectMake(0, 0, frame.size.width, frame.size.height);
    [scrView addSubview:page_1];

    page_2.frame = CGRectMake(frame.size.width, 0, frame.size.width, frame.size.height);
    [scrView addSubview:page_2];

    page_3.frame = CGRectMake(frame.size.width*2, 0, frame.size.width, frame.size.height);
    [scrView addSubview:page_3];


    scrView.pagingEnabled = YES;
    scrView.showsHorizontalScrollIndicator = NO;
    scrView.delegate = self;
    _scrV = scrView;
    
    [self addSubview:scrView];
    
    //添加pageControl
    UIPageControl *pageControl = [[UIPageControl alloc]initWithFrame:CGRectMake(0, 0, 100, 10)];
    pageControl.pageIndicatorTintColor = kWhiteColor;
    pageControl.currentPageIndicatorTintColor = kBlackColor;
    pageControl.currentPage = 1;
    pageControl.numberOfPages = 3;
    pageControl.userInteractionEnabled = NO;
    _pageControl = pageControl;
    [self addSubview:pageControl];
    
    [pageControl mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self);
        make.bottom.equalTo(self);
    }];
   self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
    
    ViewBorderRadius(self, 3.0, 1, kBlackColor);
    return self;
}

//创建单色图片
- (UIImage*)createImageWithColor: (UIColor*)color andFrame:(CGRect)frame
{
    UIGraphicsBeginImageContext(frame.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, frame);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}

#pragma mark - ScrollView代理方法
-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    self.pageControl.currentPage = scrollView.contentOffset.x/scrollView.frame.size.width;
}

-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    [self.timer invalidate];
    self.timer = nil;
}

-(void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    self.timer = nil;
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
}

-(void)repeatAction
{
    if (_currentPage<3) {
        self.currentPage ++;
    }else if(_currentPage ==3)
    {
        self.currentPage=1;
    }
}

@end
