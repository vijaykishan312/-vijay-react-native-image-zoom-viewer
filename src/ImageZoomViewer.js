import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  requireNativeComponent,
  Platform,
  Animated,
  StatusBar,
  Text,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const RNImageZoomView = requireNativeComponent('RNImageZoomView');

const ImageZoomViewer = ({ 
  visible, 
  onRequestClose, 
  imageSource,
  title,
  renderHeader,
  renderFooter,
  backgroundColor = 'rgba(0, 0, 0, 0.9)',
  blurType = 'dark',
}) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  React.useEffect(() => {
    if (visible) {
      StatusBar.setHidden(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      StatusBar.setHidden(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const onImageLoad = () => {
    setIsImageLoaded(true);
  };

  const imageStyle = {
    width: windowWidth,
    height: windowHeight * 0.9,
    opacity: fadeAnim,
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={blurType}
        blurAmount={20}
      />
      <View style={[styles.container, { backgroundColor }]}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          {renderHeader ? (
            renderHeader(onRequestClose)
          ) : (
            <View style={styles.headerContent}>
              {title && <Text style={styles.title}>{title}</Text>}
              <TouchableOpacity
                onPress={onRequestClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Image */}
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <RNImageZoomView
            style={[styles.image, imageStyle]}
            source={Platform.select({
              ios: imageSource,
              android: imageSource.uri
            })}
            minScale={1.0}
            maxScale={3.0}
            onLoadComplete={onImageLoad}
          />
          
          {!isImageLoaded && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingIndicator} />
            </View>
          )}
        </Animated.View>

        {/* Footer */}
        {renderFooter && (
          <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            {renderFooter()}
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
    animation: 'spin 1s linear infinite',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
});

export default ImageZoomViewer;