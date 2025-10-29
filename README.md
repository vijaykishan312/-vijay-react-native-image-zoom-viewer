# React Native Image Zoom Viewer

A powerful, high-performance React Native component for viewing images with native zoom capabilities. This component provides smooth pinch-to-zoom, double tap gestures, and native implementation for optimal performance.

## Features

- ✨ Native zoom implementation for optimal performance
- 🔍 Smooth pinch-to-zoom and pan gestures
- 👆 Double-tap to zoom functionality
- 🖼️ Support for both local and remote images
- 📱 Fully responsive design
- 🎨 Customizable header and footer
- ⚡️ Fast image loading with caching
- 💫 Loading indicators
- 📤 Built-in sharing capabilities
- 🎭 Custom header and footer components
- � Swipe to dismiss
- 🔄 Multiple image support with swipe navigation

## Installation

```bash
# Using npm
npm install @vijaykishan312/react-native-image-zoom-viewer

# Using yarn
yarn add @vijaykishan312/react-native-image-zoom-viewer
```

## Usage

```jsx
import React, { useState } from "react";
import { View } from "react-native";
import ImageZoomViewer from "@vijaykishan312/react-native-image-zoom-viewer";

const App = () => {
  const [visible, setVisible] = useState(false);

  const images = [
    {
      url: "https://example.com/image1.jpg",
      title: "Beautiful Landscape",
      description: "A stunning view of mountains",
    },
  ];

  return (
    <ImageZoomViewer
      visible={visible}
      imageUrls={images}
      onSwipeDown={() => setVisible(false)}
      enableSwipeDown={true}
      backgroundColor="rgba(0,0,0,0.9)"
      renderHeader={() => (
        <View style={styles.header}>
          <Text style={styles.title}>{images[0].title}</Text>
        </View>
      )}
      renderFooter={() => (
        <View style={styles.footer}>
          <Text style={styles.description}>{images[0].description}</Text>
        </View>
      )}
    />
  );
};

export default App;
```

## Props

| Prop                  | Type     | Description                              |
| --------------------- | -------- | ---------------------------------------- |
| `visible`             | boolean  | Controls the visibility of the viewer    |
| `imageUrls`           | Array    | Array of image objects with url property |
| `index`               | number   | Initial image index to display           |
| `enableSwipeDown`     | boolean  | Enable swipe down to close               |
| `onSwipeDown`         | function | Called when swiped down                  |
| `backgroundColor`     | string   | Background color of the viewer           |
| `minScale`            | number   | Minimum zoom scale (default: 0.8)        |
| `maxScale`            | number   | Maximum zoom scale (default: 3)          |
| `doubleClickInterval` | number   | Interval for double tap (default: 300ms) |
| `renderHeader`        | function | Custom header component                  |
| `renderFooter`        | function | Custom footer component                  |
| `onMove`              | function | Called when changing images              |

## Example

Check out our [example app](https://github.com/vijaykishan312/react-native-image-zoom-viewer/tree/main/example) for a complete implementation showing all features.

## Demo

![Demo](https://raw.githubusercontent.com/vijaykishan312/react-native-image-zoom-viewer/main/example/assets/demo.gif)

## Contributing

Pull requests are welcome! Feel free to contribute to make this component even better.

## License

MIT © [Vijay Kishan](https://github.com/vijaykishan312)
};

````

### Gallery Implementation

Check out the full gallery implementation in the [example folder](./example/ImageGallery.js).

## 📋 Props

### Basic Props

| Prop             | Type     | Required | Description                                 |
| ---------------- | -------- | -------- | ------------------------------------------- |
| `visible`        | boolean  | Yes      | Controls the visibility of the modal        |
| `onRequestClose` | function | Yes      | Callback when modal is closing              |
| `imageSource`    | object   | Yes      | Image source (remote URL or local resource) |
| `title`          | string   | No       | Title displayed in the header               |

### Customization Props

| Prop              | Type     | Required | Description                                                   |
| ----------------- | -------- | -------- | ------------------------------------------------------------- |
| `renderHeader`    | function | No       | Custom header component renderer                              |
| `renderFooter`    | function | No       | Custom footer component renderer                              |
| `backgroundColor` | string   | No       | Background color of the modal (default: 'rgba(0, 0, 0, 0.9)') |
| `blurType`        | string   | No       | Blur effect type ('dark', 'light', 'extraDark')               |

### Zoom Control Props

| Prop             | Type   | Required | Description                                |
| ---------------- | ------ | -------- | ------------------------------------------ |
| `minScale`       | number | No       | Minimum zoom scale (default: 1.0)          |
| `maxScale`       | number | No       | Maximum zoom scale (default: 3.0)          |
| `initialScale`   | number | No       | Initial zoom scale (default: 1.0)          |
| `doubleTapScale` | number | No       | Scale applied on double tap (default: 2.0) |

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
````

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
