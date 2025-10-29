import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Share,
} from 'react-native';
import { ImageZoomViewer } from '../src/ImageZoomViewer';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = (width - SPACING * 4) / 3;

const IMAGES = [
  {
    id: '1',
    title: 'Mountain Landscape',
    uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200',
  },
  {
    id: '2',
    title: 'Ocean View',
    uri: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200',
  },
  {
    id: '3',
    title: 'Forest Path',
    uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
  },
  // Add more images as needed
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const openImage = (image) => {
    setSelectedImage(image);
    setIsVisible(true);
  };

  const shareImage = async () => {
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
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <TouchableOpacity onPress={shareImage} style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.thumbContainer}
      onPress={() => openImage(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <BlurView style={styles.titleContainer} blurType="dark" blurAmount={10}>
        <Text style={styles.imageTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.galleryTitle}>Photo Gallery</Text>
      
      <FlatList
        data={IMAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />

      <ImageZoomViewer
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        imageSource={{ uri: selectedImage?.uri }}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        title={selectedImage?.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: '#000000',
  },
  gridContainer: {
    padding: SPACING,
  },
  thumbContainer: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginHorizontal: SPACING / 2,
    marginBottom: SPACING,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImageGallery;