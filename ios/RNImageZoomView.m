#import "RNImageZoomView.h"
#import <React/RCTImageLoader.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>

@implementation RNImageZoomView {
    UIScrollView *_scrollView;
    UIImageView *_imageView;
    CGFloat _minScale;
    CGFloat _maxScale;
    CGFloat _initialScale;
    BOOL _enableDoubleTapZoom;
    RCTImageLoaderCancellationBlock _loadImageCancellationBlock;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    if (self = [super init]) {
        _bridge = bridge;
        [self setupView];
    }
    return self;
}

- (instancetype)init {
    if (self = [super init]) {
        [self setupView];
    }
    return self;
}

- (void)setupView {
    _scrollView = [[UIScrollView alloc] init];
    _scrollView.delegate = self;
    _scrollView.showsHorizontalScrollIndicator = NO;
    _scrollView.showsVerticalScrollIndicator = NO;
    _scrollView.bouncesZoom = YES;
    _scrollView.decelerationRate = UIScrollViewDecelerationRateFast;
    _scrollView.backgroundColor = [UIColor clearColor];
    _scrollView.clipsToBounds = YES;
    
    _imageView = [[UIImageView alloc] init];
    _imageView.contentMode = UIViewContentModeScaleAspectFit;
    _imageView.clipsToBounds = YES;
    [_scrollView addSubview:_imageView];
    
    [self addSubview:_scrollView];
    
    // Add double tap gesture
    UITapGestureRecognizer *doubleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleDoubleTap:)];
    doubleTap.numberOfTapsRequired = 2;
    [_scrollView addGestureRecognizer:doubleTap];
    
    // Set default values
    _minScale = 1.0;
    _maxScale = 3.0;
    _initialScale = 1.0;
    _enableDoubleTapZoom = YES;
    
    // Initialize image loading properties
    _loadImageCancellationBlock = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _scrollView.frame = self.bounds;
    
    if (_imageView.image) {
        // Calculate the aspect ratio scaling
        CGSize boundsSize = self.bounds.size;
        CGSize imageSize = _imageView.image.size;
        
        CGFloat xScale = boundsSize.width / imageSize.width;
        CGFloat yScale = boundsSize.height / imageSize.height;
        CGFloat minScale = MIN(xScale, yScale);
        
        _scrollView.minimumZoomScale = minScale;
        _scrollView.maximumZoomScale = _maxScale;
        
        // Set the frame to fit the image
        CGFloat width = imageSize.width * minScale;
        CGFloat height = imageSize.height * minScale;
        _imageView.frame = CGRectMake(0, 0, width, height);
        
        // Center the image
        CGFloat x = MAX((boundsSize.width - width) / 2, 0);
        CGFloat y = MAX((boundsSize.height - height) / 2, 0);
        _scrollView.contentInset = UIEdgeInsetsMake(y, x, y, x);
    }
}

#pragma mark - UIScrollViewDelegate

- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView {
    return _imageView;
}

- (void)scrollViewDidZoom:(UIScrollView *)scrollView {
    // Center the image view within the scroll view
    CGFloat imageViewWidth = _imageView.frame.size.width;
    CGFloat imageViewHeight = _imageView.frame.size.height;
    CGFloat scrollViewWidth = scrollView.bounds.size.width;
    CGFloat scrollViewHeight = scrollView.bounds.size.height;
    
    CGFloat horizontalInset = MAX((scrollViewWidth - imageViewWidth) / 2, 0);
    CGFloat verticalInset = MAX((scrollViewHeight - imageViewHeight) / 2, 0);
    
    scrollView.contentInset = UIEdgeInsetsMake(verticalInset, horizontalInset, verticalInset, horizontalInset);
    
    // Notify scale change
    if (self.onZoomScaleChange) {
        self.onZoomScaleChange(@{
            @"scale": @(scrollView.zoomScale)
        });
    }
}

- (void)handleDoubleTap:(UITapGestureRecognizer *)recognizer {
    if (!_enableDoubleTapZoom) return;
    
    if (_scrollView.zoomScale > _scrollView.minimumZoomScale) {
        [_scrollView setZoomScale:_scrollView.minimumZoomScale animated:YES];
    } else {
        CGPoint touchPoint = [recognizer locationInView:_imageView];
        CGFloat newZoomScale = (_scrollView.maximumZoomScale + _scrollView.minimumZoomScale) / 2;
        CGFloat w = self.bounds.size.width / newZoomScale;
        CGFloat h = self.bounds.size.height / newZoomScale;
        [_scrollView zoomToRect:CGRectMake(touchPoint.x - w/2, touchPoint.y - h/2, w, h) animated:YES];
    }
}

#pragma mark - Public Methods

- (void)setSource:(NSDictionary *)source {
    if (_loadImageCancellationBlock) {
        _loadImageCancellationBlock();
        _loadImageCancellationBlock = nil;
    }
    
    if (!source) {
        _imageView.image = nil;
        return;
    }
    
    if (self.onLoadStart) {
        self.onLoadStart(nil);
    }
    
    __weak typeof(self) weakSelf = self;
    _loadImageCancellationBlock = [_bridge.imageLoader loadImageWithURLRequest:[RCTConvert NSURLRequest:source[@"uri"]]
                                                                        size:CGSizeZero
                                                                       scale:RCTScreenScale()
                                                                     clipped:YES
                                                                  resizeMode:RCTResizeModeContain
                                                               progressBlock:nil
                                                             partialLoadBlock:nil
                                                              completionBlock:^(NSError *error, UIImage *image) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) {
            return;
        }
        
        strongSelf->_loadImageCancellationBlock = nil;
        
        if (error) {
            if (strongSelf.onError) {
                strongSelf.onError(@{@"error": error.localizedDescription});
            }
            if (strongSelf.onLoadEnd) {
                strongSelf.onLoadEnd(nil);
            }
            return;
        }
        
        strongSelf->_imageView.image = image;
        [strongSelf setNeedsLayout];
        
        if (strongSelf.onLoadEnd) {
            strongSelf.onLoadEnd(nil);
        }
    }];
}

- (void)setScale:(CGFloat)scale {
    _initialScale = scale;
    [_scrollView setZoomScale:scale animated:YES];
}

- (void)setMinScale:(CGFloat)minScale {
    _minScale = minScale;
    _scrollView.minimumZoomScale = minScale;
}

- (void)setMaxScale:(CGFloat)maxScale {
    _maxScale = maxScale;
    _scrollView.maximumZoomScale = maxScale;
}

- (void)setEnableDoubleTapZoom:(BOOL)enable {
    _enableDoubleTapZoom = enable;
}

@end