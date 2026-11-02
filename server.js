import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.tgs': 'application/gzip'
};

const CLIENT_ROUTES = new Set([
  '/',
  '/wingo-30s-live-prediction',
  '/wingo-30s-prediction',
  '/wingo-1-min-live-prediction-tool',
  '/wingo-1-minute-prediction',
  '/wingo-pattern-radar',
  '/wingo-calculator',
  '/fund-management',
  '/about'
]);

// Fallback PRNG generator if remote API is unreachable
function generateFallbackHistory(mode = '30s') {
  const count = 10;
  const list = [];
  const now = Date.now();
  const cycleSec = mode === '1m' ? 60 : 30;
  const typePrefix = mode === '1m' ? '10001' : '10005';
  const d = new Date(now);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const secOfDay = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
  const baseIndex = Math.floor(secOfDay / cycleSec);

  for (let i = 0; i < count; i++) {
    const idx = Math.max(1, baseIndex - i);
    const pid = `${y}${m}${day}${typePrefix}${String(idx).padStart(4, '0')}`;
    const num = Math.floor(Math.random() * 10);
    const category = num >= 5 ? 'Big' : 'Small';
    const color = num === 0 || num === 5 ? 'Violet' : [1, 3, 7, 9].includes(num) ? 'Green' : 'Red';
    list.push({
      periodId: pid,
      number: num,
      category,
      color,
      mode,
      status: 'Completed',
      recordedAt: new Date(now - i * cycleSec * 1000).toISOString()
    });
  }

  return {
    success: true,
    mode,
    totalCount: 500,
    serviceTime: now,
    list
  };
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API Routes
  if (pathname === '/api/auth/session') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authenticated: false, user: null }));
    return;
  }

  if (pathname === '/api/wingo/history') {
    const mode = parsedUrl.searchParams.get('mode') || '30s';
    try {
      const response = await fetch(`https://wingologic.com/api/wingo/history?mode=${mode}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Accept: 'application/json'
        },
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        const data = await response.json();
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        });
        res.end(JSON.stringify(data));
        return;
      }
    } catch {
      // Fallback if offline
    }

    const fallback = generateFallbackHistory(mode);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    });
    res.end(JSON.stringify(fallback));
    return;
  }

  // 2. Client Page Navigation Routes
  if (CLIENT_ROUTES.has(pathname)) {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(indexPath).pipe(res);
      return;
    }
  }

  // 3. Static Files
  let filePath = path.join(PUBLIC_DIR, pathname);
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  } catch {}

  // 4. 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`  WINGO TOOL — Local Server Running (v2.0 PRO)`);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  Network:     http://0.0.0.0:${PORT}`);
  console.log(`  30s Tool:    http://localhost:${PORT}/wingo-30s-live-prediction`);
  console.log(`  1m Tool:     http://localhost:${PORT}/wingo-1-min-live-prediction-tool`);
  console.log(`  Radar:       http://localhost:${PORT}/wingo-pattern-radar`);
  console.log(`  Fund Calc:   http://localhost:${PORT}/fund-management`);
  console.log(`  About:       http://localhost:${PORT}/about`);
  console.log(`======================================================\n`);
});
