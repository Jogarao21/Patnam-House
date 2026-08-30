import React, { useState, useEffect, useRef } from 'react';
import '../styles/Menu.css';

// Import actual menu card images
import Menu1 from '../assets/Menu1.jpeg';
import Menu2 from '../assets/Menu2.jpeg';
import Menu3 from '../assets/Menu3.jpeg';
import Menu4 from '../assets/Menu4.jpeg';

// Starters
import PaneerChilli from '../assets/starters/Panneer_chilli.jpg';
import ChickenLollipop from '../assets/starters/chicken-lollipop.webp';
import ChilliChicken from '../assets/starters/chilli-chicken.webp';
import ChilliFish from '../assets/starters/chilli-fish.jpg';
import FrenchFries from '../assets/starters/french-fries.jpg';
import GobiManchurian from '../assets/starters/gobi-manchurian.jpg';
import KajuChicken from '../assets/starters/kaju-chicken.jpg';
import LoosePrawn from '../assets/starters/looseprawn.jpg';
import SrirachaChicken from '../assets/starters/sriracha-chicken.jpg';
import VegPakora from '../assets/starters/veg-pakora.webp';

// Main Course
import ButterGarlicNoodles from '../assets/Main_course/butter-garlic-noodles.jpg';
import HakkaNoodles from '../assets/Main_course/hakka-noodles.webp';
import JeeraRice from '../assets/Main_course/jeera-rice.jpg';
import LollipopFriedRice from '../assets/Main_course/lollipop-fried-rice.jpg';
import MalesianFriedRice from '../assets/Main_course/malesian-fried-rice.jpg';
import MixedFriedRice from '../assets/Main_course/mixed-fried-rice.jpg';
import RajuGariKodiPulao from '../assets/Main_course/raju-gari-kodi-pulao.jpg';
import SteamRice from '../assets/Main_course/steam-rice.jpg';
import ThaiCurry from '../assets/Main_course/thai-curry.jpg';
import VegPalav from '../assets/Main_course/veg-palav.jpg';

// Curries
import AndhraChickenCurry from '../assets/curries/andhra-chicken-curry.jpg';
import AndhraMuttonCurry from '../assets/curries/andhra-mutton-curry.jpg';
import DalFry from '../assets/curries/dal-fry.jpg';
import EggCurry from '../assets/curries/egg-curry.jpg';
import FishCurry from '../assets/curries/fish-curry.jpg';
import KadaiMushroom from '../assets/curries/kadai-mushroom.jpg';
import MixedVegCurry from '../assets/curries/mixed-veg-curry.jpg';
import MuttonRogan from '../assets/curries/mutton-rogan.jpg';
import PaneerButterMasala from '../assets/curries/panner-butter-masala.jpg';
import PunjabiChicken from '../assets/curries/punjabi-chicken.jpg';

// Breakfast
import GheeRoastDosa from '../assets/breakfast/ghee-roast-dosa.jpg';
import Idli from '../assets/breakfast/idli.jpg';
import KesariBath from '../assets/breakfast/kesari-bath.jpg';
import MasalaDosa from '../assets/breakfast/masala-dosa.jpg';
import MysoreBajji from '../assets/breakfast/mysore-bajji.jpg';
import OnionDosa from '../assets/breakfast/onion-dosa.jpg';
import PlainDosa from '../assets/breakfast/plain-dosa.jpg';
import PuriBhaji from '../assets/breakfast/puri-bhaji.jpg';
import Vada from '../assets/breakfast/vada.jpg';
import VegUpma from '../assets/breakfast/veg-upma.jpg';

// Breads
import ButterNaan from '../assets/breads/butter-naan.jpg';
import ButterRoti from '../assets/breads/butter-roti.jpg';
import GarlicNaan from '../assets/breads/garlic-naan.jpg';
import OnionKulcha from '../assets/breads/onion-kulcha.jpg';
import PaneerKulcha from '../assets/breads/paneer-kulcha.jpg';
import StuffedKulcha from '../assets/breads/stuffed-kulcha.jpg';


const Menu = () => {
  const menuRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('starters');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('menu--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (menuRef.current) observer.observe(menuRef.current);
    return () => { if (menuRef.current) observer.unobserve(menuRef.current); };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const menuImages = [
    { src: Menu1 },
    { src: Menu2 },
    { src: Menu3 },
    { src: Menu4 },
  ];

  const menuData = {
    starters: [
      {
        name: 'Chilli Paneer',
        price: '₹325',
        tag: 'Veg',
        image: PaneerChilli,
      },
      {
        name: 'Chicken Lollipop',
        price: '₹325',
        tag: 'Non-Veg',
        image: ChickenLollipop,
      },
      {
        name: 'Chilli Chicken',
        price: '₹299',
        tag: 'Non-Veg',
        image: ChilliChicken,
      },
      {
        name: 'Chilli Fish',
        price: '₹325',
        tag: 'Non-Veg',
        image: ChilliFish,
      },
      {
        name: 'French Fries',
        price: '₹199',
        tag: 'Veg',
        image: FrenchFries,
      },
      {
        name: 'Gobi Manchurian',
        price: '₹249',
        tag: 'Veg',
        image: GobiManchurian,
      },
      {
        name: 'Kaju Chicken',
        price: '₹325',
        tag: 'Non-Veg',
        image: KajuChicken,
      },
      {
        name: 'Loose Prawns',
        price: '₹349',
        tag: 'Signature',
        image: LoosePrawn,
      },
      {
        name: 'Chicken Sriracha',
        price: '₹349',
        tag: 'Signature',
        image: SrirachaChicken,
      },
      {
        name: 'Veg Pakoda',
        price: '₹225',
        tag: 'Veg',
        image: VegPakora,
      },
    ],
    mainCourse: [
      {
        name: 'Butter Garlic Noodles',
        price: '₹279/325',
        tag: 'Non-Veg',
        image: ButterGarlicNoodles,
      },
      {
        name: 'Hakka Noodles',
        price: '₹279/325',
        tag: 'Non-Veg',
        image: HakkaNoodles,
      },
      {
        name: 'Jeera Rice',
        price: '₹199',
        tag: 'Veg',
        image: JeeraRice,
      },
      {
        name: 'Lollipop Fried Rice',
        price: '₹325',
        tag: 'Signature',
        image: LollipopFriedRice,
      },
      {
        name: 'Malaysian Fried Rice',
        price: '₹279/325',
        tag: 'Non-Veg',
        image: MalesianFriedRice,
      },
      {
        name: 'Mixed Fried Rice',
        price: '₹349',
        tag: 'Signature',
        image: MixedFriedRice,
      },
      {
        name: 'Raju Gari Kodi Pulao',
        price: '₹349',
        tag: 'Signature',
        image: RajuGariKodiPulao,
      },
      {
        name: 'Steam Rice',
        price: '₹149',
        tag: 'Veg',
        image: SteamRice,
      },
      {
        name: 'Thai Curry',
        price: '₹325/349',
        tag: 'Signature',
        image: ThaiCurry,
      },
      {
        name: 'Veg Palav',
        price: '₹299',
        tag: 'Veg',
        image: VegPalav,
      },
    ],
    breakfast: [
      {
        name: 'Masala Dosa',
        price: '₹135',
        tag: 'Veg',
        image: MasalaDosa,
      },
      {
        name: 'Ghee Roast Dosa',
        price: '₹105',
        tag: 'Signature',
        image: GheeRoastDosa,
      },
      {
        name: 'Idli Plain (2)',
        price: '₹79',
        tag: 'Veg',
        image: Idli,
      },
      {
        name: 'Kesari Bhaat',
        price: '₹110',
        tag: 'Signature',
        image: KesariBath,
      },
      {
        name: 'Mysore Bajji (3)',
        price: '₹99',
        tag: 'Veg',
        image: MysoreBajji,
      },
      {
        name: 'Onion Dosa',
        price: '₹125',
        tag: 'Veg',
        image: OnionDosa,
      },
      {
        name: 'Plain Dosa',
        price: '₹89',
        tag: 'Veg',
        image: PlainDosa,
      },
      {
        name: 'Puri & Bhaji',
        price: '₹125',
        tag: 'Veg',
        image: PuriBhaji,
      },
      {
        name: 'Vada (3)',
        price: '₹99',
        tag: 'Veg',
        image: Vada,
      },
      {
        name: 'Vegetables Upma',
        price: '₹99',
        tag: 'Veg',
        image: VegUpma,
      },
    ],
    curries: [
      {
        name: 'Andhra Chicken Curry',
        price: '₹349',
        tag: 'Non-Veg',
        image: AndhraChickenCurry,
      },
      {
        name: 'Andhra Mutton Curry',
        price: '₹449',
        tag: 'Non-Veg',
        image: AndhraMuttonCurry,
      },
      {
        name: 'Dal Fry',
        price: '₹199',
        tag: 'Veg',
        image: DalFry,
      },
      {
        name: 'Egg Curry',
        price: '₹249',
        tag: 'Non-Veg',
        image: EggCurry,
      },
      {
        name: 'Fish Curry',
        price: '₹349',
        tag: 'Non-Veg',
        image: FishCurry,
      },
      {
        name: 'Kadai Mushroom',
        price: '₹349',
        tag: 'Veg',
        image: KadaiMushroom,
      },
      {
        name: 'Mixed Veg Curry',
        price: '₹299',
        tag: 'Veg',
        image: MixedVegCurry,
      },
      {
        name: 'Mutton Rogan Josh',
        price: '₹449',
        tag: 'Signature',
        image: MuttonRogan,
      },
      {
        name: 'Paneer Butter Masala',
        price: '₹329',
        tag: 'Veg',
        image: PaneerButterMasala,
      },
      {
        name: 'Punjabi Chicken',
        price: '₹349',
        tag: 'Non-Veg',
        image: PunjabiChicken,
      },
    ],
    breads: [
      {
        name: 'Butter Naan',
        price: '₹69',
        tag: 'Veg',
        image: ButterNaan,
      },
      {
        name: 'Butter Roti',
        price: '₹49',
        tag: 'Veg',
        image: ButterRoti,
      },
      {
        name: 'Garlic Naan',
        price: '₹109',
        tag: 'Veg',
        image: GarlicNaan,
      },
      {
        name: 'Onion Kulcha',
        price: '₹149',
        tag: 'Veg',
        image: OnionKulcha,
      },
      {
        name: 'Paneer Kulcha',
        price: '₹179',
        tag: 'Veg',
        image: PaneerKulcha,
      },
      {
        name: 'Stuffed Kulcha',
        price: '₹149',
        tag: 'Veg',
        image: StuffedKulcha,
      },
    ],
  };

  const filters = [
    { id: 'starters', label: 'Starters', icon: '⭐' },
    { id: 'mainCourse', label: 'Main Course', icon: '🍛' },
    { id: 'breakfast', label: 'Breakfast', icon: '🍚' },
    { id: 'curries', label: 'Curries', icon: '🍛' },
    { id: 'breads', label: 'Breads', icon: '🍞' },
  ];

  const tagColors = {
    Signature: { bg: '#D4AF37', text: '#1A1A1A' },
    'Non-Veg': { bg: '#C0392B', text: '#FFFFFF' },
    Veg: { bg: '#27AE60', text: '#FFFFFF' },
  };

  return (
    <section className="menu" id="menu" ref={menuRef}>
      <div className="menu__container">

        {/* ── Section Header ─────────────────────────── */}
        <div className="menu__header">
          <span className="menu__label">Our Menu</span>
          <p className="menu__subtitle">
            Patnam House blends authentic Andhra flavours with global inspirations — from sizzling tandoori
            kebabs and slow-cooked biryanis to crispy Chinese starters and indulgent desserts.
          </p>
        </div>

        {/* ── Menu Image Gallery ─────────────────────── */}
        <div className="menu__image-gallery">
          <div className="menu__image-grid">
            {menuImages.map((img, idx) => (
              <div
                key={idx}
                className="menu__image-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setLightbox(idx)}
                tabIndex={0}
                role="button"
                aria-label={`View menu page ${idx + 1}`}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(idx)}
              >
                <img src={img.src} alt={`Menu page ${idx + 1}`} />
                <div className="menu__image-overlay">
                  <span className="menu__image-zoom">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ────────────────────────────────── */}
        <div className="menu__divider">
          <span>Explore by Category</span>
        </div>

        {/* ── Filter Tabs ────────────────────────────── */}
        <div className="menu__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`menu__filter ${activeFilter === filter.id ? 'menu__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="menu__filter-icon">{filter.icon}</span>
              <span className="menu__filter-label">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* ── Dish Gallery ───────────────────────────── */}
        <div className="menu__gallery">
          {menuData[activeFilter].map((dish, index) => {
            const tag = tagColors[dish.tag] || tagColors['Veg'];
            return (
              <div
                key={index}
                className="menu__item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="menu__item-image">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                  <div className="menu__item-overlay" />
                  <span
                    className="menu__item-tag"
                    style={{ background: tag.bg, color: tag.text }}
                  >
                    {dish.tag}
                  </span>
                </div>
                <div className="menu__item-content">
                  <h3 className="menu__item-name">{dish.name}</h3>
                  <span className="menu__item-price">{dish.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="menu__lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Menu image viewer"
        >
          <div className="menu__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu__lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <button
              className="menu__lightbox-prev"
              onClick={() => setLightbox((lightbox - 1 + menuImages.length) % menuImages.length)}
              aria-label="Previous"
            >
              ‹
            </button>
            <img
              src={menuImages[lightbox].src}
              alt={`Menu page ${lightbox + 1}`}
            />
            <button
              className="menu__lightbox-next"
              onClick={() => setLightbox((lightbox + 1) % menuImages.length)}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;