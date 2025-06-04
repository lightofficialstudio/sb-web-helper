// app/layout.tsx (or app/layout.jsx if using JavaScript)
import "@styles/font.css";
import "@styles/globals.css";
import ClientProvider from "@components/providers/client-providers";
import LocaleProvider from "@components/providers/i18n-provider"; // Import the new ClientProvider
import SchoolReduxProvider from "@components/providers/school-list-provider"; // Import the new ClientProvider
import AuthenticationReduxProvider from "@/components/providers/auth-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags for Progressive Web App (PWA) */}
        <meta name="application-name" content="My Web App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="My Web App" />
        <meta name="description" content="This is my awesome web app." />
        <meta name="theme-color" content="#4A90E2" />

        {/* Link to manifest.json */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/icon-512x512.png" sizes="512x512" />
      </head>
      <body className="font-lineseed antialiased">
        {/* Move client-related providers to a separate component */}
        <ClientProvider>
          <LocaleProvider locale="en" />
          <AuthenticationReduxProvider>
            <SchoolReduxProvider>{children}</SchoolReduxProvider>
          </AuthenticationReduxProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
