import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import Image1 from '../assets/fish-curry.jpg';
import Image2 from '../assets/Image2.jpg';
import Image3 from '../assets/french-fries.jpg';
import Image4 from '../assets/Image4.jpg';
import Image5 from '../assets/Image5.jpg';
import Image6 from '../assets/chilli-chicken.webp';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hero--visible');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
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
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__overlay"></div>
      
      {/* Left Side Images - NEW */}
      <div className="hero__images hero__images--left">
        <div className="hero__image-item hero__image-item--1">
          <img src={Image1} alt="Delicious Food 1" />
        </div>
        <div className="hero__image-item hero__image-item--2">
          <img src={Image2} alt="Delicious Food 2" />
        </div>
        <div className="hero__image-item hero__image-item--3">
          <img src={Image3} alt="Delicious Food 3" />
        </div>
      </div>

      {/* Center Content - SAME AS BEFORE */}
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__title-line">Welcome to</span>
            <span className="hero__title-brand">Patnam House</span>
          </h1>
          
          <div className="hero__divider"></div>
          
          <p className="hero__subtitle">
            Where Culinary Excellence Meets Coastal Charm
          </p>
          
          <p className="hero__description">
            Experience the finest multi-cuisine dining in the heart of Visakhapatnam. 
            From authentic Indian flavors to global delicacies, every dish tells a story 
            of passion, quality, and tradition.
          </p>
          
          <div className="hero__cta">
            <button 
              className="hero__btn hero__btn--primary"
              onClick={() => scrollToSection('menu')}
            >
              <svg className="hero__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              View Menu
            </button>

          </div>
        </div>
      </div>

      {/* Right Side Images - NEW */}
      <div className="hero__images hero__images--right">
        <div className="hero__image-item hero__image-item--4">
          <img src={Image4} alt="Delicious Food 4" />
        </div>
        <div className="hero__image-item hero__image-item--5">
          <img src={Image5} alt="Delicious Food 5" />
        </div>
        <div className="hero__image-item hero__image-item--6">
          <img src={Image6} alt="Delicious Food 6" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hero__decor hero__decor--1"></div>
      <div className="hero__decor hero__decor--2"></div>
    </section>
  );
};

export default Hero;
