import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data/waitlist.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ users: [], totalCount: 0, lastUpdated: new Date().toISOString() }, null, 2),
    'utf-8'
  );
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return { users: [], totalCount: 0, lastUpdated: new Date().toISOString() };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function maskEmail(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? name[0] + '***' : name.slice(0, 2) + '***' + name.slice(-1);
  return `${maskedName}@${domain}`;
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = req.url || '';

  // GET /api/waitlist
  if (req.method === 'GET' && (url === '/api/waitlist' || url.startsWith('/api/waitlist?'))) {
    const data = readData();
    const users = data.users || [];
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: true,
        totalCount: users.length,
        latestSpot: users.length > 0 ? users[users.length - 1].spot : 100,
        recentMembers: users.slice(-6).reverse().map((u) => ({
          id: u.id,
          maskedEmail: maskEmail(u.email),
          spot: u.spot,
          registeredAt: u.registeredAt,
        })),
      })
    );
    return;
  }

  // GET /api/waitlist/users
  if (req.method === 'GET' && url === '/api/waitlist/users') {
    const data = readData();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, null, 2));
    return;
  }

  // POST /api/waitlist
  if (req.method === 'POST' && url === '/api/waitlist') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const email = (parsed.email || '').trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Please provide a valid email address.' }));
          return;
        }

        const data = readData();
        const users = data.users || [];

        const existing = users.find((u) => u.email.toLowerCase() === email);
        if (existing) {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: true,
              isExisting: true,
              spot: existing.spot,
              email: existing.email,
              registeredAt: existing.registeredAt,
              totalCount: users.length,
              message: `Welcome back! You are already on the waitlist at spot #${existing.spot}.`,
            })
          );
          return;
        }

        const BASE_OFFSET = 100;
        const newSpot = BASE_OFFSET + users.length + 1;
        const newUser = {
          id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          email,
          spot: newSpot,
          registeredAt: new Date().toISOString(),
          userAgent: req.headers['user-agent'] || 'unknown',
        };

        users.push(newUser);
        data.users = users;
        data.totalCount = users.length;
        data.lastUpdated = new Date().toISOString();

        writeData(data);

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: true,
            isNew: true,
            spot: newUser.spot,
            email: newUser.email,
            registeredAt: newUser.registeredAt,
            totalCount: users.length,
            message: `Spot #${newUser.spot} secured successfully!`,
          })
        );
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'Server error: ' + err.message }));
      }
    });
    return;
  }

  // Static file serving from dist/ if built
  let filePath = path.join(__dirname, 'dist', url === '/' ? 'index.html' : url);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`MemShift server running at http://localhost:${PORT}`);
});
