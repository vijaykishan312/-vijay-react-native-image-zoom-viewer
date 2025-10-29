import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ImageZoomViewer } from 'react-native-image-zoom-viewer';

const ExampleApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageSource = { uri: 'https://example.com/your-image.jpg' };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image
          source={imageSource}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <ImageZoomViewer
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        imageSource={imageSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
  },
});

export default ExampleApp;