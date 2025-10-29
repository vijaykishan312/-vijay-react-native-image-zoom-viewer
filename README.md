# React Native Image Zoom Viewer

🖼️ A beautiful, high-performance React Native component for viewing images with native zoom capabilities. This component provides a premium user experience with smooth animations, blurred backgrounds, and native implementation for optimal performance.

![Demo](demo.gif)

## ✨ Features

- 🚀 Native zoom implementation for optimal performance
- 🎯 Smooth pinch-to-zoom and pan gestures
- 🌟 Beautiful blur effects and animations
- 🎨 Customizable header and footer
- 🖼️ Support for both local and remote images
- 📱 Double-tap to zoom
- 💫 Loading indicators and fade animations
- 🌓 Dark mode support
- 📤 Built-in sharing capabilities
- 🎭 Custom header and footer components
- 🎟️ Image gallery support
- ⚡️ Optimized image loading and caching

## 📦 Installation

```bash
# Using npm
npm install react-native-image-zoom-viewer @react-native-community/blur

# Using yarn
yarn add react-native-image-zoom-viewer @react-native-community/blur
```

### iOS Setup

1. Navigate to the iOS folder and install pods:

```bash
cd ios && pod install && cd ..
```

### Android Setup

No additional setup required for Android.

## 🛠️ Requirements

- React Native >= 0.63.0
- iOS >= 11.0
- Android >= API 21

## 📖 Usage

### Basic Usage

```javascript
import React, { useState } from 'react';
import { ImageZoomViewer } from 'react-native-image-zoom-viewer';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <ImageZoomViewer
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      imageSource={{ uri: 'https://example.com/image.jpg' }}
      title="My Image"
    />
  );
};
```

### Advanced Usage with Custom Components

```javascript
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Share } from 'react-native';
import { ImageZoomViewer } from 'react-native-image-zoom-viewer';

const MyGalleryImage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const renderHeader = (onClose) => (
    <View style={styles.header}>
      <Text style={styles.title}>Beautiful Landscape</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity 
      style={styles.shareButton}
      onPress={() => Share.share({ url: imageSource.uri })}
    >
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  );

  return (
    <ImageZoomViewer
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      imageSource={{ uri: 'https://example.com/image.jpg' }}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      backgroundColor="rgba(0, 0, 0, 0.9)"
      blurType="dark"
    />
  );
};
```

### Gallery Implementation

Check out the full gallery implementation in the [example folder](./example/ImageGallery.js).

## 📋 Props

### Basic Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | boolean | Yes | Controls the visibility of the modal |
| `onRequestClose` | function | Yes | Callback when modal is closing |
| `imageSource` | object | Yes | Image source (remote URL or local resource) |
| `title` | string | No | Title displayed in the header |

### Customization Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `renderHeader` | function | No | Custom header component renderer |
| `renderFooter` | function | No | Custom footer component renderer |
| `backgroundColor` | string | No | Background color of the modal (default: 'rgba(0, 0, 0, 0.9)') |
| `blurType` | string | No | Blur effect type ('dark', 'light', 'extraDark') |

### Zoom Control Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `minScale` | number | No | Minimum zoom scale (default: 1.0) |
| `maxScale` | number | No | Maximum zoom scale (default: 3.0) |
| `initialScale` | number | No | Initial zoom scale (default: 1.0) |
| `doubleTapScale` | number | No | Scale applied on double tap (default: 2.0) |

## 🎨 Styling

The component is highly customizable through the style props and custom renderers. Here are some examples:

### Custom Header Style

```javascript
const renderHeader = (onClose) => (
  <View style={styles.customHeader}>
    <Text style={styles.title}>My Image</Text>
    <TouchableOpacity onPress={onClose}>
      <Text style={styles.closeButton}>Close</Text>
    </TouchableOpacity>
  </View>
);
```

### Custom Animation

You can customize the fade animation duration through props:

```javascript
<ImageZoomViewer
  animationDuration={500} // in milliseconds
  // ... other props
/>
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped make this component better
- Inspired by native gallery implementations on iOS and Android
