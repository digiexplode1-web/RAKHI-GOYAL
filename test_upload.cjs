const fetch = require("node-fetch") || global.fetch;

async function test() {
  const base64 = "data:image/png;base64," + "A".repeat(100000);
  const token = "super-secret-admin-token-sandbox-only";
  
  const res = await fetch("http://localhost:3000/api/admin/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      heroImage: base64
    })
  });
  console.log(await res.json());
}
test();
