package com.imagezoomviewer;

import android.content.Context;
import android.graphics.Matrix;
import android.graphics.PointF;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.widget.ImageView;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNImageZoomViewManager extends SimpleViewManager<ZoomableImageView> {
    public static final String REACT_CLASS = "RNImageZoomView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ZoomableImageView createViewInstance(ThemedReactContext reactContext) {
        return new ZoomableImageView(reactContext);
    }

    @ReactProp(name = "source")
    public void setSource(ZoomableImageView view, String source) {
        view.setImageSource(source);
    }

    @ReactProp(name = "scale")
    public void setScale(ZoomableImageView view, float scale) {
        view.setScale(scale);
    }
}