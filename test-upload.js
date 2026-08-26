const fetch = require('node-fetch');
async function test() {
  const bigString = 'x'.repeat(1024 * 1024); // 1MB
  const res = await fetch('http://localhost:3000/api/admin/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer super-secret-admin-token-sandbox-only'
    },
    body: JSON.stringify({ heroImage: bigString })
  });
  console.log(res.status, await res.text());
}
test();
