const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/settings',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer super-secret-admin-token-sandbox-only'
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(res.statusCode, data));
});
req.write(JSON.stringify({ heroImage: 'x'.repeat(1024 * 1024) }));
req.end();
