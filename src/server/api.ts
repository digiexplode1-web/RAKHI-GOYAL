import { Express, Request, Response } from "express";
import { getDb, saveDb } from "./db";

// VERY basic auth for the sandbox environment
const ADMIN_TOKEN = "super-secret-admin-token-sandbox-only";

export function setupApiRoutes(app: Express) {
  
  // -- Authentication --
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "admin@example.com" && password === "ChangeMe123!") {
      res.json({ token: ADMIN_TOKEN, success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Middleware to check fake token
  const requireAuth = (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // -- Public GET Routes --
  
  app.get("/api/public/data", async (req, res) => {
    const db = await getDb();
    // Only send public-facing data
    res.json({
      settings: db.settings,
      treatments: db.treatments,
      blogs: db.blogs?.filter((b: any) => b.status === 'published') || [],
      testimonials: db.testimonials?.filter((t: any) => t.status === 'published') || [],
      faqs: db.faqs || [],
      gallery: db.gallery || []
    });
  });

  // -- Public POST Routes (Leads) --
  app.post("/api/leads", async (req, res) => {
    try {
      const db = await getDb();
      const newLead = {
        id: Date.now().toString(),
        ...req.body,
        status: "New",
        createdAt: new Date().toISOString()
      };
      db.leads.push(newLead);
      await saveDb(db);
      res.json({ success: true });
    } catch(err) {
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  // -- Admin Protected Routes --
  app.get("/api/admin/data", requireAuth, async (req, res) => {
    const db = await getDb();
    res.json(db);
  });

  app.post("/api/admin/settings", requireAuth, async (req, res) => {
    const db = await getDb();
    db.settings = { ...db.settings, ...req.body };
    const processedDb = await saveDb(db);
    res.json({ success: true, settings: processedDb.settings });
  });
  
  app.patch("/api/admin/leads/:id/status", requireAuth, async (req, res) => {
    const db = await getDb();
    const lead = db.leads.find((l: any) => l.id === req.params.id);
    if(lead) {
      lead.status = req.body.status;
      await saveDb(db);
      res.json({ success: true, lead });
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAuth, async (req, res) => {
    const db = await getDb();
    const initialLength = db.leads.length;
    db.leads = db.leads.filter((l: any) => l.id !== req.params.id);
    if (db.leads.length < initialLength) {
      await saveDb(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  // -- CRUD Endpoints mapped for generic entities in DB --
  const editableEntities = ["treatments", "blogs", "testimonials", "faqs", "gallery"];
  
  editableEntities.forEach(entity => {
    app.post(`/api/admin/${entity}`, requireAuth, async (req, res) => {
      const db = await getDb();
      const newItem = { id: Date.now().toString(), ...req.body };
      db[entity].push(newItem);
      const processedDb = await saveDb(db);
      const processedItem = processedDb[entity].find((i: any) => i.id === newItem.id);
      res.json({ success: true, item: processedItem });
    });

    app.put(`/api/admin/${entity}/:id`, requireAuth, async (req, res) => {
      const db = await getDb();
      const idx = db[entity].findIndex((i: any) => i.id === req.params.id);
      if (idx !== -1) {
        db[entity][idx] = { ...db[entity][idx], ...req.body };
        const processedDb = await saveDb(db);
        res.json({ success: true, item: processedDb[entity][idx] });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    });

    app.delete(`/api/admin/${entity}/:id`, requireAuth, async (req, res) => {
       const db = await getDb();
       db[entity] = db[entity].filter((i: any) => i.id !== req.params.id);
       await saveDb(db);
       res.json({ success: true });
    });
  });

  // End of setupApiRoutes
}
