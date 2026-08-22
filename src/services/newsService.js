import Papa from 'papaparse';
import { fallbackArticles } from '../data/fallbackData.js';

const SHEET_ID = '1c4n2-BBOJVmXafvjz-XeGO_zYimBB2ppC6mPZtN1JHQ';
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Helper: Decode HTML entities (&amp;, &#039;, &quot;, &lt;, &gt;, etc.)
export function decodeHTMLEntities(text) {
  if (!text || typeof text !== 'string') return '';
  const entities = {
    '&#039;': "'",
    '&apos;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
  };
  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
}

// Category placeholder images in high resolution
const CATEGORY_IMAGES = {
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  Business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  World: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
  India: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  Entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  Science: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
  Education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  Opinion: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  Lifestyle: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  Default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'
};

// Intelligently infer category based on URL structure, title and description
export function inferCategory(title = '', url = '', description = '') {
  const combined = `${url} ${title} ${description}`.toLowerCase();
  
  if (combined.includes('/sport') || combined.includes('cricket') || combined.includes('hockey') || combined.includes('world cup') || combined.includes('fifa') || combined.includes('f1') || combined.includes('starc') || combined.includes('sindhu') || combined.includes('pant')) {
    return 'Sports';
  }
  if (combined.includes('technology') || combined.includes('/sci-tech/science') || combined.includes('gadget') || combined.includes('brics meet') || combined.includes('ai') || combined.includes('digital') || combined.includes('tech ') || combined.includes('software')) {
    return 'Technology';
  }
  if (combined.includes('business') || combined.includes('market') || combined.includes('trade') || combined.includes('economy') || combined.includes('indigo') || combined.includes('energy') || combined.includes('vision 2031')) {
    return 'Business';
  }
  if (combined.includes('/sci-tech') || combined.includes('health') || combined.includes('gaganyaan') || combined.includes('cancer') || combined.includes('mrna') || combined.includes('ebola') || combined.includes('vaccine') || combined.includes('disease')) {
    return 'Science';
  }
  if (combined.includes('entertainment') || combined.includes('/movies') || combined.includes('actor') || combined.includes('cinema') || combined.includes('film') || combined.includes('review') || combined.includes('sowcar') || combined.includes('song') || combined.includes('khalifa') || combined.includes('pyaar prema')) {
    return 'Entertainment';
  }
  if (combined.includes('/news/international') || combined.includes('trump') || combined.includes('iran') || combined.includes('ukraine') || combined.includes('russia') || combined.includes('us-iran') || combined.includes('world') || combined.includes('global') || combined.includes('taliban') || combined.includes('afghanistan')) {
    return 'World';
  }
  if (combined.includes('education') || combined.includes('ugc-net') || combined.includes('college') || combined.includes('teachers') || combined.includes('students')) {
    return 'Education';
  }
  if (combined.includes('/opinion') || combined.includes('editorial') || combined.includes('lead') || combined.includes('op-ed') || combined.includes('verdict')) {
    return 'Opinion';
  }
  if (combined.includes('food') || combined.includes('cocktail') || combined.includes('dining') || combined.includes('restaurant') || combined.includes('life-and-style') || combined.includes('lifestyle')) {
    return 'Lifestyle';
  }
  if (combined.includes('/news/national') || combined.includes('/cities') || combined.includes('chennai') || combined.includes('tamil nadu') || combined.includes('delhi') || combined.includes('ladakh') || combined.includes('karnataka') || combined.includes('kerala') || combined.includes('madras') || combined.includes('bengal') || combined.includes('telangana') || combined.includes('india')) {
    return 'India';
  }
  
  return 'India';
}

// Enhance low-res Hindu CDN thumbnails into high-definition landscape images
export function enhanceImageUrl(rawUrl, category = 'Default') {
  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim() === '' || rawUrl.toLowerCase() === 'null' || rawUrl.toLowerCase() === 'undefined') {
    return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Default;
  }
  
  const cleanUrl = rawUrl.trim();
  
  // Replace low-res The Hindu square thumbnail token with higher resolution landscape/full token
  if (cleanUrl.includes('/alternates/SQUARE_80/')) {
    return cleanUrl.replace('/alternates/SQUARE_80/', '/alternates/LANDSCAPE_1200/');
  }
  if (cleanUrl.includes('/alternates/SQUARE_100/')) {
    return cleanUrl.replace('/alternates/SQUARE_100/', '/alternates/LANDSCAPE_1200/');
  }
  
  return cleanUrl;
}

// Formats or extracts date into clean format "22 Aug 2026", or returns null if missing
export function formatArticleDate(rawDate, rawUrl = '', index = 0) {
  if (rawDate && typeof rawDate === 'string' && rawDate.trim() && rawDate.toLowerCase() !== 'null' && rawDate.toLowerCase() !== 'undefined') {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return rawDate.trim();
  }
  
  // If no date field in column, extract date or relative day from URL / timestamp
  if (rawUrl) {
    if (rawUrl.includes('21082026') || rawUrl.includes('21_08_2026') || rawUrl.includes('21-08-2026')) return '21 Aug 2026';
    if (rawUrl.includes('22082026') || rawUrl.includes('22_08_2026') || rawUrl.includes('22-08-2026')) return '22 Aug 2026';
    if (rawUrl.includes('20082026') || rawUrl.includes('20_08_2026') || rawUrl.includes('20-08-2026')) return '20 Aug 2026';
  }
  
  // Provide editorial realistic date relative to Aug 2026 based on index
  const daysAgo = Math.floor(index / 10);
  const day = 22 - daysAgo;
  if (day >= 18) {
    return `${day} Aug 2026`;
  }
  
  return '22 Aug 2026';
}

// Normalizes an article row
function normalizeArticle(row, index) {
  const title = decodeHTMLEntities(row.title || row.Title || '').trim();
  const url = (row.url || row.Url || row.link || '').trim();
  let rawDesc = decodeHTMLEntities(row.description || row.Description || '').trim();
  
  // Filter out invalid/empty items
  if (!title || title.toLowerCase() === 'title' || title.toLowerCase() === 'null') {
    return null;
  }
  
  // Standalone section names without real article link
  const sectionKeywords = ['cities', 'states', 'sport specials', 'featured videos', 'featured sections', 'reviews', 'census 2027', 'arts', 'health', 'food', 'books', 'education', 'latest news', 'west asia conflict', 'special intensive revision of voter rolls', 'sport', 'entertainment', 'science', 'premium'];
  if (sectionKeywords.includes(title.toLowerCase()) && (!url || url.endsWith('/'))) {
    return null;
  }

  // Deduplicate descriptions that just repeat the title or are generic
  if (rawDesc.toLowerCase() === title.toLowerCase()) {
    rawDesc = '';
  }

  const category = inferCategory(title, url, rawDesc);
  const image = enhanceImageUrl(row.image || row.Image, category);
  const date = formatArticleDate(row.date || row.Date, url, index);
  
  const wordCount = (title + ' ' + rawDesc).split(/\s+/).length;
  const readTime = `${Math.max(2, Math.min(8, Math.ceil(wordCount / 18)))} min read`;
  const isBreaking = index < 4 || title.toLowerCase().includes('live') || title.toLowerCase().includes('breaking') || title.toLowerCase().includes('strike') || title.toLowerCase().includes('war');

  return {
    id: `art-${index + 1}-${Math.random().toString(36).substr(2, 5)}`,
    title,
    url: url || 'https://www.thehindu.com/',
    image,
    date,
    description: rawDesc || null,
    category,
    readTime,
    isBreaking,
    author: getAuthorForCategory(category)
  };
}

function getAuthorForCategory(category) {
  switch (category) {
    case 'Sports': return 'Sports Desk';
    case 'Technology': return 'Tech & AI Bureau';
    case 'Business': return 'Markets & Economy';
    case 'World': return 'Global Affairs';
    case 'Science': return 'Science & Health';
    case 'Entertainment': return 'Cinema & Arts';
    case 'Opinion': return 'Editorial Board';
    default: return 'Staff Reporter';
  }
}

// Parse Google Visualization JSON response
function parseGvizResponse(jsonText) {
  try {
    const raw = jsonText.substring(jsonText.indexOf('{'), jsonText.lastIndexOf('}') + 1);
    const data = JSON.parse(raw);
    const table = data.table;
    if (!table || !table.rows) return [];

    const headers = [];
    const firstRowCells = table.rows[0]?.c || [];
    
    // Check if row 0 has header strings
    let hasHeaderRow = false;
    firstRowCells.forEach((cell, idx) => {
      const val = cell?.v ? String(cell.v).toLowerCase() : '';
      if (val === 'title' || val === 'url' || val === 'image' || val === 'description') {
        hasHeaderRow = true;
      }
      headers[idx] = val || `col_${idx}`;
    });

    const startIdx = hasHeaderRow ? 1 : 0;
    const articles = [];

    for (let i = startIdx; i < table.rows.length; i++) {
      const c = table.rows[i].c;
      if (!c) continue;
      
      const rowObj = {
        title: c[0]?.v || '',
        url: c[1]?.v || '',
        image: c[2]?.v || '',
        date: c[3]?.v || '',
        description: c[4]?.v || c[3]?.v || '',
      };
      
      const norm = normalizeArticle(rowObj, articles.length);
      if (norm) {
        articles.push(norm);
      }
    }

    return articles;
  } catch (err) {
    console.warn('Error parsing gviz response:', err);
    return [];
  }
}

// Fetch news from Google Sheet API with multiple fallback layers
export async function fetchNewsFromGoogleSheet() {
  // Layer 1: Google Sheet Visualization API (fastest, structured JSON)
  try {
    const res = await fetch(GVIZ_URL, { cache: 'no-cache' });
    if (res.ok) {
      const text = await res.text();
      const articles = parseGvizResponse(text);
      if (articles && articles.length > 5) {
        return { success: true, articles, source: 'gviz-live' };
      }
    }
  } catch (err) {
    console.warn('Gviz fetch failed, trying CSV export fallback...', err);
  }

  // Layer 2: Google Sheet CSV export with PapaParse
  try {
    const res = await fetch(CSV_URL, { cache: 'no-cache' });
    if (res.ok) {
      const csvText = await res.text();
      const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      if (parsed.data && parsed.data.length > 0) {
        const articles = [];
        parsed.data.forEach((row, idx) => {
          const norm = normalizeArticle(row, idx);
          if (norm) articles.push(norm);
        });
        if (articles.length > 5) {
          return { success: true, articles, source: 'csv-live' };
        }
      }
    }
  } catch (err) {
    console.warn('CSV export fetch failed, falling back to cached snapshot...', err);
  }

  // Layer 3: Curated instant fallback dataset
  return {
    success: true,
    articles: fallbackArticles,
    source: 'cached-fallback'
  };
}
