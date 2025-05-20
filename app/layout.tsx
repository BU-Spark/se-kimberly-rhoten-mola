import "./globals.css";
import GoogleMapsProvider from "./GoogleMapsProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <GoogleMapsProvider apiKey={apiKey}>
          <Header />
          <main>{children}</main>
          <Footer />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}