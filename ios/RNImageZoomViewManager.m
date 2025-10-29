#import <React/RCTViewManager.h>
#import "RNImageZoomView.h"

@interface RNImageZoomViewManager : RCTViewManager
@end

@implementation RNImageZoomViewManager

RCT_EXPORT_MODULE(RNImageZoomView)

- (UIView *)view {
    RNImageZoomView *imageView = [[RNImageZoomView alloc] initWithBridge:self.bridge];
    return imageView;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(scale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(enableDoubleTapZoom, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onZoomScaleChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadEnd, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

@end