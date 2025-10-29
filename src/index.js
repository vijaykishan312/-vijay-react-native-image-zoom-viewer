import { requireNativeComponent, UIManager, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-image-zoom-viewer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ComponentName = 'RNImageZoomView';

export const RNImageZoomView = UIManager.getViewManagerConfig(ComponentName) != null
  ? requireNativeComponent(ComponentName)
  : () => {
      throw new Error(LINKING_ERROR);
    };

export { ImageZoomViewer } from './src/ImageZoomViewer';