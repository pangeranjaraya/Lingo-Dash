# LingoDash v3.0.0 — Firebase / Vercel

Full Next.js 14 App Router starter for LingoDash using the supplied Firebase Web configuration.

## Included
- Firebase Authentication: Google + Email/Password
- Register with Username + Email + Password
- Firebase Firestore user profile creation
- Optional Telegram @caaxratdev bottom-sheet
- Learning prototype
- Dashboard, profile, leaderboard, settings
- PWA manifest + service worker asset
- Health API at `/api/health`
- AdSense environment foundation
- No Supabase

## Important Google login behavior
The project deliberately refuses Google OAuth inside common embedded/in-app browsers. If a wrapper turns the Vercel site into an Android app using an embedded WebView, open the site in full Chrome instead. On Android mobile browsers, Google login uses Firebase's redirect flow. Firebase documents redirect sign-in as the preferred mobile approach.

For a production wrapper, use a Trusted Web Activity or a wrapper that opens the HTTPS site in Chrome/custom browser context instead of an embedded WebView. This is the safest way to avoid common OAuth WebView failures.

## Firebase Console setup
1. Authentication -> Sign-in method -> enable Google.
2. Enable Email/Password.
3. Authentication -> Settings -> Authorized domains: add your Vercel domain, e.g. `lingodash.vercel.app` (use your actual deployment domain).
4. Create/enable Firestore Database.
5. Publish `firestore.rules`.

## Local setup
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm start
```

## Vercel
Import the project into Vercel and set the same `NEXT_PUBLIC_*` values from `.env.example` as Vercel environment variables. Do not upload Firebase Admin service-account private keys to the frontend.

## Username/password note
Firebase's native password provider is Email/Password. LingoDash therefore stores `username` as the user's profile/display identity while Firebase authenticates with email + password.

## AdSense note
AdSense revenue is separate from the internal LingoDash wallet. Do not represent user rewards as a direct share of AdSense revenue unless you implement and legally validate such a program.
