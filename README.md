<<<<<<< HEAD
# LGBTQIA2S+ Resource Map

Interactive map and searchable database of LGBTQIA2S+‑friendly resources in the Boston area.  
Built with **Next .js 15 + React 19, Firebase v11, Google Maps JavaScript SDK, Fuse.js**.

## Key features

Map with clickable markers to organizations
Main home page with search function to filter through Names of organizations
Map page with search function to filter through Names + Descriptions
Database containing all resources in a single scrollable list
Resource detail page showing all the information one could possibly want about an organization

---

## Prerequisites

**Node.js** | 20.x LTS 
**npm** | 10.x (Yarn / pnpm also work)
**Google Cloud** | Maps + Geocoding APIs enabled | Needed for map tiles & address → lat/lng lookup. |
**Firebase** | Firestore database + web configuration | Project already provisioned by team. |

---

## Layout

.
├─ app/                         # Next.js 15 “App Router” tree
│  ├─ layout.tsx               #  Root layout – header, footer, Google Maps provider
│  ├─ globals.css              #  Tiny global reset (color‑scheme tokens)
│  ├─ page.module.css          #  Shared CSS‑module used by multiple pages
│  │
│  ├─ page.tsx                 #  Landing page (hero section + map teaser)
│  │
│  ├─ map/                     #  /map – full‑screen map + sidebar
│  │   └─ page.tsx
│  │
│  ├─ database/                #  /database – searchable table view
│  │   └─ page.tsx
│  │
│  ├─ resource/                #  /resource/[id] – dynamic detail route
│  │   └─ [id]/page.tsx
│  │
│  ├─ components/              #  Shared React components (client‑side)
│  │   ├─ Map.tsx              #   Google Maps wrapper (@react-google-maps/api)
│  │   ├─ SearchBar.tsx        #   Input + optional filter UI
│  │   ├─ MapSearchBar.tsx     #   Variant used on /map (category + text)
│  │   └─ ResourceList.tsx     #   List of org cards
│  │
│  └─ hooks/
│      └─ useOrgSearch.ts      #   Lightweight Fuse.js autocomplete hook
│
├─ firebase/
│  ├─ configfirebase.js        #  Firebase app initialisation (uses env vars)
│  └─ Fire_base.mjs            #  **one‑time seeding script** → adds org docs
│
├─ public/                     #  Static assets (will be served at /)
│   └─ prideflags.jpg          #  Hero background image
│
├─ .env.example                #  Template for env vars (.env.local not checked in)
│
├─ next.config.ts              #  Next .js config (ESM, Turbopack enabled)
├─ tsconfig.json               #  TypeScript compiler options
│
├─ package.json                #  Dependencies + npm scripts
├─ eslint.config.mjs           #  ESLint + Prettier config (monorepo style)
└─ README.md                   #  You are here

## Setup

```bash
# clone the repo
git clone https://github.com/BU-Spark/se-kimberly-rhoten-mola.git
cd se-kimberly-rhoten-mola

# install all dependencies (production + dev)
npm install
npm install fuse.js

# create the file .env.local at the root
touch .env.local

# Create a Google cloud project + Google API key
# step 1: naviage to https://cloud.google.com/apis and create and account
# step 2: create a New Project
# step 3: navigate to "credentials"
# step 4: click "create credentials" and create a new API key
# step 5: copy and paste your api key after "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="

# Create a Firebase project + enable Firestore

# step 1. Sign in to https://console.firebase.google.com 
# step 2. Click “Add project” and give it a name 
# step 3. In the left nav open Build -> Firestore Database
# step 4. Click "create database" -> "Start in production" -> pick a Cloud region  
# step 5. In the Firebase console "Project Overview" -> "Settings"  
# step 6 Scroll to “Your apps” -> “Web” -> "Register app"
# step 7 Give it an 'app nickname' and then "Register" 
#step 8. Copy the "config snippet" that looks like:

   ```js
   const firebaseConfig = {
     apiKey: "A…Z",
     authDomain: "xyz.firebaseapp.com",
     projectId: "xyz",
     storageBucket: "…",
     messagingSenderId: "…",
     appId: "1:…:web:…"
   };
   
# then open .env.local and fill in:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# run the dev server
npm run dev      

#open http://localhost:3000

#IMPORTANT: HOW TO ADD / MANAGE ORGANIZATIONS (2 ways)

Option 1: 
In Firestore navigate to Collection -> Start Collection / select existing
    * Collection ID: Organizations
    * edit / add info as needed
    * click "save"

Option 2:
Add an organization in se-kimberly-rhoten-mola/firebase/Fire_base.mjs

const organization = [
  {
    Organization_Name: "New Resource",
    Organization_Address: "123 Main St, Boston MA",
    Type_Of_Service: "Food",
    /* …other optional fields… */
  },
  // add more objects below to insert many at once
];

#from the project root run
    
node Fire_base.mjs

Running it again will insert duplicates (each call generates new doc
IDs).
If you want to update existing docs, delete the old documents in the Firebase Console and then run

```

## Future work

Zip code based search to find resources near you
Icons to replace current map markers and show some kind of functionality (with key to describe what kind of service an organization offers)
More robust filtering (filter by organization type, location, target population, etc.)

## Team

Stefan Pretorius - stefanjp@bu.edu
Ananya Agarwal - ananya04@bu.edu
Yueyang Yan - yuy223@bu.edu
=======
This is a template for Spark! DS 519 projects. It has pre-configured eslint.config.mjs - ([`ESLint`](https://eslint.org/)) and .prettierrc - ([`Prettier`](https://prettier.io/)) to reflect industry standard development guidelines.

## Setting Up Your Developer Experience

To get the most out of ESLint and Prettier, It is recommended to make the changes to you IDE:

#### Add this code to your _.vscode/settings.json_

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### Download these VSCode extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Getting Started

This template uses Next.js. If you havent used Next before or need more information, take a look here:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. Do not use Microsoft Edge 🤮

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Adding Additional Tech

Most projects will require the use of other technologies. Below are a few guides and recommedations for integrating commonly used software into your Next.js project.

- [Next.js Setup w/ Prisma](https://www.dhiwise.com/post/the-ultimate-guide-to-next-js-prisma-setup)
- [Emotion & Next.js](https://www.dhiwise.com/post/implementing-nextjs-emotions-in-your-project) - Emotion is the default CSS-in JS library for all new Spark! projects. Use Emotion instead of styled-components, as styled-components is not as easily compatible with Server Side Rendering, or Typed CSS variables. Emotion is also more readily compatible with a wide array of component libraries.
- [Clerk Setup w/ Next.js](https://clerk.com/docs/quickstarts/nextjs) - Clerk will be the default user authentication software for all new Spark! projects. Please reach out to Omar for creating and retrieving API keys for your project. Do NOT use firebase/auth even if your project uses Firestore.
- #### Component Libraries
  - All new projects will be required to use a [design system](https://www.figma.com/blog/design-systems-101-what-is-a-design-system/) You will receive designs from your DS488 design team which will utilize a design kit. Use the corresponding component library to implement those designs on the front end of your project.
>>>>>>> origin/main
