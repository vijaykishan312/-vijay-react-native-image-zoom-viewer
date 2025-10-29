#import <React/RCTView.h>
#import <React/RCTBridge.h>
#import <React/RCTComponent.h>

@interface RNImageZoomView : RCTView <UIScrollViewDelegate>

@property (nonatomic, copy) RCTDirectEventBlock onZoomScaleChange;
@property (nonatomic, copy) RCTDirectEventBlock onLoadStart;
@property (nonatomic, copy) RCTDirectEventBlock onLoadEnd;
@property (nonatomic, copy) RCTDirectEventBlock onError;
@property (nonatomic, weak) RCTBridge *bridge;

- (instancetype)initWithBridge:(RCTBridge *)bridge;
- (void)setSource:(NSDictionary *)source;
- (void)setScale:(CGFloat)scale;
- (void)setMinScale:(CGFloat)minScale;
- (void)setMaxScale:(CGFloat)maxScale;
- (void)setEnableDoubleTapZoom:(BOOL)enable;

@end

NS_ASSUME_NONNULL_END

#endif /* RNImageZoomView_h */