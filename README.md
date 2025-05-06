# LGBTQIA2S+ Resource Map

Interactive map and searchable database of LGBTQIA2S+‑friendly resources in the Boston area.  
Built with **Next .js 15 + React 19, Firebase v11, Google Maps JavaScript SDK, Fuse.js**.

---

## Rerequisites

**Node.js** | 20.x LTS 
**npm** | 10.x (Yarn / pnpm also work)
**Google Cloud** | Maps + Geocoding APIs enabled | Needed for map tiles & address → lat/lng lookup. |
**Firebase** | Firestore database + web configuration | Project already provisioned by team. |

---

## Setup

```bash
# clone the repo
git clone https://github.com/BU-Spark/se-kimberly-rhoten-mola.git
cd se-kimberly-rhoten-mola

# (optional) switch to the correct branch
git checkout teamdev

# install all dependencies (production + dev)
npm install
npm install fuse.js

# copy env template -> local environment
cp .env.example .env.local

# then open .env.local and fill in:
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-public-browser-key
# FIREBASE_API_KEY=...
# FIREBASE_AUTH_DOMAIN=...
# FIREBASE_PROJECT_ID=...
# etc.

# run the dev server
npm run dev      

#open http://localhost:3000