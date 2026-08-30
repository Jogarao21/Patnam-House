import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const CACHE_FILE = path.join(__dirname, 'reviews-cache.json');
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const PLACE_ID = 'ChIJXfMtV3JDOToR2qLqajfZyqI';
const API_KEY = process.env.Google_Api_Key;

async function fetchReviewsFromGoogle() {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
    },
  });

  if (!response.ok) {
    throw new Error(`Google API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

function readCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Cache read error:', e.message);
  }
  return null;
}

function writeCache(data) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), data }, null, 2));
  } catch (e) {
    console.error('Cache write error:', e.message);
  }
}

app.get('/api/reviews', async (req, res) => {
  try {
    const cache = readCache();

    // Serve from cache if fresh (< 24 hours old)
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
      console.log('Serving reviews from cache');
      return res.json({ ...cache.data, cached: true });
    }

    // Fetch fresh data from Google
    console.log('Fetching fresh reviews from Google Places API...');
    const freshData = await fetchReviewsFromGoogle();
    writeCache(freshData);

    res.json({ ...freshData, cached: false });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);

    // Fall back to cache even if stale
    const cache = readCache();
    if (cache) {
      console.log('Serving stale cache due to API error');
      return res.json({ ...cache.data, cached: true, stale: true });
    }

    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Reviews API server running at http://localhost:${PORT}/api/reviews`);
});
