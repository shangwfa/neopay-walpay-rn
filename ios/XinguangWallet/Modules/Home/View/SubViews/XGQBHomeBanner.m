//
//  XGQBHomeBanner.m
//  XinguangWallet
//
//  Created by BossKing on 2017/10/10.
//  Copyright © 2017年 Hangzhou Neopay Co.,Ltd. All rights reserved.
//

#import "XGQBHomeBanner.h"
#import "XGQBHomeBannerItem.h"


@interface XGQBHomeBanner()

@property (nonatomic,strong) UIScrollView *scrV;
@property (nonatomic,strong) UIPageControl *pageControl;
@property (nonatomic,strong) NSTimer *timer;
@property (nonatomic,assign) CGFloat pageWidth;
@property (nonatomic,assign) int currentPage;
@property (nonatomic,strong) NSArray <XGQBHomeBannerItem*>*bannerListArr;


@end

@implementation XGQBHomeBanner





-(instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    //添加网络请求
    [self loadBannerListRequest:frame];
    
    _pageWidth = frame.size.width;
    
    UIScrollView *scrView = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
    _scrV = scrView;
    
    _scrV.pagingEnabled = YES;
    _scrV.showsHorizontalScrollIndicator = NO;
    _scrV.showsVerticalScrollIndicator = NO;
    _scrV.delegate = self;
    
    [self addSubview:_scrV];
    kViewRadius(self, 3.0);
    
    return self;
}

-(void)loadBannerListRequest:(CGRect)frame
{
    NSMutableDictionary *body = [NSMutableDictionary new];
    [body setValue:[GVUserDefaults standardUserDefaults].accessToken forKey:@"accessToken"];
    [body setValue:@1 forKey:@"position"];
    [MerchantCoreService queryBannerList:body andSuccessFn:^(id responseAfter, id responseBefore) {
        
        NSMutableArray *bannerListArr = [NSMutableArray array];
        for (NSDictionary *dict in responseAfter) {
            XGQBHomeBannerItem *item = [XGQBHomeBannerItem modelWithJSON:dict];
            [bannerListArr addObject:item];
        }
        _bannerListArr = bannerListArr;
        [self addScrSubViews:frame];
    } andFailerFn:^(NSError *error) {
        nil;
    }];
}

-(void)addScrSubViews:(CGRect)frame{
    //设置SV的contentsize
    _scrV.contentSize = CGSizeMake((frame.size.width)*(_bannerListArr.count), frame.size.height);
    
    
    for (int i=0; i<_bannerListArr.count; i++) {
        //创建临时图片
        UIImage *img = [self createImageWithColor:kRandomColor andFrame:frame];
        UIImageView *page = [UIImageView new];
        [page sd_setImageWithURL:[NSURL URLWithString:_bannerListArr[i].imageUrl] placeholderImage:img];
        page.frame = CGRectMake(i*frame.size.width, 0, frame.size.width, frame.size.height);
        [_scrV addSubview:page];
    }

    //添加pageControl
    UIPageControl *pageControl = [[UIPageControl alloc]initWithFrame:CGRectMake(0, 0, 100, 10)];
    pageControl.pageIndicatorTintColor = kWhiteColor;
    pageControl.currentPageIndicatorTintColor = kBlackColor;
    pageControl.currentPage = 1;
    pageControl.numberOfPages = _bannerListArr.count;
    pageControl.userInteractionEnabled = NO;
    _pageControl = pageControl;
    [self addSubview:pageControl];
    
    [pageControl mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self);
        make.bottom.equalTo(self);
    }];
    
//    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
    
}

//创建单色图片 temp
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
    self.pageControl.currentPage = scrollView.contentOffset.x/(scrollView.frame.size.width-1);
}

-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
//    [self.timer invalidate];
//    self.timer = nil;
}
-(void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
//    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
}


-(void)repeatAction
{
    if (_currentPage<_bannerListArr.count) {
        self.currentPage ++;
    }else if(_currentPage ==_bannerListArr.count)
    {
        self.currentPage=1;
    }
}

-(void)setCurrentPage:(int)currentPage
{
    _currentPage = currentPage;
    _pageControl.currentPage = currentPage;
    [_scrV setContentOffset:CGPointMake((currentPage-1)*_pageWidth,0) animated:YES];
}

@end
