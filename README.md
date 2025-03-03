Instructions for Bash Party

1: clone repo and make sure you are on the cs519 branch

git clone https://github.com/BU-Spark/se-kimberly-rhoten-mola

cd se-kimberly-rhoten-mola

git checkout -b cs519

2: from project root install dependencies

npm install

npm install 20

npm install @react-google-maps/api

3: create the file ".env.local" in the project root and put this in there:

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCmyZPcurl3RuJF7BQvB5DRFJj1k26v4BI

4: run development server and open http://localhost:3000 in browser

npm run dev

5: click around, and try to break what we have!

6: if any bugs are encountered, send to us at stefanjp@bu.edu