import UIKit

@objc(RNImageZoomViewManager)
class RNImageZoomViewManager: RCTViewManager {
    override func view() -> UIView! {
        return RNImageZoomView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

class RNImageZoomView: UIScrollView, UIScrollViewDelegate {
    private var imageView: UIImageView!
    private var currentScale: CGFloat = 1.0
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        imageView = UIImageView()
        imageView.contentMode = .scaleAspectFit
        addSubview(imageView)
        
        delegate = self
        minimumZoomScale = 1.0
        maximumZoomScale = 3.0
        showsHorizontalScrollIndicator = false
        showsVerticalScrollIndicator = false
        
        let doubleTapGesture = UITapGestureRecognizer(target: self, action: #selector(handleDoubleTap(_:)))
        doubleTapGesture.numberOfTapsRequired = 2
        addGestureRecognizer(doubleTapGesture)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        if let image = imageView.image {
            let viewSize = bounds.size
            let imageSize = image.size
            
            let scaleWidth = viewSize.width / imageSize.width
            let scaleHeight = viewSize.height / imageSize.height
            let minScale = min(scaleWidth, scaleHeight)
            
            minimumZoomScale = minScale
            
            if zoomScale == 1.0 {
                zoomScale = minScale
            }
            
            imageView.frame = CGRect(origin: .zero, size: imageSize)
            contentSize = imageSize
            
            centerImage()
        }
    }
    
    private func centerImage() {
        let boundsSize = bounds.size
        var frameToCenter = imageView.frame
        
        if frameToCenter.size.width < boundsSize.width {
            frameToCenter.origin.x = (boundsSize.width - frameToCenter.size.width) / 2
        } else {
            frameToCenter.origin.x = 0
        }
        
        if frameToCenter.size.height < boundsSize.height {
            frameToCenter.origin.y = (boundsSize.height - frameToCenter.size.height) / 2
        } else {
            frameToCenter.origin.y = 0
        }
        
        imageView.frame = frameToCenter
    }
    
    @objc func setSource(_ source: NSDictionary) {
        if let uri = source["uri"] as? String {
            if uri.hasPrefix("http") {
                // Load remote image
                if let url = URL(string: uri) {
                    URLSession.shared.dataTask(with: url) { [weak self] data, _, _ in
                        if let data = data, let image = UIImage(data: data) {
                            DispatchQueue.main.async {
                                self?.imageView.image = image
                                self?.setNeedsLayout()
                            }
                        }
                    }.resume()
                }
            } else {
                // Load local image
                if let image = UIImage(named: uri) {
                    imageView.image = image
                    setNeedsLayout()
                }
            }
        }
    }
    
    @objc func setScale(_ scale: CGFloat) {
        currentScale = scale
        setZoomScale(scale, animated: true)
    }
    
    @objc func handleDoubleTap(_ gesture: UITapGestureRecognizer) {
        if zoomScale > minimumZoomScale {
            setZoomScale(minimumZoomScale, animated: true)
        } else {
            let location = gesture.location(in: imageView)
            let zoomRect = CGRect(x: location.x - 50, y: location.y - 50, width: 100, height: 100)
            zoom(to: zoomRect, animated: true)
        }
    }
    
    // MARK: - UIScrollViewDelegate
    
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return imageView
    }
    
    func scrollViewDidZoom(_ scrollView: UIScrollView) {
        centerImage()
    }
}