import React, { useEffect, useRef, useState } from 'react';
import '../styles/Cuisines.css';
import northImage from '../assets/north.jpg';
import southImage from '../assets/south.jpg';
import chineseImage from '../assets/chinese.jpg';
import continentalImage from '../assets/continental.jpg';
import coastalImage from '../assets/coastal.jpg';

const Cuisines = () => {
  const cuisinesRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cuisines--visible');
        }
      },
      { threshold: 0.1 }
    );

    if (cuisinesRef.current) {
      observer.observe(cuisinesRef.current);
    }

    return () => {
      if (cuisinesRef.current) {
        observer.unobserve(cuisinesRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const cuisineData = [
    {
      id: 1,
      name: 'North Indian',
      tagline: 'Rich. Regal. Timeless.',
      description: 'Indulge in the royal tastes of North India — slow-cooked gravies, buttery curries, smoky tandoor grills, and aromatic biryanis.',
      highlights: ['Butter Chicken', 'Paneer Tikka', 'Dum Biryani', 'Dal Makhani'],
      image: northImage
    },
    {
      id: 2,
      name: 'South Indian',
      tagline: 'Comfort food with bold character.',
      description: 'From crispy dosas to hearty Andhra meals, our South Indian kitchen celebrates fermented perfection and fiery flavors.',
      highlights: ['Masala Dosa', 'Idli & Vada', 'Andhra Meals', 'Sambar'],
      image: southImage
    },
    {
      id: 3,
      name: 'Chinese',
      tagline: 'Bold. Flavorful. Authentic.',
      description: 'Experience the perfect balance of sweet, spicy, and savory with our Indo-Chinese specialties — crispy and irresistible.',
      highlights: ['Manchurian', 'Fried Rice', 'Hakka Noodles', 'Chilli Chicken'],
      image: chineseImage
    },
    {
      id: 4,
      name: 'Continental',
      tagline: 'Elegance on every plate.',
      description: 'Classic European flavors meet modern presentation — from creamy pastas to perfectly grilled steaks.',
      highlights: ['Grilled Steaks', 'Pasta Alfredo', 'Risotto', 'Fresh Salads'],
      image: continentalImage
    },
    {
      id: 5,
      name: 'Coastal & Seafood',
      tagline: 'Fresh from the tides.',
      description: 'Handpicked fresh catches from the Bay of Bengal meet fragrant coastal spices — delivering bold seafood flavors.',
      highlights: ['Prawn Fry', 'Grilled Fish', 'Coastal Curries', 'Spiced Crab'],
      image: coastalImage
    }
  ];

  return (
    <section className="cuisines" id="cuisines" ref={cuisinesRef}>
      <div className="cuisines__container">
        {/* Section Header */}
        <div className="cuisines__header">
          <span className="cuisines__label">✦ OUR CULINARY WORLD</span>
          <h2 className="cuisines__title">A Celebration of Global Flavors & Indian Roots</h2>
          <p className="cuisines__subtitle">
            Every cuisine at Patnam House is a story — of spices, tradition, technique, and artistry. 
            From royal Indian recipes to bold Asian flavors and fresh coastal delicacies, we unite 
            the world on your plate.
          </p>
          <div className="cuisines__divider"></div>
        </div>

        {/* Cuisine Cards Grid */}
        <div className="cuisines__grid">
          {cuisineData.map((cuisine, index) => (
            <div 
              key={cuisine.id}
              className={`cuisines__card ${activeCard === cuisine.id ? 'cuisines__card--active' : ''}`}
              onMouseEnter={() => setActiveCard(cuisine.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="cuisines__card-inner">
                {/* Image */}
                <div className="cuisines__image">
                  <img src={cuisine.image} alt={cuisine.name} />
                  <div className="cuisines__image-overlay"></div>
                </div>

                {/* Content */}
                <div className="cuisines__card-content">
                  <h3 className="cuisines__card-title">{cuisine.name}</h3>
                  <p className="cuisines__card-tagline">{cuisine.tagline}</p>
                  <p className="cuisines__card-description">{cuisine.description}</p>

                  {/* Highlights */}
                  <div className="cuisines__highlights">
                    {cuisine.highlights.map((item, idx) => (
                      <span key={idx} className="cuisines__highlight-item">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Hover Button */}
                  <button 
                    className="cuisines__explore-btn"
                    onClick={() => scrollToSection('menu')}
                  >
                    Explore {cuisine.name}
                    <svg className="cuisines__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Glow Effect */}
                <div className="cuisines__card-glow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="cuisines__trust">
          <div className="cuisines__trust-item">
            <svg className="cuisines__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span className="cuisines__trust-text">Fresh Ingredients Daily</span>
          </div>
          <div className="cuisines__trust-item">
            <svg className="cuisines__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span className="cuisines__trust-text">Live Kitchen Cooking</span>
          </div>
          <div className="cuisines__trust-item">
            <svg className="cuisines__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="cuisines__trust-text">Multi-Cuisine Master Chefs</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="cuisines__cta">
          <button 
            className="cuisines__menu-btn"
            onClick={() => scrollToSection('menu')}
          >
            <span>View Our Full Menu</span>
            <svg className="cuisines__menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="cuisines__bg-decor cuisines__bg-decor--1"></div>
      <div className="cuisines__bg-decor cuisines__bg-decor--2"></div>
    </section>
  );
};

export default Cuisines;
