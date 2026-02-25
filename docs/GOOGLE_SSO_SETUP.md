# Google SSO setup – step by step

Follow these steps to configure Google Sign-In for the Dandi app.

---

## 1. Create / use a Google Cloud project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Open the project dropdown at the top and click **New Project** (or pick an existing one).
3. Enter a name (e.g. **Dandi**), then click **Create**.

---

## 2. Enable the Google+ API (optional for basic login)

For “Sign in with Google” you only need **OAuth consent** and **credentials**.  
If you see “Google+ API” in older docs, you can ignore it; the People API is used for profile data.

---

## 3. Configure the OAuth consent screen

1. In the left menu go to **APIs & Services** → **OAuth consent screen**.
2. Choose **External** (so any Google account can sign in), then **Create**.
3. Fill in:
   - **App name:** e.g. `Dandi`
   - **User support email:** your email
   - **Developer contact:** your email
4. Click **Save and Continue**.
5. On **Scopes**, click **Add or Remove Scopes**, add:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
   Then **Save and Continue**.
6. On **Test users** (if the app is still in “Testing”): add your Google account so you can sign in.  
   Then **Save and Continue**.
7. Review and go back to the console.

---

## 4. Create OAuth 2.0 credentials

1. Go to **APIs & Services** → **Credentials**.
2. Click **+ Create Credentials** → **OAuth client ID**.
3. **Application type:** **Web application**.
4. **Name:** e.g. `Dandi Web`.
5. Under **Authorized JavaScript origins** add:
   - `http://localhost:3000` (for local dev)
   - Your production URL when you deploy (e.g. `https://yourdomain.com`).
6. Under **Authorized redirect URIs** add:
   - `http://localhost:3000/api/auth/callback/google` (for local dev)
   - Production: `https://yourdomain.com/api/auth/callback/google`.
7. Click **Create**.
8. Copy the **Client ID** and **Client secret**; you’ll put them in `.env.local`.

---

## 5. Add environment variables

In the project root, edit **`.env.local`** (create it if it doesn’t exist) and add:

```env
# Google OAuth (from Google Cloud Console → Credentials → OAuth 2.0 Client ID)
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth (generate a random string, e.g. `openssl rand -base64 32`)
NEXTAUTH_SECRET=your_random_secret_here

# App URL (use your production URL in production)
NEXTAUTH_URL=http://localhost:3000
```

- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET:** from step 4.  
- **NEXTAUTH_SECRET:** any long random string (e.g. `openssl rand -base64 32`).  
- **NEXTAUTH_URL:**  
  - Local: `http://localhost:3000`  
  - Production: `https://yourdomain.com`

---

## 6. Generate NEXTAUTH_SECRET (optional)

In a terminal:

```bash
openssl rand -base64 32
```

Use the output as `NEXTAUTH_SECRET` in `.env.local`.

---

## 7. Install dependencies and run the app

If you haven’t already:

```bash
yarn install
yarn dev
```

Open `http://localhost:3000`. You should see **Sign in with Google**.  
Click it; you’ll be sent to Google, then back to the app when sign-in succeeds.

---

## 8. Production checklist

Before going live:

1. In **OAuth consent screen**, if the app is still in **Testing**, either add all test users or submit for **Verification** so any Google user can sign in.
2. In **Credentials**, add your real domain under **Authorized JavaScript origins** and **Authorized redirect URIs** (e.g. `https://yourdomain.com` and `https://yourdomain.com/api/auth/callback/google`).
3. Set in production env:
   - `NEXTAUTH_URL=https://yourdomain.com`
   - Same `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and a strong `NEXTAUTH_SECRET`.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| “Redirect URI mismatch” | Exact match in Credentials → Authorized redirect URIs (including `http` vs `https`, port, path `/api/auth/callback/google`). |
| “Access blocked: This app’s request is invalid” | OAuth consent screen configured; correct Client ID/Secret; NEXTAUTH_URL matches the origin you’re using. |
| Session not persisting | NEXTAUTH_SECRET set and same in all instances; cookies allowed for your domain. |
| 500 on sign-in | Env vars loaded (restart dev server after changing `.env.local`); no typos in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`. |
