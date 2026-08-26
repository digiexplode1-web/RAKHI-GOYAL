import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { setupApiRoutes } from "../../src/server/api";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Normalize URL path if invoked via Netlify functions path rewrite
app.use((req, _res, next) => {
  if (req.url.startsWith("/.netlify/functions/api")) {
    req.url = req.url.replace("/.netlify/functions/api", "/api");
  }
  next();
});

// Register express API routes
setupApiRoutes(app);

export const handler = serverless(app);
