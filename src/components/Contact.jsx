import React, { useState, useEffect, useRef } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('contact--visible');
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
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
    <>
      <section className="contact" id="contact" ref={contactRef}>
        <div className="contact__container">
          {/* Section Header */}
          <div className="contact__header">
            <span className="contact__label">✦ GET IN TOUCH</span>
            <h2 className="contact__title">Location & Hours</h2>
            <div className="contact__divider"></div>
          </div>

          {/* Contact Content */}
          <div className="contact__content">
            {/* Address */}
            <div className="contact__section">
              <h3 className="contact__section-title">Address</h3>
              <p className="contact__text">
                <strong>Patnam House Multi-Cuisine Restaurant</strong><br />
                7-8-22/3/1, Harbour Park Road<br />
                Opposite Ramakrishna Mission, RK Beach<br />
                Visakhapatnam, Andhra Pradesh 530003
              </p>
            </div>

            {/* Contact with Call Now Button */}
            <div className="contact__section">
              <h3 className="contact__section-title">Contact</h3>
              <p className="contact__text">
                <strong>📞 Phone:</strong> <a href="tel:+917569184070" className="contact__link">+91-7569184070</a><br />
                <strong>📧 Email:</strong> <a href="mailto:info@patnamhouse.com" className="contact__link">info@patnamhouse.com</a>
              </p>
              <a href="tel:+917569184070" className="contact__small-btn">
                <svg className="contact__small-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Now
              </a>
            </div>

            {/* Hours */}
            <div className="contact__section">
              <h3 className="contact__section-title">Hours</h3>
              <p className="contact__text">
                <strong>Monday - Sunday</strong><br />
                9:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Action Buttons */}
<div className="contact__actions">
  <a 
    href="https://www.google.com/maps/search/?api=1&query=Patnam+House+Visakhapatnam" 
    target="_blank" 
    rel="noopener noreferrer"
    className="contact__btn"
  >
    <svg className="contact__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
    Get Directions
  </a>
  <a 
    href="https://wa.me/917569184070?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Patnam%20House"
    target="_blank"
    rel="noopener noreferrer"
    className="contact__btn contact__btn--secondary"
  >
    <svg className="contact__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
    Whatsapp Us
  </a>
</div>


          {/* Map */}
          <div className="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.8!2d83.3!3d17.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQyJzAwLjAiTiA4M8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Patnam House Location"
            ></iframe>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="contact__bg-decor contact__bg-decor--1"></div>
        <div className="contact__bg-decor contact__bg-decor--2"></div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          {/* Footer Top */}
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <h3 className="footer__logo">Patnam House</h3>
              <p className="footer__tagline">Multi-Cuisine Restaurant, Visakhapatnam</p>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h4 className="footer__title">Quick Links</h4>
              <ul className="footer__links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>Menu</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="footer__section">
              <h4 className="footer__title">Follow Us</h4>
              <div className="footer__social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/patnamhouse/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="https://wa.me/917569184070 " target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="footer__section">
              <h4 className="footer__title">We Accept</h4>
              <div className="footer__payment">
                <span className="footer__payment-icon">💳</span>
                <span className="footer__payment-icon">📱</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2026 Patnam House. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
