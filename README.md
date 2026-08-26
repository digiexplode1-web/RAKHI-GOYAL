<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c0d2fb01-1792-4024-be3d-83e83cb3ebf9

## Deploy to Netlify

This project is pre-configured for **Netlify** with Netlify Functions (Express serverless API) and SPA client-side routing.

### Option 1: Deploy via GitHub / Netlify Dashboard
1. Push your code to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify Dashboard](https://app.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect configuration from `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Functions Directory:** `netlify/functions`
5. (Optional) In **Site Configuration** -> **Environment variables**, set:
   - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase Service Account JSON string (if using custom production Firestore credentials).
6. Click **Deploy site**.

### Option 2: Deploy via Netlify CLI
1. Install Netlify CLI globally:
   `npm install -g netlify-cli`
2. Log in to Netlify:
   `netlify login`
3. Deploy to production:
   `netlify deploy --build --prod`

