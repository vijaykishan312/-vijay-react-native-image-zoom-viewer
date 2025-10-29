#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RNImageZoomViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(scale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(maxScale, CGFloat)

@end