import React, { useState, useEffect, useRef } from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  const galleryRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gallery--visible');
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxOpen]);

  const galleryData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
      category: 'dishes',
      title: 'Signature Curry',
      tall: false
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      category: 'interiors',
      title: 'Dining Hall',
      tall: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
      category: 'dishes',
      title: 'Biryani Special',
      tall: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      category: 'ambience',
      title: 'Warm Lighting',
      tall: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
      category: 'dishes',
      title: 'Butter Chicken',
      tall: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
      category: 'interiors',
      title: 'Cozy Corner',
      tall: false
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
      category: 'dishes',
      title: 'Dal Makhani',
      tall: false
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      category: 'ambience',
      title: 'Table Setting',
      tall: true
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
      category: 'dishes',
      title: 'Fresh Naan',
      tall: false
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800',
      category: 'interiors',
      title: 'Elegant Seating',
      tall: false
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1634141510639-d691d86f47be?w=800',
      category: 'dishes',
      title: 'Gulab Jamun',
      tall: true
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
      category: 'ambience',
      title: 'Dining Experience',
      tall: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'dishes', label: 'Dishes' },
    { id: 'interiors', label: 'Interiors' },
    { id: 'ambience', label: 'Ambience' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const handleNextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section className="gallery" id="gallery" ref={galleryRef}>
      <div className="gallery__container">
        {/* Section Header */}
        <div className="gallery__header">
          <span className="gallery__label">✦ VISUAL JOURNEY</span>
          <h2 className="gallery__title">Experience Our World</h2>
          <p className="gallery__subtitle">
            Step into the heart of Patnam House through our curated collection of moments — 
            from exquisite dishes to elegant interiors and warm ambience.
          </p>
          <div className="gallery__divider"></div>
        </div>

        {/* Filter Tabs */}
        <div className="gallery__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`gallery__filter ${activeFilter === filter.id ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <div className="gallery__masonry">
          {filteredImages.map((item, index) => (
            <div 
              key={item.id}
              className={`gallery__item ${item.tall ? 'gallery__item--tall' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openLightbox(item)}
            >
              <div className="gallery__item-wrapper">
                <img src={item.image} alt={item.title} className="gallery__image" />
                <div className="gallery__overlay">
                  <div className="gallery__overlay-content">
                    <svg className="gallery__zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <h3 className="gallery__item-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div className={`lightbox ${lightboxOpen ? 'lightbox--open' : ''}`} onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} className="lightbox__image" />
            <p className="lightbox__caption">{selectedImage.title}</p>
          </div>

          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); handleNextImage(); }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* Background Decorative Elements */}
      <div className="gallery__bg-decor gallery__bg-decor--1"></div>
      <div className="gallery__bg-decor gallery__bg-decor--2"></div>
    </section>
  );
};

export default Gallery;
