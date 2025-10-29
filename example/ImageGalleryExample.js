import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Share,
  StatusBar,
} from 'react-native';
import ImageZoomViewer from '../src/ImageZoomViewer';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = (width - SPACING * 4) / 3;

const images = [
  {
    id: '1',
    title: 'Mountain View',
    uri: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606',
  },
  {
    id: '2',
    title: 'Ocean Sunset',
    uri: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda',
  },
  {
    id: '3',
    title: 'Forest Path',
    uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  },
];

const ImageGalleryExample = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleShare = async () => {
    if (selectedImage) {
      try {
        await Share.share({
          url: selectedImage.uri,
          message: selectedImage.title,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const renderHeader = (onClose) => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{selectedImage?.title}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Image Gallery</Text>
      <View style={styles.gallery}>
        {images.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={styles.thumbnailContainer}
            onPress={() => {
              setSelectedImage(image);
              setIsVisible(true);
            }}
          >
            <Image
              source={{ uri: image.uri }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle} numberOfLines={1}>
                {image.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ImageZoomViewer
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        imageSource={{ uri: selectedImage?.uri }}
        title={selectedImage?.title}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        backgroundColor="rgba(0, 0, 0, 0.9)"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING,
  },
  thumbnailContainer: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    margin: SPACING / 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  imageTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  shareButton: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImageGalleryExample;