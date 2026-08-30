import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import interior1 from '../assets/restaurant_interior1.jpg';
import interior2 from '../assets/restaurant_interior2.jpg';
import interior3 from '../assets/restaurant_interior3.jpg';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('about--visible');
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
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

  return (
    <section className="about" id="about" ref={aboutRef}>
      {/* Section Header */}
      <div className="about__header">
        <span className="about__label">✦ OUR STORY</span>
        <h2 className="about__title">A Culinary Journey Rooted in Passion & Hospitality</h2>
        <div className="about__divider"></div>
      </div>

      <div className="about__container">
        {/* Block 1 - Description LEFT, Image RIGHT */}
        <div className="about__row about__row--normal">
          <div className="about__content">
            <h3 className="about__subtitle">Heritage & Vision</h3>
            <div className="about__text-divider"></div>
            <p className="about__text">
              Founded in the heart of Visakhapatnam, <strong>Patnam House</strong> was born 
              from a simple yet powerful vision — to bring the richest flavors of India 
              and the world together under one roof. Our journey began with a passion for 
              authentic culinary experiences and a deep respect for traditional cooking methods.
            </p>
            <div className="about__feature-small">
              <div className="about__feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div>
                <h4 className="about__feature-title-small">Fresh Ingredients Daily</h4>
                <p className="about__feature-desc-small">Sourced from trusted local suppliers</p>
              </div>
            </div>
          </div>
          <div className="about__image-wrapper">
            <img src={interior1} alt="Patnam House Heritage" className="about__image" />
            <div className="about__image-overlay"></div>
          </div>
        </div>

        {/* Block 2 - Image LEFT, Description RIGHT */}
        <div className="about__row about__row--reverse">
          <div className="about__image-wrapper">
            <img src={interior2} alt="Hospitality Excellence" className="about__image" />
            <div className="about__image-overlay"></div>
          </div>
          <div className="about__content">
            <h3 className="about__subtitle">Hospitality Values</h3>
            <div className="about__text-divider"></div>
            <p className="about__text">
              For us, hospitality is not a service — it's a <em>tradition</em>. From the 
              warm welcome at the door to the last bite on your plate, every detail is 
              crafted with care, respect, and sincerity. We believe in creating not just 
              meals, but memorable experiences that bring people together.
            </p>
            <div className="about__feature-small">
              <div className="about__feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="about__feature-title-small">Family-Friendly Ambience</h4>
                <p className="about__feature-desc-small">Perfect for every celebration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3 - Description LEFT, Image RIGHT */}
        <div className="about__row about__row--normal">
          <div className="about__content">
            <h3 className="about__subtitle">Culinary Excellence</h3>
            <div className="about__text-divider"></div>
            <p className="about__text">
              Our chefs unite generations of culinary knowledge with modern techniques, 
              delivering North Indian richness, South Indian comfort, Chinese boldness, 
              Continental finesse, and coastal seafood freshness in every dish. Each recipe 
              is a masterpiece, carefully crafted to delight your palate.
            </p>
            <div className="about__feature-small">
              <div className="about__feature-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h4 className="about__feature-title-small">Expert Multi-Cuisine Chefs</h4>
                <p className="about__feature-desc-small">Masters of Indian & global cuisine</p>
              </div>
            </div>
          </div>
          <div className="about__image-wrapper">
            <img src={interior3} alt="Culinary Mastery" className="about__image" />
            <div className="about__image-overlay"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="about__cta">
          <button 
            className="about__btn"
            onClick={() => scrollToSection('menu')}
          >
            <span>Explore Our Menu</span>
            <svg className="about__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
