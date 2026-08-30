import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Cuisines from '../components/Cuisines';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
// Import other sections like About, Menu, Gallery, etc.

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Cuisines />
      <Menu />
      <Gallery />
      <Reviews />
      <Contact />
      {/* Add other sections with their IDs */}
    </>
  );
}

export default HomePage;
