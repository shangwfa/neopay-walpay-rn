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
        if (bannerListArr.count>=3) {
            //添加第一页视图至最后一页
            XGQBHomeBannerItem *firstItem = bannerListArr[0];
            [bannerListArr addObject:firstItem];
            
            //添加最后一页视图至第一页
            XGQBHomeBannerItem *lastItem = bannerListArr[[bannerListArr count]-2];
            [bannerListArr insertObject:lastItem atIndex:0];
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
    
    //如果没有值,显示一张默认图
    if (_bannerListArr.count==0) {
        UIImage *img = [UIImage imageNamed:@"beijing"];
        UIImageView *imgV = [[UIImageView alloc]initWithImage:img];
        [_scrV addSubview:imgV];
        }
    //如果有值,开始从数组取出数据
    else{
    for (int i=0; i<_bannerListArr.count; i++) {
        //创建默认背景图片
        UIImage *img = [UIImage imageNamed:@"beijing"];
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
    pageControl.numberOfPages = _bannerListArr.count-2;
    pageControl.userInteractionEnabled = NO;
    _pageControl = pageControl;
    [self addSubview:pageControl];
    
    [pageControl mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self);
        make.bottom.equalTo(self);
    }];
    
    [_scrV setContentOffset:CGPointMake(frame.size.width, 0)];

    
    //开始自动滚屏
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
    }
}

#pragma mark - ScrollView代理方法
-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    self.pageControl.currentPage = scrollView.contentOffset.x/(scrollView.frame.size.width)-0.55;
    
    //处理滑到尾部页码
    if (scrollView.contentOffset.x/(scrollView.frame.size.width)>_bannerListArr.count-1.5) {
        _pageControl.currentPage=0;
    }
    //处理滑到尾部之后重回头部
    if (scrollView.contentOffset.x/(scrollView.frame.size.width)>_bannerListArr.count-1.005) {
        
    //[_scrV setContentOffset:CGPointMake((scrollView.contentOffset.x-scrollView.frame.size.width*(_bannerListArr.count-2)),0) animated:NO];
     [_scrV setContentOffset:CGPointMake(scrollView.frame.size.width,0) animated:NO];
        
    }
    
    //处理滑到头部页码
    if (scrollView.contentOffset.x/(scrollView.frame.size.width)<0.5) {
        _pageControl.currentPage=_bannerListArr.count-1;
    }
    
    //处理滑到头部之后重回尾部
    if (scrollView.contentOffset.x/(scrollView.frame.size.width)<0.005) {
        
        [_scrV setContentOffset:CGPointMake(scrollView.frame.size.width*(_bannerListArr.count-2),0) animated:NO];
    }
    
}

-(void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    [self.timer invalidate];
    self.timer = nil;
}
-(void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(repeatAction) userInfo:nil repeats:YES];
}

-(void)repeatAction
{
    _currentPage=(int)_pageControl.currentPage+1;
    if (_currentPage<_bannerListArr.count-1) {
        self.currentPage ++;
        [_scrV setContentOffset:CGPointMake((_currentPage)*_pageWidth,0) animated:YES];

    }else if(_currentPage ==_bannerListArr.count-1)
    {
        self.currentPage=1;
        [_scrV setContentOffset:CGPointMake((_currentPage)*_pageWidth,0) animated:YES];
    }
   

}


@end
