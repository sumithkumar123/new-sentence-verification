import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const ImageGrid = ({ images, screen, backgroundColors, handleChoice, shadowColor = '#0076a3', shadowOffset = { x: 6, y: 5 }, shadowRadius = 4 }) => {
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    const loadImage = async (imageName) => {
      const image = await import(`../assets/images/screen_${screen}_imgs/${imageName}`);
      return image.default;
    };

    const fetchImages = async () => {
      const loadedImages = {};
      for (let image of images) {
        const src = await loadImage(image);
        loadedImages[image] = src;
      }
      setImageSources(loadedImages);
    };

    fetchImages();
  }, [images, screen]);

  return (
    <div className="container d-flex align-items-center md-2">
      <div className="d-flex justify-content-center" style={{ marginLeft: '12%', marginRight: '10%' }}>
        {images.map((image, index) => (
          <div key={index} className="col-md-4 col-s-2 d-flex justify-content-center " style={{ gap: '20px' }}>
            <div
              className="image-wrapper"
              style={{
                backgroundColor: backgroundColors[index],
                boxShadow: `${shadowOffset.x}px ${shadowOffset.y}px ${shadowRadius}px ${shadowColor}`,
                cursor: 'pointer',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
              onClick={() => handleChoice(image, index)}
            >
              {imageSources[image] && (
                <img
                  src={imageSources[image]}
                  alt={`img ${index + 1}`}
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
