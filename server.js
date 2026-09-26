const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // 1. API proxy route for free AI text generation
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const postData = JSON.stringify({
          messages: payload.messages || [{ role: 'user', content: 'hello' }],
          model: 'openai'
        });

        const https = require('https');
        const apiReq = https.request({
          hostname: 'text.pollinations.ai',
          path: '/openai',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          },
          timeout: 25000
        }, (apiRes) => {
          let resData = '';
          apiRes.on('data', d => resData += d);
          apiRes.on('end', () => {
            if (res.headersSent) return;
            res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(resData);
          });
        });

        apiReq.on('error', (e) => {
          if (res.headersSent) return;
          res.writeHead(503, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ error: e.message }));
        });

        apiReq.on('timeout', () => {
          if (res.headersSent) return;
          apiReq.destroy();
          res.writeHead(504, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ error: 'Gateway Timeout' }));
        });

        apiReq.write(postData);
        apiReq.end();
      } catch (err) {
        if (res.headersSent) return;
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // 1b. API route for AI image generation
  if ((req.method === 'POST' || req.method === 'GET') && req.url.startsWith('/api/image')) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
    
    const handleImageGeneration = (prompt, width = 1024, height = 1024, model = 'flux', seed = Math.floor(Math.random() * 1000000)) => {
      const cleanPrompt = (prompt || 'A beautiful futuristic enterprise AI artwork').trim();
      const targetUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=${width}&height=${height}&model=${encodeURIComponent(model)}&seed=${seed}&nologo=true`;
      
      // If client requests JSON
      if (req.headers.accept && req.headers.accept.includes('application/json') && req.method === 'POST') {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          url: targetUrl,
          prompt: cleanPrompt,
          width: Number(width),
          height: Number(height),
          model,
          seed
        }));
        return;
      }

      // Otherwise proxy image directly with https
      const https = require('https');
      https.get(targetUrl, { timeout: 35000 }, (apiRes) => {
        // Handle redirect if any
        if (apiRes.statusCode >= 300 && apiRes.statusCode < 400 && apiRes.headers.location) {
          https.get(apiRes.headers.location, { timeout: 35000 }, (redirectRes) => {
            if (res.headersSent) return;
            res.writeHead(redirectRes.statusCode, {
              'Content-Type': redirectRes.headers['content-type'] || 'image/jpeg',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=86400'
            });
            redirectRes.pipe(res);
          }).on('error', () => {
            if (!res.headersSent) {
              res.writeHead(302, { 'Location': targetUrl, 'Access-Control-Allow-Origin': '*' });
              res.end();
            }
          });
          return;
        }

        if (res.headersSent) return;
        res.writeHead(apiRes.statusCode, {
          'Content-Type': apiRes.headers['content-type'] || 'image/jpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        });
        apiRes.pipe(res);
      }).on('error', (err) => {
        if (!res.headersSent) {
          // Fallback to redirect directly to source
          res.writeHead(302, { 'Location': targetUrl, 'Access-Control-Allow-Origin': '*' });
          res.end();
        }
      });
    };

    if (req.method === 'GET') {
      const prompt = parsedUrl.searchParams.get('prompt') || 'abstract futuristic art';
      const width = parsedUrl.searchParams.get('width') || 1024;
      const height = parsedUrl.searchParams.get('height') || 1024;
      const model = parsedUrl.searchParams.get('model') || 'flux';
      const seed = parsedUrl.searchParams.get('seed') || Math.floor(Math.random() * 1000000);
      handleImageGeneration(prompt, width, height, model, seed);
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          handleImageGeneration(
            payload.prompt,
            payload.width || 1024,
            payload.height || 1024,
            payload.model || 'flux',
            payload.seed || Math.floor(Math.random() * 1000000)
          );
        } catch {
          handleImageGeneration(parsedUrl.searchParams.get('prompt') || 'AI digital artwork');
        }
      });
      return;
    }
  }

  // 1c. API route for Network Info (LAN IP for Same Wi-Fi sharing & Public Host)
  if (req.method === 'GET' && req.url === '/api/network-info') {
    const os = require('os');
    const nets = os.networkInterfaces();
    let localIp = '127.0.0.1';
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          localIp = net.address;
          break;
        }
      }
      if (localIp !== '127.0.0.1') break;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      localIp,
      port: PORT,
      lanUrl: `http://${localIp}:${PORT}`,
      publicUrl: 'https://sairram-123.github.io/chatai-enterprise/'
    }));
    return;
  }

  // 1d. API route to persist & retrieve shared conversations across devices
  if (req.method === 'POST' && req.url === '/api/share') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const shareId = payload.id || ('c_' + Date.now());
        const dataDir = path.join(DIR, 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        const sharesFile = path.join(dataDir, 'shares.json');
        let shares = {};
        if (fs.existsSync(sharesFile)) {
          try { shares = JSON.parse(fs.readFileSync(sharesFile, 'utf8') || '{}'); } catch {}
        }
        shares[shareId] = payload;
        fs.writeFileSync(sharesFile, JSON.stringify(shares, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, id: shareId }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/api/share')) {
    const parsed = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
    const shareId = parsed.searchParams.get('id') || req.url.split('/api/share/')[1];
    const sharesFile = path.join(DIR, 'data', 'shares.json');
    if (fs.existsSync(sharesFile)) {
      try {
        const shares = JSON.parse(fs.readFileSync(sharesFile, 'utf8') || '{}');
        if (shares && shares[shareId]) {
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify(shares[shareId]));
          return;
        }
      } catch {}
    }
    res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ error: 'Shared conversation not found' }));
    return;
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });
    res.end();
    return;
  }

  // 2. Static file serving
  let safePath = path.normalize(req.url.split('?')[0]);
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  
  const filePath = path.join(DIR, safePath);

  if (!filePath.startsWith(DIR) || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      res.writeHead(403);
      res.end('Forbidden');
    }
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const nets = os.networkInterfaces();
  let localIp = '127.0.0.1';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }
  console.log(`Server listening on all network interfaces:`);
  console.log(`  Local:   http://127.0.0.1:${PORT}`);
  console.log(`  Network: http://${localIp}:${PORT}`);
  console.log(`  Public:  https://sairram-123.github.io/chatai-enterprise/`);
});
