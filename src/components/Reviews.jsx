import React, { useState, useEffect, useRef } from 'react';
import '../styles/Reviews.css';

// Fallback reviews in case API is unavailable
const FALLBACK_REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: "Patnam House is one of the best restaurants in the area. The ambience is pleasant and hygienic, the staff are polite, and the food quality is consistently excellent. Every dish is full of authentic flavour, and it's a perfect place for family dinners and special occasions.",
    name: "Chandan Kumar",
    visitType: "Family Dinner",
    location: "Visakhapatnam",
    photoUri: null,
    timeDescription: "7 months ago",
  },
  {
    id: 2,
    rating: 5,
    text: "Had a fantastic dining experience! The food was absolutely delicious — every dish was flavorful and beautifully presented. The service was attentive and friendly without being overwhelming.",
    name: "Ankita Ghosh",
    visitType: "Atmosphere Dining",
    location: "Hyderabad",
    photoUri: null,
    timeDescription: "6 months ago",
  },
  {
    id: 3,
    rating: 5,
    text: "Patnam House is a lovely place near Beach Road with a really pleasant ambiance. The food tasted fresh, hygienic, and full of flavor. A great spot to enjoy good food with family and friends in Vizag.",
    name: "Srikanth Kannepalli",
    visitType: "Group Dining",
    location: "Vizag",
    photoUri: null,
    timeDescription: "5 months ago",
  },
  {
    id: 4,
    rating: 4,
    text: "Patnam House stands out in Visakhapatnam for its consistent food quality and high standards of hospitality, making it a top-rated choice for both locals and visitors. Must try is the Singaporean Fried rice.",
    name: "PARNASHREE DEY",
    visitType: "Food Quality",
    location: "Bengaluru",
    photoUri: null,
    timeDescription: "4 months ago",
  },
  {
    id: 5,
    rating: 5,
    text: "Good experience food was amazing especially the chicken fry peace biryani and punjabi chicken love it you must visit the place staff were also very friendly and helpful.",
    name: "Willson Reang",
    visitType: "Atmosphere enjoyment",
    location: "Vizag",
    photoUri: null,
    timeDescription: "5 months ago",
  },
];

const Reviews = () => {
  const reviewsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [rating, setRating] = useState(4.7);
  const [totalReviews, setTotalReviews] = useState(133);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // Fetch live reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/reviews');
        if (!res.ok) throw new Error('Server error');
        const data = await res.json();

        if (data.reviews && data.reviews.length > 0) {
          const mapped = data.reviews.map((r, index) => ({
            id: index + 1,
            rating: r.rating,
            text: r.text?.text || '',
            name: r.authorAttribution?.displayName || 'Guest',
            visitType: 'Google Review',
            location: 'Visakhapatnam',
            photoUri: r.authorAttribution?.photoUri || null,
            timeDescription: r.relativePublishTimeDescription || '',
            googleMapsUri: r.googleMapsUri || null,
          }));

          setReviews(mapped);
          setIsLive(true);
        }

        if (data.rating) setRating(data.rating);
        if (data.userRatingCount) setTotalReviews(data.userRatingCount);
      } catch (err) {
        console.warn('Could not fetch live reviews, using fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Duplicates for desktop infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('reviews--visible');
      },
      { threshold: 0.1 }
    );
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    return () => {
      if (reviewsRef.current) observer.unobserve(reviewsRef.current);
    };
  }, []);

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="reviews__star" viewBox="0 0 24 24" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));

  const displayReviews = isDesktop ? duplicatedReviews : reviews;

  return (
    <section className="reviews" id="reviews" ref={reviewsRef}>
      <div className="reviews__container">
        {/* Section Header */}
        <div className="reviews__header">
          <span className="reviews__label">✦ GUEST EXPERIENCES</span>
          <h2 className="reviews__title">Loved by Thousands of Happy Diners</h2>
          <p className="reviews__subtitle">
            Every review is a real story of taste, celebration, and hospitality.
            Here's what our guests say about dining with us.
          </p>
          {isLive && (
            <span className="reviews__live-badge">
              <span className="reviews__live-dot"></span>
              Live from Google
            </span>
          )}
          <div className="reviews__divider"></div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="reviews__loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="reviews__skeleton-card">
                <div className="reviews__skeleton-line reviews__skeleton-line--short"></div>
                <div className="reviews__skeleton-line"></div>
                <div className="reviews__skeleton-line"></div>
                <div className="reviews__skeleton-line reviews__skeleton-line--medium"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Carousel */
          <div className="reviews__carousel">
            <div
              className={`reviews__track ${isPaused ? 'reviews__track--paused' : ''}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {displayReviews.map((review, index) => (
                <div key={`${review.id}-${index}`} className="reviews__card">
                  <div className="reviews__card-inner">
                    {/* Star Rating */}
                    <div className="reviews__rating">{renderStars(review.rating)}</div>

                    {/* Review Text */}
                    <p className="reviews__text">"{review.text}"</p>

                    <div className="reviews__text-divider"></div>

                    {/* Reviewer Info */}
                    <div className="reviews__author">
                      {review.photoUri ? (
                        <img
                          src={review.photoUri}
                          alt={review.name}
                          className="reviews__author-photo"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="reviews__author-avatar">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="reviews__name">— {review.name}</h4>
                        <p className="reviews__meta">
                          {isLive ? review.timeDescription : `${review.visitType} | ${review.location}`}
                        </p>
                      </div>
                    </div>

                    <div className="reviews__card-glow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Strip */}
        <div className="reviews__trust">
          <div className="reviews__trust-item">
            <svg className="reviews__trust-icon" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div>
              <span className="reviews__trust-value">{rating}/5</span>
              <span className="reviews__trust-label">Google Rating</span>
            </div>
          </div>
          <div className="reviews__trust-item">
            <svg className="reviews__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <div>
              <span className="reviews__trust-value">{totalReviews}+</span>
              <span className="reviews__trust-label">Google Reviews</span>
            </div>
          </div>
          <div className="reviews__trust-item">
            <svg className="reviews__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <span className="reviews__trust-value">RK Beach</span>
              <span className="reviews__trust-label">Favorite Dining Spot</span>
            </div>
          </div>
        </div>

        {/* Google Review Button */}
        <div className="reviews__cta">
          <a
            href="https://www.google.com/maps/place/Patnam+House/@17.7232,83.3198,15z/data=!4m17!1m9!3m8!1s0x3a394372572df35d:0xa2cad9376aeaa2da!2sPatnam+House!8m2!3d17.7123813!4d83.3179002!9m1!1b1!16s%2Fg%2F11yv42kk3r!3m6!1s0x3a394372572df35d:0xa2cad9376aeaa2da!8m2!3d17.7123813!4d83.3179002!10e1!16s%2Fg%2F11yv42kk3r?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews__google-btn"
          >
            <svg className="reviews__google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="reviews__btn-divider"></span>
            <span className="reviews__btn-content">
              <span className="reviews__btn-stars">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} viewBox="0 0 24 24" fill={i <= 4 ? '#FBBC05' : 'none'} stroke="#FBBC05" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </span>
              <span className="reviews__btn-rating">{rating} · See all reviews</span>
            </span>
          </a>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="reviews__bg-decor reviews__bg-decor--1"></div>
      <div className="reviews__bg-decor reviews__bg-decor--2"></div>
    </section>
  );
};

export default Reviews;
