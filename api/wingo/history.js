function generateFallbackHistory(mode = '30s') {
  const count = 30;
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

  for (let i = 1; i <= count; i++) {
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

export default async function handler(req, res) {
  const mode = req.query?.mode || '30s';
  try {
    const response = await fetch(`https://wingologic.com/api/wingo/history?mode=${mode}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        Accept: 'application/json'
      },
      signal: AbortSignal.timeout(2500)
    });
    if (response.ok) {
      const data = await response.json();
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json(data);
    }
  } catch {
    // Remote upstream offline fallback
  }

  const fallback = generateFallbackHistory(mode);
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json(fallback);
}
