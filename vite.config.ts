import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function waitlistApiPlugin(): Plugin {
  const dataFilePath = path.resolve(__dirname, 'data/waitlist.json');

  // Ensure data directory and file exist
  const ensureDataFile = () => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(
        dataFilePath,
        JSON.stringify({ users: [], totalCount: 0, lastUpdated: new Date().toISOString() }, null, 2),
        'utf-8'
      );
    }
  };

  const readData = () => {
    ensureDataFile();
    try {
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return { users: [], totalCount: 0, lastUpdated: new Date().toISOString() };
    }
  };

  const writeData = (data: any) => {
    ensureDataFile();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  };

  const maskEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    const maskedName = name.length <= 2 ? name[0] + '***' : name.slice(0, 2) + '***' + name.slice(-1);
    return `${maskedName}@${domain}`;
  };

  const handleWaitlistRequest = (req: any, res: any) => {
    const url = req.url || '';

    // Handle GET /api/waitlist
    if (req.method === 'GET' && (url === '/api/waitlist' || url.startsWith('/api/waitlist?'))) {
      const data = readData();
      const users = data.users || [];
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          totalCount: users.length,
          latestSpot: users.length > 0 ? users[users.length - 1].spot : 100,
          recentMembers: users.slice(-6).reverse().map((u: any) => ({
            id: u.id,
            maskedEmail: maskEmail(u.email),
            spot: u.spot,
            registeredAt: u.registeredAt,
          })),
        })
      );
      return true;
    }

    // Handle GET /api/waitlist/users (Full real users list)
    if (req.method === 'GET' && url === '/api/waitlist/users') {
      const data = readData();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data, null, 2));
      return true;
    }

    // Handle POST /api/waitlist
    if (req.method === 'POST' && url === '/api/waitlist') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const email = (parsed.email || '').trim().toLowerCase();

          // Validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !emailRegex.test(email)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Please provide a valid email address.' }));
            return;
          }

          const data = readData();
          const users = data.users || [];

          // Check if already registered
          const existingIndex = users.findIndex((u: any) => u.email.toLowerCase() === email);
          if (existingIndex !== -1) {
            const existing = users[existingIndex];
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

          // Calculate real incremental spot (base starts at 101)
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
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Server error processing waitlist request: ' + err.message }));
        }
      });
      return true;
    }

    return false;
  };

  return {
    name: 'waitlist-api-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/waitlist')) {
          handleWaitlistRequest(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/waitlist')) {
          handleWaitlistRequest(req, res);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), waitlistApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
